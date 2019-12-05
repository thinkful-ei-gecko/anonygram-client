import React, { Component } from 'react';
import CommentFeed from '../CommentFeed/CommentFeed';
import CommentApi from '../../services/comment-api-service';
import ImageContext from '../../contexts/ImageContext';

export default class DisplaySingle extends Component {
  static contextType = ImageContext; 

  state = {
    image: {}, 
    comments: [], 
    loading: false, 
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
    this.setState({ comments: this.state.comments.push(comment)})
  } 

  render = () => {
    //This conditional is needed to keep componentDidMount in CommentFeed from running before the needed props are ready to be passed in (to generate usernames)
    if (this.state.image == null) {
      return null;
    } else {
      const { image_url, image_text, create_timestamp, karma_total } = this.state.image
      return (
        <div className='DisplaySingle'>
          <img src={image_url} alt={image_text}/>
          <div>{create_timestamp}</div>
          <div>{karma_total}</div>
          <p>{image_text}</p>
          {this.state.comments && <CommentFeed comments={this.state.comments}/>}
        </div>
      )
    }
  }
};