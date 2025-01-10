import React, { useState } from 'react';
import { Modal, Input, Button, Upload, notification } from 'antd';
import { FaImage } from 'react-icons/fa';
import { db, storage } from './firebaseConfig'; // Import Firestore and Storage
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const PostModal = ({ visible, onCreate, onCancel, userName, profileImage }) => {
  const [content, setContent] = useState(''); // Post content
  const [image, setImage] = useState(null); // Post image
  const [loading, setLoading] = useState(false); // Loader state

  const handleFileChange = (e) => {
    if (e.fileList.length > 0) {
      const file = e.fileList[0].originFileObj;
      setImage(file);
    }
  };

  const handlePostSubmit = async () => {
    if (!content.trim()) {
      notification.error({
        message: 'Validation Error',
        description: 'Post content cannot be empty.',
        duration: 3,
      });
      return;
    }

    setLoading(true); // Start loader on "Post" button
    let imageUploadUrl = '';
    if (image) {
      const storageRef = ref(storage, `posts/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error(error);
          setLoading(false); // Stop loader on error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            imageUploadUrl = downloadURL;
            savePostToFirestore(imageUploadUrl);
          });
        }
      );
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
      });

      onCancel(); // Close modal
    } catch (error) {
      console.error('Error posting data: ', error);
      notification.error({
        message: 'Post Failed',
        description: 'There was an issue posting your content. Please try again.',
        duration: 3,
      });
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <Modal
      title="Create a Post"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <div className="flex items-center mb-4">
        <img
          src={profileImage}
          alt="Profile"
          className="rounded-full w-12 h-12 border"
        />
        <span className="ml-3 text-lg font-semibold">{userName}</span>
      </div>
      <Input.TextArea
        rows={3}
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-4"
      />
      <Upload onChange={handleFileChange} showUploadList={false}>
        <Button icon={<FaImage />} className="mr-2">Upload Image</Button>
      </Upload>
      {image && (
        <div className="mt-4">
          <img
            src={URL.createObjectURL(image)}
            alt="Selected"
            className="w-32 h-32 rounded-lg object-cover"
          />
        </div>
      )}
      <div className="flex justify-end mt-6 space-x-3">
        <Button onClick={onCancel} className=' py-5 text-white text-lg font-semibold hover:bg-gray-300 hover:text-black bg-gray-600'
        >Cancel</Button>
        <Button
          type="none"
          className='px-5 py-5 text-white text-lg font-semibold hover:bg-gray-300 hover:text-black bg-gray-600'
          onClick={handlePostSubmit}
          loading={loading} // Show loader on "Post" button
        >
          Post
        </Button>
      </div>
    </Modal>
  );
};

export default PostModal;
