import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';

function PostList() {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/posts');

      setPosts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Only run once to fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className='card'
        style={{ width: '33%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className='card-body'>
          <h3>{post.title}</h3>
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
      {renderedPosts}
    </div>
  );
}

export default PostList;
