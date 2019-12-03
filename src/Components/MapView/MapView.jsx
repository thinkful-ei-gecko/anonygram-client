import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import ImageApi from '../../services/image-api-service';

function MapView(props) {

  const { userLocation } = props;
  const { lat, long } = userLocation;

  const [imageFeed, setImageFeed] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
      setLoading(true);
      ImageApi.getLocalImages('new', lat, long)
          .then((res) => {
              console.log(res);
              setImageFeed(res);
              setLoading(false);
          })
  }, [lat, long]);

  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  const markerStyles = {
    width: '30px',
    height: '30px',
  }

  const handleMarkerClick = (markerImg) => {
    console.log('you clicked me!');
    console.log(markerImg);
  }

  const generateMarkers = () => {

    let positions = imageFeed.map((point) => {
      return {lat: point.latitude, long: point.longitude}
    });

    console.log(positions);
    
    let jsx = imageFeed.map((point) => {
      if (zoom <= 12) {

      }
    })
  }

  return (
  
    <Map 
      google={props.google}
      zoom={12}
      style={mapStyles}
      initialCenter={{ lat: lat, lng: long }}
    >
    {imageFeed.map((point) => (
      <Marker 
        key={point.id}
        icon={{url: point.image_url, scaledSize: new props.google.maps.Size(55, 55) }}
        style={markerStyles}
        position={{ lat: point.latitude, lng: point.longitude }}
        onClick={() => handleMarkerClick(point.image_url)}
      />
    ))}
    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBb2utrjFRSCxMZmnnMJB0v7SiBhCwujN8'
})(MapView);

/*

TODO: stash API key
Load/update image feed on app and pass it down as props
modal the markers so they pop up with the pic

*/