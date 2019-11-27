import config from '../config';

const ImageApi = {
  getLocalImages(sort, lat, long) {
    return fetch(`${config.API_ENDPOINT}/sort=${sort}&lat=${lat}&long=${long}`, {
      headers: {

      },
    })
      .then((res) => {
        (!res.ok)
          ? res.json().then((e) => Promise.reject(e))
          : res.json();
      });
  },
  patchImageKarma(id, karma_total) {
    fetch(`${config.API_ENDPOINT}/images/${id}`, {
			method: "PATCH",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({karma_total: karma_total})
    })  
      .then((res) => {
        (!res.ok)
          ? res.json().then((e) => Promise.reject(e))
          : res.json();
      })
      .catch(err => console.log("Error", err));

  }
}

export default ImageApi;