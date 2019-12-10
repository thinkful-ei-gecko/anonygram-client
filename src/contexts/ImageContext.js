import React from 'react';

export default React.createContext({
  userLocation: {},
  newContentLoaded: null, 
  sort: ['new', 'top'],
  user: null,
  page: 1,
  images: [],
  incrementUpvotes: () => {},
  error: null,
  alert: '',
  setNewContentLoaded: () => {},
  setError: () => {},
  setAlert: () => {},
  clearError: () => {},
  clearAlert: () => {},
  resetState: () => {},
})