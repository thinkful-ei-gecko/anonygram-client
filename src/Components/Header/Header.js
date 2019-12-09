import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { ThumbUp } from '@material-ui/icons';
import TokenService from '../../services/token-service';
import karmaService from '../../services/karma-service';

class Header extends Component{
  render() {
    const { view } = this.props;

    return (
      <header className='App-header'>
        {/* <img className='App-logo' src='images/icon.png' alt='logo'/>{' '} */}
        <Link to="/" className="resetStyles">
          <h1>Anonygram</h1>
        </Link>{' '}
        {TokenService.hasAuthToken() ? (
          <>
          <Link to="/login" className="nav-link resetStyles" onClick={() => TokenService.clearAuthToken()}>
            Logout
          </Link>
        <div className="App__karma-total"><ThumbUp/>{' '}{karmaService.getKarma()}</div>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link resetStyles">
              Login
            </Link>
            |
            <Link to="/register" className="nav-link resetStyles">
              Register
            </Link>
          </>
        )}
      |
      {(view === 'display-feed') 
        ? <Link to='/local-map' className='resetStyles' >Map View</Link>
        : <Link to='/' className='resetStyles' >Feed View</Link>
      }
      </header>
    )
  }
}

export default Header