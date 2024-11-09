import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { FaThumbsUp, FaHeart, FaGrinHearts, FaSurprise, FaLaughBeam } from 'react-icons/fa';

const LikeDropdown = ({ postId }) => {
  const [liked, setLiked] = useState(false);
  const [reaction, setReaction] = useState(null);

  // Handle reaction selection
  const handleReaction = (reaction) => {
    setLiked(true);
    setReaction(reaction);
    // You can save the reaction to Firebase here based on the postId
    console.log(`Post ${postId} reacted with ${reaction}`);
  };

  
  const menu = (
    <Menu className='flex'>
      <Menu.Item onClick={() => handleReaction('like')}>
        <div className="flex py-1  items-center space-x-2">
          <FaThumbsUp className="text-reaction-like" /> <span>Like</span>
        </div>
      </Menu.Item>
      <Menu.Item onClick={() => handleReaction('love')}>
        <div className="flex items-center space-x-2">
          <FaHeart className="text-reaction-love" /> <span>Love</span>
        </div>
      </Menu.Item>
      <Menu.Item onClick={() => handleReaction('haha')}>
        <div className="flex items-center space-x-2">
          <FaLaughBeam className="text-reaction-haha" /> <span>Haha</span>
        </div>
      </Menu.Item>
      <Menu.Item onClick={() => handleReaction('wow')}>
        <div className="flex items-center space-x-2">
          <FaSurprise className="text-reaction-wow" /> <span>Wow</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <button
        className={`flex  items-center space-x-1 text-gray-600 ${liked ? 'text-blue-500' : ''}`}
        aria-label={`React with ${reaction || 'like'}`}
      >
        {liked ? (
          <span className="flex items-center text-lg  space-x-1">
            {/* Show selected reaction */}
            {reaction === 'like' && <FaThumbsUp className="text-reaction-like" />}
            {reaction === 'love' && <FaHeart className="text-reaction-love" />}
            {reaction === 'haha' && <FaLaughBeam className="text-reaction-haha" />}
            {reaction === 'wow' && <FaSurprise className="text-reaction-wow" />}
            <span>{reaction}</span>
          </span>
        ) : (
          <>
            {/* Default "Like" reaction */}
            <FaHeart className="text-xl" /><span>Like</span>
          </>
        )}
      </button>
    </Dropdown>
  );
};

export default LikeDropdown;
