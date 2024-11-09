import { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../components/firebaseConfig'; // Import Firebase configuration

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const db = getFirestore(); // Initialize Firestore

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true); 
      setError(null); 
      
      if (user) {
        setUser(user);
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setProfileImage(userData.profileImage || null);
          } else {
            setProfileImage(null); // Reset if user document doesn't exist
          }
        } catch (err) {
          setError('Failed to load user data. Please try again.');
          console.error('Error fetching user data:', err);
        }
      } else {
        setUser(null);
        setProfileImage(null);
      }
      setLoading(false); // Stop loading once complete
    });

    return () => unsubscribe();
  }, [db]);

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    setProfileImage(null);
  };

  return (
    <AuthContext.Provider value={{ user, profileImage, loading, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
