import React from 'react';

export default function Comment (props) {
  const { username, text } = props;

  return (
    <div className='Comment'>
      <div>{username}</div>
      <p>{text}</p>
    </div>
  )
}

