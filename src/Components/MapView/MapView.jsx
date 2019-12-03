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

  const truncateCoord = (coord) => {
    coord.toString();
    let decimal = coord.indexOf('.');
    return Number(coord.slice(0, (decimal + 4)))
  }

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
        } else if (Math.abs(positions[i].lat - positions[j].lat) <= 0.005 && Math.abs(positions[i].long - positions[j].long <= 0.005)) {
          positions[j].zoomLevel = 14;
        }
      }
    }

    let jsx = positions.map((point) => {
      if (zoom >= point.zoomLevel) {
        return (
          <Marker
          key={point.id}
          icon={{ url: point.img, scaledSize: new props.google.maps.Size(55, 55) }}
          style={markerStyles}
          position={{ lat: point.lat, lng: point.long }}
          onClick={() => handleMarkerClick(point.image_url)}
        />
        )
      }
    })
    return jsx;
  }

  generateMarkers();

  return (

    <Map
      google={props.google}
      zoom={12}
      style={mapStyles}
      initialCenter={{ lat: lat, lng: long }}
    >
      {generateMarkers()}
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