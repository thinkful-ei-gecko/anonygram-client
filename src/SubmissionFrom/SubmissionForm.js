import React, {Component} from 'react';
import './SubmissionForm.css'

class SubmissionFrom extends Component{

    state = {
        selectImage: null
      }
      imageSelectHandler = e => {
        console.log(e.target.files[0]);
        this.setState({
          selectImage: e.target.files[0]
        })
      }
      imageUploadHandler = () => {
         //http call
      }

    render(){
        return(
        <form>
          <input style = {{display: 'none'}} type="file" onChange={this.imageSelectedHandler}
           ref={imageInput => this.imageInput = imageInput }/>
          <button className='SubmissionForm__button' onClick={() => this.imageInput.click()}>+</button>
          <br/>
          <button onClick= {this.imageUploadHandler}>Upload</button>
        </form>
        )
    }
}

export default SubmissionFrom;