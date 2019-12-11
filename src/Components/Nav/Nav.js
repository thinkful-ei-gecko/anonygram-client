import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './Nav.css';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';

class Nav extends Component {
  static contextType = UserContext;

  state = {
    auth: TokenService.hasAuthToken(),
  };

  handleLogout = () => {
    TokenService.clearAuthToken();
    this.setState({
      auth: TokenService.hasAuthToken()
    });
  }

  render() {
    console.log(this.props.path)
    return (
      <nav className="App-nav" aria-labelledby='primary-navigation' >
        {/* <img className='App-logo' src='images/icon.png' alt='logo'/>{' '} */}
        <Link to="/" className="header resetStyles">
          {(this.props.path === '/p/:submissionId') 
            ? <ArrowBackIosIcon />
            : <h1>Anonygram</h1>
          }
        </Link>{' '}
        {TokenService.hasAuthToken() ? (
          <>
            <Link
              to="/login"
              className="nav-link resetStyles"
              onClick={this.handleLogout}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link resetStyles">
              Login
            </Link>
            <Link to="/register" className="nav-link resetStyles">
              Register
            </Link>
          </>
        )}
      </nav>
    );
  }
}

export default Nav;
