import config from '../config'


const AuthApiService = {
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/api/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
   },
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
