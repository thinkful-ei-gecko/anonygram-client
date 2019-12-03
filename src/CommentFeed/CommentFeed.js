import React, { Component } from 'react';
import randomizer from '../helpers/randomizer';
import Comment from './Comment/Comment';
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

  componentDidMount() {
    const newUsernames = randomizer.getRandomUsernames(this.props.comments);
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
        <form className='CommentFeed__form'>
          <input type='text' className='CommentFeed__input' placeholder='Add a comment...' />
          <button className='CommentFeed__button'>Post</button>
        </form>
      </div>
    )
  }
}

