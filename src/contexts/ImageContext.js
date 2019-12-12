import React, { useContext } from 'react';
export const useImageContext = () => useContext(ImageContext);
const defaultValues = {
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
  handleDelete: () => {},
}
const ImageContext = React.createContext(defaultValues)

export default ImageContext;
