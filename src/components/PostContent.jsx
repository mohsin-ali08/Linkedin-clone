// PostContent.js
import React from 'react';

const PostContent = ({ content, image }) => {
  return (
    <div className="mb-4">
      <p>{content}</p>
      {image && (
        <div className="mt-3">
          <img src={image} alt="Post" className="w-full h-auto rounded-lg object-cover" />
        </div>
      )}
    </div>
  );
};

export default PostContent;
