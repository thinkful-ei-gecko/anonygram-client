import React from 'react';
import './DisplayItem.css';

export default function DisplayItem(props) {
    const { imgAddress, upvotes } = props;
    return (
        <li className="display-item">
            <img className="display-img" src={imgAddress} />
            {/* <p className="upvote-count">{upvotes}</p> */}
        </li>
    )
}