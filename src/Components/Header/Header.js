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
        <Link to="/" className="header appName resetStyles bold">
          {(this.props.path === '/p/:submissionId' || this.props.path === '/local-map') 
            ? <ArrowBackIosIcon />
            : 'Anonygram'
          }
        </Link>{' '}
        {TokenService.hasAuthToken() ? (
          <div className='Header__div'>
            <Link
              to="/login"
              className="header-link resetStyles"
              onClick={this.handleLogout}
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className='resetStyles'>
            <Link to="/login" className="Header__link resetStyles">
              Login
            </Link>
            <Link to="/register" className="Header__link resetStyles">
              Register
            </Link>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
