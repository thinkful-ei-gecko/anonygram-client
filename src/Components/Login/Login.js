import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'

import './Login.css';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      user: [],
      error: null
    };
  }

  handleSubmit = e => {
    e.preventDefault()
    const { username, password } = e.target

    this.setState({ error: null })

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    return (
      <section className="login-page">
        <h2>Login</h2>
        <form method="get" className='LoginForm' onSubmit = {e => this.handleSubmit(e)}>
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