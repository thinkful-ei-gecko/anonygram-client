import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import randomizer from '../../helpers/randomizer';
import Comment from './Comment/Comment';
import CommentApi from '../../services/comment-api-service';
import UserContext from '../../contexts/UserContext';
import './CommentFeed.css';

import moment from 'moment';

export default class CommentFeed extends Component {
  state = {
    usernames: [],
    newComment: '',
  }
  
  static contextType = UserContext;

  processTimestamp(timestamp) {
    return moment(new Date(timestamp)).local().fromNow();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const commentText = e.target.newComment.value; 
    CommentApi.postComment(this.props.id, commentText, this.context.user.id)
      .then(res => {
        console.log(res)
        this.props.setCommentsByPush(res);
        this.setState({ newComment: '' })
      })
  }

  componentDidMount() {
    console.log(this.context.user.id)
    if (this.props.comments.length > 1) {
      this.generateUsernames(this.props.comments)
    }
  };

  generateUsernames = (comments) => {
    const newUsernames = randomizer.getAnonUsernames(comments);
    this.setState({ usernames: newUsernames });
  }

  render() {
    const { comments } = this.props;

    //If you're posting the first comment, then generateUsernames didn't run on mount. Run it here. ComponentDidMount edited to be >1 so that generateUsernames doesn't run twice if there is one comment to begin with
    (this.props.comments.length === 1) && this.generateUsernames(this.props.comments);
    
    return (
      <div>
        {(comments.length === 0) 
          ? null
          : (
            comments.map(commentObj => {
              const { comment_timestamp, user_id, comment_id, comment_text } = commentObj;
    
              return <Comment key={comment_id} text={comment_text} username={this.state.usernames[user_id]} timestamp={this.processTimestamp(comment_timestamp)} />;
            })
          )
        }
        <form onSubmit={(e) => this.handleSubmit(e)} className='CommentFeed__form'>
          {/* <label htmlFor='newComment'>Add a Comment</label> */}
          { //Conditionally render for logged in user
            (this.context.user.id !== '') ? (
              <>
                <input type='text' id='newComment' className='CommentFeed__input' placeholder='Add a comment...' />
                <button type='submit' className='CommentFeed__button'>Post</button>
              </>
            ) : (
              <>
                <label htmlFor='newComment'>You must be logged in to post a comment. Log in <Link to='/login'>here</Link>.</label>
                <input type='text' id='newComment' className='CommentFeed__input' placeholder='' />
                <button type='submit' className='CommentFeed__button' disabled>Post</button>
              </>
            )
          }
        </form>
      </div>
    )
  }
}

