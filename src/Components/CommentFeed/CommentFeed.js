import React, { Component } from 'react';
import randomizer from '../helpers/randomizer';
import Comment from './Comment/Comment';
import ImageApi from '../../services/image-api-service';
import './CommentFeed.css';

import moment from 'moment';

export default class CommentFeed extends Component {

  state = {
    usernames: {},
    incrementor: -1,
  }

  processTimestamp(timestamp) {
    return moment(timestamp).fromNow();
  }

  handleSubmit = (e) => {
    const commentText = e.target.value; 
    const newComment = {
      user_id: 'some-uuid-here', 
      comment_text: commentText
    }

    ImageApi.postImageComment(this.props.id, newComment.user_id, newComment.commentText)
      .then(() => {
        this.context.comments.push(newComment);
      })
  }

  componentDidMount() {
    const newUsernames = randomizer.getAnonUsernames(this.props.comments);
    this.setState({ usernames: newUsernames });
  };

  render() {
    const { comments } = this.props;
    console.log(this.state.usernames)
    console.log(this.state.usernames[1])
    return (
      <div>
        {comments.map(commentObj => {
          const { timestamp, userId, id, text } = commentObj;
          return <Comment key={id} text={text} username={this.state.usernames[userId]} timestamp={this.processTimestamp(timestamp)} />;
        })}
        <form onSubmit={(e) => this.handleSubmit(e)} className='CommentFeed__form'>
          <input type='text' className='CommentFeed__input' placeholder='Add a comment...' />
          <button className='CommentFeed__button'>Post</button>
        </form>
      </div>
    )
  }
}

