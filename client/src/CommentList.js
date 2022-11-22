import React from 'react';

function CommentList({ comments }) {
  const postComments = Object.values(comments).map((comment) => {
    return (
      <div key={comment.id}>
        <ul className='card-body'>
          <li key={comment.id}>{comment.content}</li>
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
