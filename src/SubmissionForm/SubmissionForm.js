import React, {Component} from 'react';
import './SubmissionForm.css'
import config from '../config';

const axios = require("axios");



class SubmissionFrom extends Component{

    constructor(props) {
      super(props);
      this.state = {
        image: null
      }
    }
    
    imageSelectHandler = e => {   
        this.setState({
          image: e.target.files[0]
        })
      }

    onSubmitImageUploader = (e) => {
         //http call
         //action="/api/images" method="post" 
         e.preventDefault();
         const formData = new FormData();
         formData.append('someImage', this.state.image)
         const configs = {
           headers: {
             'content-type': 'multipart/form-data'
           }
         };
         axios.post(`${config.API_ENDPOINT}/api/images`,formData,configs)
            .then((res) => {
                alert("Image is uploaded successfully ");
                console.log(res)
            }).catch((error) => {
        });


    }

    render(){
        return(
        <form className='SubmissionForm' onSubmit = {this.onSubmitImageUploader}>
          <input style = {{display: 'none'}} type="file" 
           onChange={this.imageSelectedHandler}
           name="someImage"
           ref={imageInput => this.imageInput = imageInput }/>
          <button className='SubmissionForm__button' onClick={() => this.imageInput.click()}>+</button>
          <button type="submit" value="Upload">Upload</button>
        </form>
        )
    }
}

export default SubmissionFrom;