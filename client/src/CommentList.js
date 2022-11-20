import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      let response = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`
      );

      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const postComments = Object.values(comments).map((comment) => {
    return (
      <div key={comment.id}>
        <ul className='card-body'>
          <li>{comment.content}</li>
        </ul>
      </div>
    );
  });

  return (
    <div className='d-flex flex-row flex-wrap justify-content-evenly'>
      {postComments}
    </div>
  );
}

export default CommentList;
