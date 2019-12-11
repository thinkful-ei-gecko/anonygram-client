import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './Header.css';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';

class Header extends Component {
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
    return (
      <header aria-labelledby='primary-navigation' >
        {/* <img className='App-logo' src='images/icon.png' alt='logo'/>{' '} */}
        <Link to="/" className="header resetStyles h1Link">
          {(this.props.path === '/p/:submissionId') 
            ? <ArrowBackIosIcon />
            : <h1 className='Header__h1'>Anonygram</h1>
          }
        </Link>{' '}
        <ul>
        {TokenService.hasAuthToken() ? (
          <>
            <Link
              to="/login"
              className="header-link resetStyles"
              onClick={this.handleLogout}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="Header__link resetStyles">
              Login
            </Link>
            <Link to="/register" className="Header__link resetStyles">
              Register
            </Link>
          </>
        )}
        </ul>
      </header>
    );
  }
}

export default Header;
