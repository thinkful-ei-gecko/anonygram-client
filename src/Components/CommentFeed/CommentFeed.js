import React, { Component } from 'react';
import randomizer from '../../helpers/randomizer';
import Comment from './Comment/Comment';
// import CommentApi from '../services/comment-api-service';
import './CommentFeed.css';

import moment from 'moment';

export default class CommentFeed extends Component {
  state = {
    usernames: [],
  }
  
  processTimestamp(timestamp) {
    return moment(timestamp).fromNow();
  }

  // handleSubmit = (e) => {
    // const commentText = e.target.value; 

    // CommentApi.postImageComment(this.props.id, commentText, ____userId___)
    //   .then(res => {
    //     this.props.setCommentsByPush(res);
    //   })
  // }

  componentDidMount() {
    const newUsernames = randomizer.getAnonUsernames(this.props.comments);
    this.setState({ usernames: newUsernames });
  };

  render() {
    const { comments } = this.props;
    
    return (
      <div>
        {comments.map(commentObj => {
          const { comment_timestamp, user_id, comment_id, comment_text } = commentObj;

          return <Comment key={comment_id} text={comment_text} username={this.state.usernames[user_id]} timestamp={this.processTimestamp(comment_timestamp)} />;
        })}
        <form onSubmit={(e) => this.handleSubmit(e)} className='CommentFeed__form'>
          <input type='text' className='CommentFeed__input' placeholder='Add a comment...' />
          <button className='CommentFeed__button'>Post</button>
        </form>
      </div>
    )
  }
}

