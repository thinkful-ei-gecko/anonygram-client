import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CommentFeed from '../CommentFeed/CommentFeed';
import CommentApi from '../../services/comment-api-service';
import ImageContext from '../../contexts/ImageContext';
import TokenService from '../../services/token-service';
import { KeyboardArrowUp } from '@material-ui/icons';
import './DisplaySingle.css';

export default class DisplaySingle extends Component {
  static contextType = ImageContext; 

  state = {
    image: {}, 
    comments: [], 
    loading: false, 
  }

  convertTime = (timestamp) => {
    return moment((new Date(timestamp)).toString()).fromNow();
  }

  componentDidMount = () => {
    const submissionId = this.props.submissionId;
    const image = this.context.images.find(img => img.id === Number(submissionId));

    this.setState({ loading: true });
    CommentApi.getComments(submissionId)
      .then((res) => {
        this.setState({
          image,
          comments: res,
          loading: false,
        })
      });
  }

  setCommentsByPush = (comment) => {
    const commentsArr = this.state.comments.map(c => c);
    commentsArr.push(comment);
    this.setState({ comments: commentsArr })
  } 

  render = () => {
    const userLoggedIn = TokenService.hasAuthToken();

    //This conditional is needed to keep componentDidMount in CommentFeed from running before the needed props are ready to be passed in (to generate usernames)
    if (this.state.comments == null) {
      return null;
    }
    if (this.state.loading === true) {
      return <div className="loader"></div>;
    } else {
      const { id, image_url, image_text, create_timestamp, karma_total } = this.state.image
      return (
        <div className='DisplaySingle'>
          <img src={image_url} alt={image_text}/>
          { /* If user is logged in, render enabled upvote button */
          userLoggedIn ? (
            <div className='DisplaySingle__div upvoteButton' onClick={() => this.context.handleUpvote(id)}>
              <KeyboardArrowUp fontSize="large"/>
              {karma_total}
            </div>
          ) : (
            <div>{karma_total}</div>
          )}
          <div>{this.convertTime(create_timestamp)}</div>

          <p>{image_text}</p>
          <CommentFeed id={this.state.image.id} comments={this.state.comments} setCommentsByPush={this.setCommentsByPush} userLoggedIn={userLoggedIn}/>
        </div>
      )
    }
  }
}