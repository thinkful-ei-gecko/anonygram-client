import React, { Component } from 'react';
import randomizer from '../helpers/randomizer';
import Comment from './Comment/Comment';
import './CommentFeed.css';

export default class CommentFeed extends Component {

  state = {
    usernames: {},
    incrementor: -1,
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
          const { userId, id, text } = commentObj;
          return <Comment key={id} text={text} username={this.state.usernames[userId]} />;
        })}
        <form>
          <input />
          <button>Post</button>
        </form>
      </div>
    )
  }
}

