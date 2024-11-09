import React, { useState } from 'react';
import { Modal, Input, Button, Upload, notification } from 'antd';
import { FaImage, FaVideo, FaFileAlt } from 'react-icons/fa';
import { db, storage } from './firebaseConfig'; // Import Firestore and Storage
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const PostModal = ({ visible, onCreate, onCancel, userName, profileImage }) => {
  const [content, setContent] = useState(''); // Post content
  const [image, setImage] = useState(null); // Post image

  const handleFileChange = (e) => {
    if (e.fileList.length > 0) {
      const file = e.fileList[0].originFileObj;
      setImage(file);
    }
  };

  const handlePostSubmit = async () => {
    let imageUploadUrl = '';
    if (image) {
      const storageRef = ref(storage, `posts/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on('state_changed', null, (error) => console.error(error), () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          imageUploadUrl = downloadURL;
          savePostToFirestore(imageUploadUrl);
        });
      });
    } else {
      savePostToFirestore(imageUploadUrl);
    }
  };

  const savePostToFirestore = async (imageUrl) => {
    try {
      const postData = {
        content,
        image: imageUrl || '',
        createdAt: new Date(),
        userName,
        profileImage,
      };

     
      await addDoc(collection(db, 'posts'), postData);
      setContent(''); 
      setImage(null); 
      onCreate(); 


      notification.success({
        message: 'Post Published!',
        description: 'Your post has been successfully published.',
        duration: 2,
        className: 'bg-gray-200 border border-gray-600 text-white  rounded-lg shadow-xl p-4', // Customize with padding and other classes
      });

     
      onCancel(); // Close modal
    } catch (error) {
      console.error('Error posting data: ', error);
      notification.error({
        message: 'Post Failed',
        description: 'There was an issue posting your content. Please try again.',
        duration: 3,
        className : ' bg-gray-200 border border-red-500 text-white rounded-lg shadow-lg p-4',
      });
    }
  };

  return (
    <Modal
      title="Create a Post"
      visible={visible}
      onOk={handlePostSubmit}
      onCancel={onCancel}
      okText="Post"
      cancelText="Cancel"
      footer={null}
      className="rounded-lg"
      centered
      width={500} // Control modal width
    >
      {/* Display user info */}
      <div className="flex items-center mb-4 bg-gray-50 rounded-full shadow ">
        <img
          src={profileImage}
          alt="Profile"
          className="rounded-full w-12 h-12 border-2 border-green-400"
        />
        <span className="ml-3 text-lg font-semibold">{userName}</span>
      </div>

      {/* Post content input */}
      <Input.TextArea
        rows={3}
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-4 border bg-gray-50 shadow rounded-lg outline-none my-3"
      />

      {/* File upload buttons */}
      <div className="flex space-x-3 text-gray-500">
        <Upload onChange={handleFileChange} showUploadList={false}>
          <Button
            icon={<FaImage />}
            className="text-blue-500 hover:bg-blue-100 hover:text-blue-600 rounded-full p-3"
            size="large"
          />
        </Upload>
        <Button
          icon={<FaVideo />}
          className="text-green-500 hover:bg-green-100 hover:text-green-600 rounded-full p-3"
          size="large"
        />
        <Button
          icon={<FaFileAlt />}
          className="text-purple-500 hover:bg-purple-100 hover:text-purple-600 rounded-full p-3"
          size="large"
        />
      </div>

     {/* Selected image preview */}
{image && (
  <div className="mt-4">
    <img
      src={URL.createObjectURL(image)}
      alt="Selected"
      className="w-32 h-32 rounded-lg object-cover" // Small image size
    />
  </div>
)}

      {/* Post and Cancel buttons */}
      <div className="flex justify-end space-x-3 mt-6">
        <Button
        type='none'
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-200 text-black rounded-lg px-6 py-2"
          size="large"
        >
          Cancel
        </Button>
        <Button
        type='none'
          onClick={handlePostSubmit}
          className="bg-gray-800 hover:bg-gray-600 text-white rounded-lg px-6 py-2"
          size="large"
        >
          Post
        </Button>
      </div>
    </Modal>
  );
};

export default PostModal;
