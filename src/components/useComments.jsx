// useComments.jsx

import { useState, useEffect } from 'react';
import { db } from './firebaseConfig'; // Assuming you have Firebase set up and exported
import { collection, onSnapshot, getDoc, doc } from 'firebase/firestore';

// Custom Hook: useComments
const useComments = (postId) => {
  const [comments, setComments] = useState([]);  // Store comment data
  const [userProfiles, setUserProfiles] = useState({});  // Store user profile images
  const [userNames, setUserNames] = useState({});  // Store user names
  const [loading, setLoading] = useState(true);  // Loading state while fetching

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts', postId, 'comments'), async (snapshot) => {
      const commentData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComments(commentData);

      // Fetch user profile images and names for each comment
      const fetchedUserProfiles = {};
      const fetchedUserNames = {};

      for (const comment of commentData) {
        const userDocRef = doc(db, 'users', comment.userId);  // Assuming 'userId' is a field in the comment
        try {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            fetchedUserProfiles[comment.id] = userDoc.data().profileImage;  // Store profile image
            fetchedUserNames[comment.id] = userDoc.data().displayName;  // Store user name
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }

      setUserProfiles(fetchedUserProfiles);
      setUserNames(fetchedUserNames);
      setLoading(false);  // Set loading to false once the data is fetched
    });

    // Cleanup function to unsubscribe from the snapshot listener when the component unmounts
    return unsubscribe;
  }, [postId]);

  return { comments, userProfiles, userNames, loading, commentCount: comments.length };  // Return the comment count
};

export default useComments;
