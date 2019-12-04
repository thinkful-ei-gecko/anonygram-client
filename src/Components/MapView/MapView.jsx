import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import ImageApi from '../../services/image-api-service';
import Modal from './Modal/Modal';
import config from '../../config';

function MapView(props) {

  const { userLocation } = props;
  const { lat, long } = userLocation;

  const [imageFeed, setImageFeed] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [zoomState, setZoomState] = useState(12);
  const [displayModal, setDisplayModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const zoomBoundaries = { min: 12, max: 14 };

  let holderZoom = zoomState;

  useEffect(() => {
    setLoading(true);
    ImageApi.getLocalImages('new', lat, long)
      .then((res) => {
        setImageFeed(res);
        setLoading(false);
      })
  }, [lat, long]);

  useEffect(() => {
    window.addEventListener('wheel', wheelHandler);
    return () => {
      window.removeEventListener('wheel', wheelHandler);
    }
  }, []);

  const wheelHandler = (e) => {
    if (e.deltaY > 0) {
      setTimeout(() => {
        if (holderZoom - 1 >= zoomBoundaries.min) {
          setZoomState(zoomState => zoomState -= 1);
          holderZoom -= 1;
        }
      }, 100);

    } else if (e.deltaY < 0) {
      setTimeout(() => {
        if (holderZoom + 1 <= zoomBoundaries.max) {
          setZoomState(zoomState => zoomState += 1);
          holderZoom += 1;
        }
      }, 100);
    }
  };

  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  const handleMarkerClick = (markerImg) => {
    setDisplayModal(true);
    setModalImage(markerImg);
  };

  const handleClose = () => {
    setDisplayModal(false);
    setModalImage('');
  };

  const truncateCoord = (coord) => {
    coord.toString();
    let decimal = coord.indexOf('.');
    return Number(coord.slice(0, (decimal + 4)))
  };

  const generateMarkers = () => {
    let positions = imageFeed.map((point) => {
      const lat = truncateCoord(point.latitude);
      const long = truncateCoord(point.longitude);
      return { lat, long, img: point.image_url, karma: point.karma_total, id: point.id, zoomLevel: 12 }
    });

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (Math.abs(positions[i].lat - positions[j].lat) <= 0.01 && Math.abs(positions[i].long - positions[j].long <= 0.01)) {
          positions[j].zoomLevel = 13;
        } else if (Math.abs(positions[i].lat - positions[j].lat) <= 0.008 && Math.abs(positions[i].long - positions[j].long <= 0.008)) {
          positions[j].zoomLevel = 14;
        }
      }
    }

    let jsx = positions.map((point) => {
      if (zoomState >= point.zoomLevel) {
        let scale = 55;
        if (zoomState === 13) {
          scale = 65;
        }
        if (zoomState >= 14) {
          scale = 85;
        }

        return (
          <Marker
            key={point.id}
            icon={{ url: point.img, scaledSize: new props.google.maps.Size(scale, scale) }}
            position={{ lat: point.lat, lng: point.long }}
            onClick={() => handleMarkerClick(point.img)}
          />
        )
      }
    })
    return jsx;
  };

  return (
    <>
      <Map
        google={props.google}
        zoom={zoomState}
        style={mapStyles}
        initialCenter={{ lat: lat, lng: long }}
        defaultOptions={{ draggable: false }}
        onClick={handleClose}
        disableDefaultUI={true}
        gestureHandling="none"
        zoomControl={false}
        
      >
        {generateMarkers()}
      </Map>
      {displayModal 
        ? <Modal 
        img={modalImage}
        />
        : <></>
      }
    </>
  )
}

export default GoogleApiWrapper({
  apiKey: config.REACT_APP_MAP_API_KEY
})(MapView);

/*

TODO: stash API key
Load/update image feed on app and pass it down as props
modal the markers so they pop up with the pic

can we set bounds instead of locking all movment?

Look into hotpads - similar version

*/
