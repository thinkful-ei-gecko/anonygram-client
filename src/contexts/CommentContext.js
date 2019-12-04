import React, { Component } from 'react';

const CommentContext = React.createContext({
  error: null,
  usernames: {}, 
  incrementor: -1,
  setError: () => {},
  clearError: () => {},
  resetState: () => {},
  setUsernames: () => {},
  setIncrementor: () => {},
})

export default CommentContext;

export class CommentProvider extends Component {
  constructor(props) {
    super(props)
    const state = { usernames: {}, incrementor: -1, error: null }

    this.state = state;
  };

  resetState = () => {
    this.setState({
      error: null,
      usernames: {}, 
      incrementor: -1,
    })
  }

  setError = error => {
    console.error(error)
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setUsernames = usernames => {
    this.setState({ usernames });
  };

  setIncrementor = incrementor => {
    this.setState({ incrementor });
  };
  
  render() {
    const value = {
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      resetState: this.resetState,
      setUsernames: this.setUsernames,
      setIncrementor: this.setIncrementor,
    }
    return (
      <CommentContext.Provider value={value}>
        {this.props.children}
      </CommentContext.Provider>
    )
  }
}
