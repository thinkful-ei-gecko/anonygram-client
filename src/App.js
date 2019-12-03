import React, {Component} from 'react';
import { Route, Switch } from 'react-dom';
import './App.css';
import SubmissionForm from './SubmissionForm/SubmissionForm';
import karmaService from './services/karma-service';
import DisplayFeed from './Display-feed/DisplayFeed';
import DisplaySingle from './DisplaySingle/DisplaySingle';
import NavBar from './NavBar/NavBar';

const photoObj = {
  id: 1,
  image_url: 'https://via.placeholder.com/150',
  karma_total: 20,
  comments: [
    {
      timestamp: Date(),
      userId: 1, 
      id: 1, 
      text: 'i am so coolasldkflskjdflksjdflksjdlfkjsdlfkjsldkfjslkdfjlskdjflskdjfsldkjflksdjflskjdf'
    }, 
    {
      timestamp: Date(),
      userId: 2, 
      id: 2, 
      text: 'lalala'
    }, 
    {
      timestamp: Date(),
      userId: 1, 
      id: 3, 
      text: 'testing and it feels so good'
    }, 
    {
      timestamp: Date(),
      userId: 3, 
      id: 4, 
      text: 'dslfjklkfjlsdkjf'
    }, 
  ]
}

class App extends Component {
  state = {
    userLocation: {},
    newContentLoaded: false,
    sort: ['new', 'top'],
    photoObj: photoObj,
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

  // renderMainRoutes = () => {
  //   const { sort, userLocation, newContentLoaded, photoObj, } = this.state;
  //   return (
  //     <>
  //       <Route exact path='/' render={() => <DisplayFeed sort={sort} userLocation={userLocation} newContentLoaded={newContentLoaded} updateNewContent={this.setNewContentLoaded} />}
  //       />

  //       <Route path={`/${photoObj.id}`} render={() => <DisplaySingle photoObj={photoObj}/>} />
  //     </>
  //   )
  // }
 
  render(){
    const { sort, userLocation, newContentLoaded, } = this.state;

    return (
      <div className="App">
        <header className='App-header'>
          {/* <img className='App-logo' src='images/icon.png' alt='logo'/>{' '} */}
          <h1>Anonygram</h1>
        </header>
        <NavBar setSort={this.setSort} />
        <DisplaySingle photoObj={this.state.photoObj}/>

        {/* {(this.state.photoObj)
          ? (
            <DisplayFeed 
              sort={sort}
              userLocation={userLocation} 
              newContentLoaded={newContentLoaded}
              updateNewContent={this.setNewContentLoaded}
            />
          )
          : (
            <DisplaySingle photoObj={this.state.photoObj}/>
          )
        } */}
        {/* {this.renderMainRoutes()} */}
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

