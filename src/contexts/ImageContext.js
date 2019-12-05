import React from 'react';

export default React.createContext({
  userLocation: {},
  newContentLoaded: false, 
  sort: ['new', 'top'],
  user: null,
  images: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  resetState: () => {},
})