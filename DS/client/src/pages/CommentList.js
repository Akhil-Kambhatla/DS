// CommentList.js
import React, { useState, useEffect } from 'react';
import CommentForm from './pages/CommentForm';

const CommentList = () => {
  // State to store comments
  const [comments, setComments] = useState([]);

  // Fetch comments when the component mounts
  useEffect(() => {
    fetchComments();
  }, []);

  // Fetch comments from the server
  const fetchComments = async () => {
    try {
      const response = await fetch('http://localhost:5000/CommentForm');
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.error('Failed to fetch comments from the server');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Handle adding a new comment
  const addComment = async (comment) => {
    try {
      // Send a POST request to the server to add the comment
      const response = await fetch('http://localhost:5000/CommentForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });

      if (response.ok) {
        // If the comment is successfully saved on the server, fetch and update the comments
        fetchComments();
      } else {
        console.error('Failed to save comment on the server');
      }
    } catch (error) {
      console.error('Error sending comment to the server:', error);
    }
  };

  // Render the comment list
  return (
    <div>
      
      
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <strong>{comment.author}</strong>: {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
