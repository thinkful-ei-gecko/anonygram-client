import config from '../config';

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
<<<<<<< HEAD
  patchImageKarma(id, karma_total) {
    return fetch(`${config.API_ENDPOINT}/api/images/${id}`, {
=======
  patchImageKarma(imageId, karma_total) {
    return fetch(`${config.API_ENDPOINT}/${imageId}`, {
>>>>>>> a1c47d02ffa669724f42b3d5c791c77525875092
			method: "PATCH",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({karma_total: karma_total})
    })  
      .then((res) => {
        return (!res.ok)
          ? res.json().then((e) => Promise.reject(e))
          : res.json();
      })
      .catch(err => console.log("Error", err));
  }, 
  getImage(imageId) {
    return fetch(`${config.API_ENDPOINT}/comments/${imageId}`, {
    })
      .then((res) => 
        (!res.ok)
          ? res.json().then((e) => Promise.reject(e))
          : res.json()
      )
  },
  postImageComment(newComment) {
    return fetch(`${config.API_ENDPOINT}/comments/${id}`, {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({ comment_timestamp: new Date(), ...newComment})
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