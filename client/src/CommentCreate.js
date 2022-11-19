import React, { useState } from 'react';
import axios from 'axios';

function CommentCreate({ postId }) {
  const [content, setContent] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
        content,
      });

      // Clear input
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className='form-group'>
          <label htmlFor='newComment'>Comment</label>
          <input
            type='text'
            className='form-control'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Add comment...'
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
}

export default CommentCreate;
