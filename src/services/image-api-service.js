import config from '../config';
import TokenService from './token-service'

const ImageApi = {
  getLocalImages(sort, lat, long) {
    return fetch(`${config.API_ENDPOINT}/api/images/?sort=${sort}&lat=${lat}&lon=${long}`, {
    })
      .then((res) => 
        (!res.ok)
          ? res.json().then((e) => Promise.reject(e))
          : res.json()
      )
  },

  patchImageKarma(id) {
    return fetch(`${config.API_ENDPOINT}/api/images/${id}`, {
			method: "PATCH",
			headers: {
        "Authorization": `Bearer ${TokenService.getAuthToken()}`,
				"content-type": "application/json"
			}
    })  
      .then((res) => {
        return (!res.ok)
          ? res.json().then((e) => Promise.reject(e))
          : res.json();
      })
      .catch(err => console.log("Error", err));
  },
}

export default ImageApi;