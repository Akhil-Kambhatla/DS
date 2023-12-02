import React from 'react';

const Comment = ({ author, text, imageUrl }) => (
  <div className="comment">
    <div>
      <h4>{author}</h4>
      <p>{text}</p>
    </div>
  </div>
);

export default Comment;