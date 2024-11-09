import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Banner from "../assets/Backgroundbaner.jpg";
import { useAuth } from '../components/AuthProvider';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Loginsecure from "../assets/securityicon.jpg";
import Loader from '../pages/Loder';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        setLoading(true);
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData.name || "");
            setBio(userData.bio || "");
            setProfileImage(userData.profileImage || null);
            setProfileExists(true);
          } else {
            setProfileExists(false);
          }
        } catch (error) {
          console.error("Error fetching user profile: ", error);
          setError("Error fetching profile. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserProfile();
  }, [user, db]);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageRef = ref(storage, `profileImages/${user.uid}`);
    setLoading(true);
    try {
      await uploadBytes(imageRef, file);
      const imageURL = await getDownloadURL(imageRef);
      setProfileImage(imageURL);
      await updateDoc(doc(db, 'users', user.uid), { profileImage: imageURL });
    } catch (error) {
      console.error("Error uploading profile image: ", error);
      setError("Error uploading image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    const userRef = doc(db, 'users', user.uid);
    setLoading(true);
    try {
      await setDoc(userRef, { name, bio, profileImage }, { merge: true });
      setIsEditing(false);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error saving profile: ", error);
      setError("Error saving profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

;

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center space-y-4">
        <img src={Loginsecure} alt="Please Log In" className="w-40 h-40 object-cover" />
        <p className="px-4 text-3xl font-semibold text-center text-gray-700">
          Please log in to view and manage your profile.
        </p>
        <Link
          to="/login"
          className="px-6 font-semibold py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Login
        </Link>
        <h1 className='text-gray-600 font-semibold'>Thank you!</h1>
      </div>
    );
  }
  

  return (
    <div className="space-y-3 max-w-3xl mx-auto p-4 sm:p-6 min-h-screen py-20 md:pt-20">
      {loading && <Loader />}
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

      <div className="relative bg-white rounded-lg shadow-md text-center">
        <img src={Banner} alt="Banner" className="rounded-t-lg w-full object-cover h-full sm:h-full" />

        <label htmlFor="profileImage" className="cursor-pointer mt-4 inline-block">
          <img
            src={profileImage || "/default-profile.png"} // Fallback image
            alt="Profile"
            className="rounded-full h-24 w-24 sm:h-32 sm:w-32 border-4 border-white -mt-16 mx-auto"
          />
        </label>
        {isEditing && (
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleProfileImageChange}
          />
        )}

        <div className="mt-4 pb-5 flex flex-col items-center">
          {isEditing ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg font-semibold text-center border border-gray-300 rounded px-2 py-1"
                placeholder="Add Your Name"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="text-sm text-gray-600 text-center border border-gray-300 rounded mt-2 px-2 py-1 w-full"
                placeholder="Add a short bio"
              />
              <button
                onClick={saveProfile}
                className="mt-2 text-blue-500 hover:underline text-sm"
              >
                Save
              </button>
            </>
          ) : profileExists ? (
            <>
              <h3 className="text-xl font-semibold">{name || "Your Name"}</h3>
              <p className="text-sm text-gray-600">{bio || "Add a short bio here."}</p>
              <button
                onClick={toggleEdit}
                className="mt-2 text-blue-500 hover:underline text-sm"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold">Welcome, {user.displayName || user.email}</h3>
              <p className="text-sm text-gray-600">You have not set up a profile yet.</p>
              <button
                onClick={toggleEdit}
                className="mt-2 text-blue-500 hover:underline text-sm"
              >
                Set Up Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
