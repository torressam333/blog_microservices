import React from 'react';

function PostCreate() {
  return (
    <div>
      <form>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input className='form-control' type='text' />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
}

export default PostCreate;
