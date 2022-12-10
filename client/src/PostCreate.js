import React, { useState } from 'react';
import axios from 'axios';

function PostCreate() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  const createPost = async (evt) => {
    evt.preventDefault();

    if (!title) return setError('Title cannot be empty');

    try {
      // Make request to post microservice
      await axios.post('http://post.com/posts', {
        title, // Expected body from backend
      });

      // Reset title to default
      setTitle('');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <form onSubmit={createPost}>
        <div className='form-group'>
          <label htmlFor='title'>Post Title</label>
          <input
            value={title}
            className='form-control'
            type='text'
            onChange={(evt) => setTitle(evt.target.value)}
          />
          {error && <p>Something went wrong: {error}</p>}
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
}

export default PostCreate;
