import React from 'react';
import LikeDropdown from './LikeDropdown'; // Import the LikeDropdown component
import { FaComment, FaShare } from 'react-icons/fa';

const PostActions = ({ onToggleComments, commentCount }) => {
  return (
    <div className="flex justify-between items-center text-gray-500 border-t border-gray-200 pt-4">
      {/* "Like" dropdown */}
      <div className="flex items-center space-x-2">
        <LikeDropdown /> {/* Dropdown for reactions */}
      </div>

      {/* Comment Button with comment count */}
      <button
        onClick={onToggleComments}
        className="flex items-center space-x-1 cursor-pointer"
      >
        <FaComment className="text-xl" />
        <span>Comments ({commentCount})</span> {/* Display the comment count */}
      </button>

      {/* Share Button */}
      <div className="flex items-center space-x-1 cursor-pointer">
        <FaShare className="text-xl" />
        <span>Share</span>
      </div>
    </div>
  );
};

export default PostActions;
