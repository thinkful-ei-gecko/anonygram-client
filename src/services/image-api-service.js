import config from '../config';

const ImageApi = {
  getLocalImages(sort, lat, long) {
    return fetch(`${config.API_ENDPOINT}?sort=${sort}&lat=${lat}&lon=${long}`, {
    })
      .then((res) => 
        (!res.ok)
          ? res.json().then((e) => Promise.reject(e))
          : res.json()
      )
  },
  patchImageKarma(imageId, karma_total) {
    return fetch(`${config.API_ENDPOINT}/${imageId}`, {
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
  getImageObj(imageId) {
    return fetch(`${config.API_ENDPOINT}/${imageId}`, {
    })
      .then((res) => 
        (!res.ok)
          ? res.json().then((e) => Promise.reject(e))
          : res.json()
      )
  },
  postImageComment(imageId, userId, commentText) {
    return fetch(`${config.API_ENDPOINT}/${imageId}/comments`, {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({ userId, text: commentText })
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