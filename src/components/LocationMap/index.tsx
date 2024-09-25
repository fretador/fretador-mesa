import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import styles from './LocationMap.module.css';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const LocationMap = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBtNNarnAAqG4almAYbKLIkIZVV">
      <div className={styles.mapContainer}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          {/* Você pode adicionar marcadores, polígonos, etc. aqui */}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default LocationMap;
