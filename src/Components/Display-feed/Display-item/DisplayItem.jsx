import React from 'react';
import { Link } from 'react-router-dom';
import './DisplayItem.css';

export default function DisplayItem(props) {
    const { imgAddress, upvotes, id, incrementUpvotes } = props;
    return (
        <li className="display-item">
            <Link to={`/p/${id}`}>
                <img className="display-img" src={imgAddress} alt="anonygram" />
            </Link>
                <div className="upvote-wrapper">
                    <button className="upvote-button" type="button" onClick={() => incrementUpvotes(id)}>^</button>
                    <p className="upvote-count">{upvotes}</p>
                </div>
        </li>
    )
}