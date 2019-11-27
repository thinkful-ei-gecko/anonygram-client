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
    //console.log(formData.values());
    fetch(`${config.API_ENDPOINT}`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {});
  };

  render() {
    
    return (
      <form encType="multipart/form-data" onSubmit={this.onSubmitImageUploader}>
        <input
          style={{ display: 'none' }}
          type="file"
          onChange={this.imageSelectHandler}
          name="someImage"
          ref={(imageInput) => (this.imageInput = imageInput)}
        />
        <button type="button"

          className="SubmissionForm__button"
          onClick={() => this.imageInput.click()}
        >
          +
        </button>
        <button type="submit" value="Upload">
          Upload
        </button>
      </form>
    );
  }
}

export default SubmissionFrom;
