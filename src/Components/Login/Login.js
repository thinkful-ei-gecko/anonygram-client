import React, { Component } from 'react'


import './Login.css';

class Login extends Component {


  render() {
    return (
      <section className="login-page">
        <h2>Login</h2>
        <form method="get" className='LoginForm'>
        <div>
          <label htmlFor='login-username-input'>
            Username
          </label>
          <input
            type="text"
            id='login-username-input'
            name='username'
            required
          />
        </div>
        <div>
          <label htmlFor='login-password-input'>
            Password
          </label>
          <input
            id='login-password-input'
            name='password'
            type='password'
            required
          />
        </div>
        <button type='submit'>
          Login
        </button>
      </form>  
      </section>
    );
  }
}

export default Login