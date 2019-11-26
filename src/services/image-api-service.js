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
}

export default ImageApi;