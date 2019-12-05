export default {
  // API_ENDPOINT: 'https://anonygram.herokuapp.com/api'
  API_ENDPOINT: process.env.NODE_ENV === "production" 
    ? process.env.REACT_APP_API_ENDPOINT
    : 'http://localhost:8000',
}