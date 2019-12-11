import React, { useContext } from 'react';
export const useImageContext = () => useContext(ImageContext);
const defaultValues = {
  userLocation: {},
  newContentLoaded: null, 
  sort: ['new', 'top'],
  user: null,
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
  handleDelete: () => {},
}
const ImageContext = React.createContext(defaultValues)

export default ImageContext;
