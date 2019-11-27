import React, { Component } from 'react';
import './SubmissionForm.css';
import config from '../config';

class SubmissionFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  imageSelectHandler = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };

  onSubmitImageUploader = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('someImage', this.state.image);
    formData.set('latitude', this.props.userLocation.lat)
    formData.set('longitude', this.props.userLocation.long)
    for (var value of formData.values()) { 
      console.log(value); }
    fetch(`${config.API_ENDPOINT}`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        this.props.updateNewContent();
        console.log(res);
        this.setState({ image: null })
      })
      .catch((error) => {
        console.error(error);
      });
  };

  resetState = () => {
    this.setState({image: null})
  }

  render() {
    return (
      <form className='SubmissionForm' encType="multipart/form-data" onSubmit={this.onSubmitImageUploader}>
        <input
          style={{ display: 'none' }}
          type="file"
          onChange={this.imageSelectHandler}
          name="someImage"
          ref={(imageInput) => (this.imageInput = imageInput)}
        />
        {
          (!this.state.image) 
          ? <button type="button"
              className="SubmissionForm__button"
              onClick={() => this.imageInput.click()}
          >+</button>
          : (
            <>
              <button className='SubmissionForm__button' type="reset" onClick={() => this.resetState()}>Cancel</button>
              <button className='SubmissionForm__button' type="submit" value="Upload">Upload</button>
            </>
          )
        }
      </form>
    );
  }
}

export default SubmissionFrom;
