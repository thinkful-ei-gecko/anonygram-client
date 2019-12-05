import config from '../config'


const AuthApiService = {
    postLogin({ username, password }) {
        return fetch(`${config.API_ENDPOINT}/api/auth/`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(err => Promise.reject(err))
              : res.json()
          )
    }
  }
    
export default AuthApiService
