import React from 'react';

export default React.createContext({
  userLocation: {},
  newContentLoaded: null, 
  sort: ['new', 'top'],
  user: null,
  page: null,
  morePagesAvail: null,
  debounce: null,
  images: [],
  incrementUpvotes: () => {},
  error: null,
  alert: '',
  setNewContentLoaded: () => {},
  setPage: () => {},
  setMorePagesAvail: () => {},
  setDebounce: () => {},
  setError: () => {},
  setAlert: () => {},
  clearError: () => {},
  clearAlert: () => {},
  resetState: () => {},
})