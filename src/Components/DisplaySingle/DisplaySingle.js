import React, { Component } from 'react';
import CommentFeed from '../CommentFeed/CommentFeed';
import CommentApi from '../../services/comment-api-service';
import ImageContext from '../../contexts/ImageContext';
import moment from 'moment';

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
    //This conditional is needed to keep componentDidMount in CommentFeed from running before the needed props are ready to be passed in (to generate usernames)
    if (this.state.loading === true) {
      return null;
    } else {
      const { image_url, image_text, create_timestamp, karma_total } = this.state.image
      return (
        <div className='DisplaySingle'>
          <img src={image_url} alt={image_text}/>
          <div>{this.convertTime(create_timestamp)}</div>
          <div>{karma_total}</div>
          <p>{image_text}</p>
          <CommentFeed id={this.state.image.id} comments={this.state.comments} setCommentsByPush={this.setCommentsByPush}/>
        </div>
      )
    }
  }
};