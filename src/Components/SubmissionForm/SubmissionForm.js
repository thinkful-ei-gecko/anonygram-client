import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import ImageContext from '../../contexts/ImageContext';
import './SubmissionForm.css';
import config from '../../config';

class SubmissionForm extends Component {

  static contextType = ImageContext;

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      image_text: '',
      loading: false,
    };
  }

  imageSelectHandler = (e) => {
    const { clearAlert } = this.context;

    this.setState({
      image: e.target.files[0],
    });
    clearAlert();
  };

  imageTextHandler = (e) => {
    this.setState({
      image_text: e.target.value,
    });
  };

  imageDragHandler = (file) => {
    const { clearAlert } = this.context;

    this.setState({
      image: file,
    });
    clearAlert();
  };

  onSubmitImageUploader = (e) => {
    e.preventDefault();
    const { setAlert } = this.context;

    //Start loading spinner
    this.setState({ loading: true });
    const formData = new FormData();
    formData.append('someImage', this.state.image);
    formData.append('image_text', this.state.image_text);
    formData.set('latitude', this.props.userLocation.lat);
    formData.set('longitude', this.props.userLocation.long);

    fetch(`${config.API_ENDPOINT}/api/images`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        //Remove loading spinner
        this.setState({ loading: false });
        this.props.updateNewContent();

        if (res.status === 400) {
          setAlert('Sorry, that content is not permitted');
        }
        this.setState({ image: null, image_text: '' });
      })
      .catch(error => {
        console.error(error);
      });
  };

  resetState = () => {
    this.setState({ image: null, image_text: '' });
  };

  render() {

    return (
      <div className="SubmissionForm">
        {/* Display loading spinner if loading */}	 
        {this.state.loading && <div className='loader'></div>}
        {/* 
          component utilizing hooks to detect dropped files 
          while users are on desktop applications
           */}
        <Dropzone onDrop={file => this.imageDragHandler(file[0])}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <form
              {...getRootProps()}
              className="SubmissionForm__form"
              encType="multipart/form-data"
              onSubmit={this.onSubmitImageUploader}
            >
              <input
                {...getInputProps()}
                style={{ display: 'none' }}
                type="file"
                accept="image/*"
                onChange={this.imageSelectHandler}
                name="someImage"
                ref={imageInput => (this.imageInput = imageInput)}
              />
              {isDragActive ? (
                <p className="SubmissionForm__drag--active">Nice pic!</p>
              ) : (
                !this.state.image && (
                  <p className="SubmissionForm__drag">
                    Drag a pic here to upload, or click to select one
                  </p>
                )
              )}
              {!this.state.image ? (
                !isDragActive && (
                  <button
                    type="button"
                    className="SubmissionForm__button"
                    onClick={() => this.imageInput.click()}
                  >
                    +
                  </button>
                )
              ) : (
                <>
                  <label htmlFor="text">Caption Image</label>
                  <input id="text" type="text" onChange={this.imageTextHandler}/>
                  <button
                    className="SubmissionForm__button"
                    type="reset"
                    onClick={() => this.resetState()}
                  >
                    Cancel
                  </button>
                  <button
                    className="SubmissionForm__button"
                    type="submit"
                    value="Upload"
                  >
                    Upload
                  </button>
                </>
              )}
            </form>
          )}
        </Dropzone>
      </div>
    );
  }
}

export default SubmissionForm;
