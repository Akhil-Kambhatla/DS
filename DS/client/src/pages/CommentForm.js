// CommentForm.js
import React, { useState } from 'react';
import './shortNotes.css';

const CommentForm = ({ onAddComment }) => {
  // State to manage author and text inputs
  const [topic, setTopic] = useState('');
  const [text, setText] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new comment object
    const newComment = { topic, text };

    try {
      // Send a POST request to the server to add the comment
      const response = await fetch('http://localhost:5000/CommentForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        // If the comment is successfully saved on the server, update the UI
        const data = await response.json();
        onAddComment(data.comment);
        setTopic('');
        setText('');
      } else {
        console.error('Failed to save comment on the server');
      }
    } catch (error) {
      console.error('Error sending comment to the server:', error);
    }
  };

  // Render the comment form
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Topic Name:
        <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
      </label>
      <br />
      <label>
        Notes:
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <br />
      <button type="submit">Add Notes</button>
    </form>
  );
};

export default CommentForm;
