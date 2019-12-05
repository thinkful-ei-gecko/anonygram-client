import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import AuthApiService from '../../services/auth-api-service'
import './Login.css';
import config from '../../config'

class Login extends Component {
  static contextType = UserContext;
  
  state = {
      error: null
  }
  
  handleSubmit = (e,history) => {
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
        this.context.processLogin(res.anonygramAuthToken)
        history.push(``)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <section className="login-page">
        <h2>Login</h2>
        <form method="get" className='LoginForm' onSubmit = {e => this.handleSubmit(e)}>
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
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