import React, { Component } from 'react';

import './SubmissionForm.css';


import config from '../../config';

class SubmissionFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      nsfwDetected: false,
      loading: false,
    };
  }

  imageSelectHandler = (e) => {
    this.setState({
      image: e.target.files[0],
      nsfwDetected: false,
    });
  };

  onSubmitImageUploader = (e) => {
    e.preventDefault();

    //Start loading spinner
    this.setState({ loading: true });
    const formData = new FormData();
    formData.append('someImage', this.state.image);
    formData.set('latitude', this.props.userLocation.lat)
    formData.set('longitude', this.props.userLocation.long)
    for (var value of formData.values()) {
      console.log(value);
    }
    fetch(`${config.API_ENDPOINT}/api/images`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        //Remove loading spinner
        this.setState({ loading: false });
        this.props.updateNewContent();
        console.log(res.status);
        if (res.status === 400) {
          this.setState({ nsfwDetected: true });
        }
        this.setState({ image: null })
      })
      .catch((error) => {
        console.error(error);
      });
  };

  resetState = () => {
    this.setState({ image: null })
  }


  render() {
    const { nsfwDetected } = this.state; 
    return ( 
      <div>
        {/* Display loading spinner if loading */}
        {this.state.loading && <div className='loader'></div>}
        <section className="nsfw-detected">{nsfwDetected ? 'Sorry, that content is not permitted' : ''}    
        </section>
        <form className='SubmissionForm' encType="multipart/form-data" onSubmit={this.onSubmitImageUploader}>
          
          <input
            style={{ display: 'none' }}
            type="file"
            accept="image/*"
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
      </div>  
    );
  }
}

export default SubmissionFrom;
