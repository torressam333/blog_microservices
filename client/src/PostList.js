import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

function PostList() {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    try {
      // Make GET to query service instead of the posts service directly
      const res = await axios.get('http://query-clusterip-srv:4002/posts');

      console.log(res.data);

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
        style={{ width: '30%', margin: '20px' }}
        key={post.id}
      >
        <div className='card-body'>
          <h3>{post.title}</h3>
          <CommentCreate postId={post.id} />
          <CommentList comments={post.comments} />
        </div>
      </div>
    );
  });

  return (
    <div className='d-flex flex-row flex-wrap justify-content-evenly'>
      {renderedPosts}
    </div>
  );
}

export default PostList;
