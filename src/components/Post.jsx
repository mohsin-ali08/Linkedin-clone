import React, { useState } from 'react';
import PostContent from './PostContent';
import PostActions from './PostActions';
import CommentsSection from './CommentsSection';
import useComments from './useComments';  // Importing useComments hook

const Post = ({ post }) => {
  const { content, image, createdAt, userName, profileImage, id } = post;
  const [showComments, setShowComments] = useState(false);

  // Use the custom hook for comments
  const { comments, userProfiles, userNames, loading, commentCount } = useComments(id);

  // Toggle comment section visibility
  const toggleComments = () => setShowComments(!showComments);

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 p-5 mx-auto overflow-hidden sm:max-w-full lg:max-w-3xl">
      <div className="flex items-center space-x-3 mb-4">
        <img 
          src={profileImage} 
          alt={userName} 
          className="w-12 h-12 rounded-full border-2 border-gray-300" 
        />
        <div>
          <p className="font-semibold">{userName}</p>
          <p className="text-gray-500 text-sm">
            {new Date(createdAt.seconds * 1000).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Post content and image */}
      <PostContent content={content} image={image} />

      {/* Post actions */}
      <PostActions onToggleComments={toggleComments} />

      {/* Display Comment Count */}
      <div className="mt-2 text-gray-600">
        <span>{commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}</span>
      </div>

      {/* Conditionally render CommentsSection */}
      {showComments && (
        <div className="mt-4">
          <CommentsSection postId={id} comments={comments} userProfiles={userProfiles} userNames={userNames} />
        </div>
      )}
    </div>
  );
};

export default Post;
