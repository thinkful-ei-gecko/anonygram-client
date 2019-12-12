import React from 'react';
import { Link } from 'react-router-dom';
import './DisplayItem.css';
import { KeyboardArrowUp, DeleteOutline } from '@material-ui/icons';
import TokenService from '../../../services/token-service';

export default function DisplayItem(props) {
  const { imgAddress, imgCaption, upvotes, id, incrementUpvotes, handleDelete, userId } = props;
  const userIDFromToken = TokenService.parseAuthToken() !== undefined ? TokenService.parseAuthToken().id : ''; 
  return (
    <li className="display-item">
      <Link to={`/p/${id}`}>
        <img className="display-img" src={imgAddress} alt="anonygram" />
      </Link>
      {userIDFromToken === userId ? <div className="delete-wrapper">
        <div className="delete-button">
          <DeleteOutline fontSize="medium" onClick={() => handleDelete(id)} />
        </div>
      </div>
      :
      <></>
      }

      {userIDFromToken && userIDFromToken !== userId ? <div className="upvote-wrapper">
        <div className="upvote-button">
          <KeyboardArrowUp fontSize="large" onClick={() => incrementUpvotes(id)} />
          <p className="upvote-count">{upvotes}</p>
        </div>

      </div>
        :
        <div className="upvote-wrapper">
          <p className="upvote-button-no-auth">{upvotes}</p>
        </div>
      }
      {imgCaption && <p>{imgCaption}</p>}
    </li>
  );
}
