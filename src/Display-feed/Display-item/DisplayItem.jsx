import React from 'react';
import './DisplayItem.css';

export default function DisplayItem(props) {
    const { imgAddress, upvotes, incrementUpvotes } = props;
    return (
        <li className="display-item">
            <img className="display-img" src={imgAddress} alt="anonygram" />
            <div className="upvote-wrapper">
                <button className="upvote-button" type="button" onClick={() => incrementUpvotes()}>^</button>
                <p className="upvote-count">{upvotes}</p>
            </div>
        </li>
    )
}