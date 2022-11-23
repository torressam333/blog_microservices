import React from 'react';

function CommentList({ comments }) {
  const postComments = Object.values(comments).map((comment) => {
    let content;

    if (comment.status === 'approved') content = comment.content;
    if (comment.status === 'rejected')
      content = 'This comment has been blocked by moderator';
    if (comment.status === 'pending')
      content = 'This comment is awaiting moderation';

    return (
      <div key={comment.id}>
        <ul className='card-body'>
          <li key={comment.id}>{content}</li>
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
