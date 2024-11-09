import React, { useState, useEffect } from 'react';
import { db, auth } from './firebaseConfig'; // Assuming auth is initialized in firebaseConfig
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const CommentInput = ({ postId }) => {
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the logged-in user
      } else {
        setUser(null); // In case user logs out
      }
    });

    return unsubscribe;
  }, []);

  const handleAddComment = async () => {
    // Input validation: Ensure the comment is not empty
    if (!newComment.trim()) {
      return; // Do nothing if the comment is empty
    }

    if (user) {
      try {
        await addDoc(collection(db, 'posts', postId, 'comments'), {
          text: newComment,
          createdAt: new Date(),
          userId: user.uid, // Store the userId for reference
          userName: user.displayName || user.email, // Use fallback name if no displayName
          profileImage: user.photoURL || 'default-avatar-url', // Use fallback URL if no photoURL
        });

        setNewComment(''); // Clear input after posting
      } catch (error) {
        console.error('Error posting comment:', error); // Log the error if needed
      }
    }
  };

  return (
    <div className="mt-4 flex flex-col items-start space-y-3 bg-gray-100 p-3 rounded-lg shadow-sm">
      {/* Comment Input Section */}
      <div className='space-x-3'>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 p-2 px-5 border w-72 border-gray-300 rounded-full focus:outline-none focus:ring-1 shadow-md focus:ring-gray-500 transition duration-200"
        />

        {/* Post Comment Button */}
        <button
          onClick={handleAddComment}
          disabled={!newComment.trim()} // Disable button if the input is empty
          className={`${
            !newComment.trim() ? 'bg-gray-600' : 'bg-gray-600'
          } text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-500 transition duration-200 shadow-md`}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
