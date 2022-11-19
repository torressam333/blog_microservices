import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';

const App = () => {
  return (
    <div className='container pt-5'>
      <h1>Create Post</h1>
      <PostCreate />
      <hr className='mb-3 pb-3' />
      <h1>All Posts</h1>
      <PostList />
    </div>
  );
};

export default App;
