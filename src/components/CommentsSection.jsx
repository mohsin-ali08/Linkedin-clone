import React from 'react';
import useComments from './useComments';  // Import the custom hook
import CommentInput from './CommentInput';

const CommentsSection = ({ postId }) => {
  const { comments, userProfiles, userNames, loading } = useComments(postId);  // Using the custom hook

  if (loading) {
    return <div>Loading comments...</div>;  // Display loading state while fetching data
  }

  return (
    <div className="mt-4 space-y-3">
      {/* Display comments with user profile images and names */}
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-100 p-3 rounded-lg flex items-start space-x-3">
          {/* Display user profile image */}
          {userProfiles[comment.id] && (
            <img
              src={userProfiles[comment.id]}
              alt="User Profile"
              className="w-8 h-8 rounded-full border-2 border-gray-300"
            />
          )}

          {/* Display comment text and user name */}
          <div>
            <p className="font-semibold">{userNames[comment.id] || comment.userName}</p> {/* Fallback to comment.userName */}
            <p>{comment.text}</p>
            <small className="text-gray-400 text-xs">
              {new Date(comment.createdAt.seconds * 1000).toLocaleString()}
            </small>
          </div>
        </div>
      ))}

      {/* Comment input component */}
      <CommentInput postId={postId} />
    </div>
  );
};

export default CommentsSection;
