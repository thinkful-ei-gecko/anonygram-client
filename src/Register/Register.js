import React, { Component } from 'react'


import './Register.css';

class Register extends Component {

  render() {
    return (
      <section className="register-page">
        <h2>Register</h2>
        <form>
        <div>
          <label htmlFor='registration-username-input'>
            Choose a username
          </label>
          <input
            id='registration-username-input'
            name='username'
            required
          />
        </div>
        <div>
          <label htmlFor='registration-password-input'>
            Choose a password </label>
          <input
            id='registration-password-input'
            name='password'
            type='password'
            required
          />
        </div>
        <div>
          <label htmlFor='registration-password-input'>
            Confirm password </label>
          <input
            id='registration-password-input'
            name='password'
            type='password'
            required
          />
        </div>
        <footer>
          <button type='submit'>
            Sign up
          </button>
        </footer>
      </form>
      </section>
    );
  }
}

export default Register