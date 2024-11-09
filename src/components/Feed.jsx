import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { Input, Spin, Button, Alert } from 'antd';
import Post from './Post';
import PostModal from './PostModal';
import defaultProfileImage from '../assets/securityicon.jpg';
import Loginsecure from "../assets/securityicon.jpg";
import { FaVideo, FaCalendarAlt, FaPen } from 'react-icons/fa'; // Importing icons

const Feed = () => {
  const { user, profileImage } = useAuth(); // Get user data from AuthContext
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [error, setError] = useState(null);

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      const db = getFirestore();
      const postsCollection = collection(db, 'posts');
      const postsQuery = query(postsCollection, orderBy('createdAt', 'desc')); // Order by createdAt, newest first
      try {
        const postDocs = await getDocs(postsQuery);
        const postsData = postDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
      } catch (err) {
        setError('Error fetching posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const showPostModal = () => setIsModalVisible(true);
  const hidePostModal = () => setIsModalVisible(false);

  const handlePostSubmit = async () => {
    if (!newPostContent) return;
    const db = getFirestore();
    try {
      const newPost = {
        content: newPostContent,
        userId: user.uid,
        userName: user.displayName || user.email,
        profileImage: profileImage || defaultProfileImage,
        createdAt: serverTimestamp(),
      };
      const postRef = await addDoc(collection(db, 'posts'), newPost);
      setPosts([{ id: postRef.id, ...newPost, createdAt: new Date() }, ...posts]); // Add new post at the top
      setNewPostContent('');
      hidePostModal();
    } catch (error) {
      console.error("Error adding post: ", error);
      setError('Error creating post. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" tip="Loading posts..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen items-center space-y-4">
        <img src={Loginsecure} alt="Please Log In" className="w-40 h-40 object-cover" />
        <p className="px-4 text-3xl font-semibold text-center text-gray-700">
          Please login to see Feed.
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
    <div className="max-w-3xl mx-auto">
      {/* Post input section with card-like design */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-5">
        <div className="flex items-center space-x-3">
          <img
            src={profileImage || defaultProfileImage}
            alt="Profile"
            className="rounded-full h-12 w-12 border-2 border-green-400"
          />
          <Button
            block
            onClick={showPostModal}
            className="flex-grow text-gray-600 py-5  font-semibold rounded-full border-[1.4px] outline-none bg-gray-50"
          >
            Please Create a Post ?
          </Button>
        </div>

        {/* Icons for Media, Event, Write Article */}
        <div className="flex flex-wrap justify-around items-center mt-4 space-x-4">
          <div onClick={showPostModal} className="flex flex-col items-center cursor-pointer w-1/3 sm:w-auto">
            <FaVideo className="text-xl text-green-500" />
            <span className="text-xs text-gray-500">Media</span>
          </div>

          <div onClick={showPostModal} className="flex flex-col items-center cursor-pointer w-1/3 sm:w-auto">
            <FaCalendarAlt className="text-xl text-purple-500" /> {/* Event icon */}
            <span className="text-xs text-gray-500">Event</span>
          </div>

          <div onClick={showPostModal} className="flex flex-col items-center cursor-pointer w-1/3 sm:w-auto">
            <FaPen className="text-xl text-orange-500" /> {/* Write Article icon */}
            <span className="text-xs text-gray-500">Write Article</span>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && <Alert message={error} type="error" showIcon className="mb-4" />}

      {/* Modal for creating a new post */}
      <PostModal
        visible={isModalVisible}
        onCreate={handlePostSubmit}
        onCancel={hidePostModal}
        newPostContent={newPostContent}
        setNewPostContent={setNewPostContent}
        userName={user.displayName || user.email}  // Pass user's name
        profileImage={profileImage || defaultProfileImage}  // Pass user's profile image
      />

      {/* Posts list */}
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>No posts to display.</p>
      )}
    </div>
  );
};

export default Feed;
