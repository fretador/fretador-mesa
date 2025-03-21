import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import styles from "./LocationMap.module.css";
import SmallLoading from "../SmallLoading";

const containerStyle = {
  width: "100%",
  height: "392px",
  borderRadius: "12px"
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const LocationMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDJMiTjF5Ihj0IJLGtVKycm88B0RUgwoHE",
  });

  return isLoaded ? (
    <div className={styles.mapContainer}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      ></GoogleMap>
    </div>
  ) : (
    <div className={styles.loadingContainer}>
      <SmallLoading />
    </div>
  );
};

export default LocationMap;
