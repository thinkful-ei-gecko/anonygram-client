import React, {Component} from 'react';
import { Route , Link } from 'react-router-dom';
import './App.css';
import SubmissionForm from './SubmissionForm/SubmissionForm';
import karmaService from './services/karma-service';
import DisplayFeed from './Display-feed/DisplayFeed';
import NavBar from './NavBar/NavBar';
import Login from './Login/Login';
import Register from './Register/Register';



class App extends Component {
  state = {
    userLocation: {},
    newContentLoaded: false,
    sort: ['new', 'top'],
    user: null
  }

  componentDidMount() {
    //Add karma to localStorage if it doesn't exist there yet.
    if (!karmaService.getKarma() && karmaService.getKarma() !== 0) {
      karmaService.setNewKarma();
    }
    navigator.geolocation.getCurrentPosition(this.setPosition);
  }

  setPosition = (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const posObj = { lat, long }
    this.setState({ userLocation: posObj });
  }

  setNewContentLoaded = () => {
    let temp = !this.state.newContentLoaded;
    this.setState({ newContentLoaded: temp })
  }

  setSort = () => {
    const clone = [...this.state.sort]
    clone.reverse();
    this.setState({ sort: clone });
  }

  loginUser = (username, password) => {
    this.setState({
      user: {username, password}
    })
  }


 
  render(){
    const { sort, userLocation, newContentLoaded, } = this.state;

    return (
      <div className="App">
        <header className='App-header'>
          <img className='App-logo' src='images/icon.png' alt='logo'/>{' '}
          <h1>Anonygram</h1>
          <Link to="/login" className="nav-link" >Login</Link> |
          <Link to="/register" className="nav-link" >Register</Link>
          
        </header>
        <Route exact path='/login' component={Login} loginUser = {this.loginUser} /> 
        <Route exact path='/register'component={Register} loginUser = {this.loginUser}/> 
       

        <NavBar setSort={this.setSort} />
        <DisplayFeed 
          sort={sort}
          userLocation={userLocation} 
          newContentLoaded={newContentLoaded}
          updateNewContent={this.setNewContentLoaded}
        />
        <SubmissionForm 
          userLocation={userLocation} 
          newContentLoaded={newContentLoaded} 
          updateNewContent={this.setNewContentLoaded} 
        />
      </div>
    );
  }
}

export default App;


