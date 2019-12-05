import React from 'react';
import CommentFeed from '../CommentFeed/CommentFeed';

export default function DisplaySingle (props) {
    const { image_url, id, description, timestamp, karma_total, comments} = props.photoObj
    return (
      <div>
        <img src={image_url} alt={description}/>
        <div>{timestamp}</div>
        <div>{karma_total}</div>
        <p>{description}</p>
        <CommentFeed imageId={id} comments={comments}/>
      </div>
    )
};