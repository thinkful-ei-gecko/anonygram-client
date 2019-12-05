import React, { Component } from 'react'
import config from '../config'
 
import './Register.css';

class Register extends Component {
  constructor(){
    super();
    this.state = {
      user: []
    };
  }

  submitForm = (e, history) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    let isValid = e.target.isValid.value;
    let newUser = {  username: username, password: password, isValid: isValid}
    this.setState({
      user : [newUser]
    },
    () => {
      fetch(`${config.API_ENDPOINT}/api/users/`, {
        method: 'POST',
        headers: {
          "Content-Type":"application/json"
          },
        body: JSON.stringify(newUser)
      }).then(
        res => res.json());
        //history.push(`/login`);
      }
    );
  }





  render() {
    return (
      <section className="register-page">
        <h2>Register</h2>
        <form method="post" onSubmit = {e => this.submitForm(e)}>
        <div>
          <label htmlFor='registration-username-input'>
            Choose a username
          </label>
          <input
            id='registration-username-input'
            type='text'
            name='username'
            placeholder='username'
            aria-label="username"
            required
          />
        </div>
        <div>
          <label htmlFor='registration-password-input'>
            Choose a password </label>
          <input
            id='registration-password-input'
            type='password'
            name='password'
            placeholder='password'
            aria-label='password'
            required
          />
        </div>
        <div>
          <label htmlFor='registration-isValid-input'>
            Confirm password </label>
          <input
            id='registration-isValid-input'
            type='password'
            name='isValid'
            placeholder='password'
            aria-label='password'
            required
          />
        </div>
        <footer>
          <button type='submit' name='submit'>
            Sign up
          </button>
        </footer>
      </form>
      </section>
    );
  }
}

export default Register