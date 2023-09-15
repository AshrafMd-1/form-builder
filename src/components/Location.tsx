import React from "react";
import { useGeolocated } from "react-geolocated";

export const Location = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  return !isGeolocationAvailable ? (
    <p className="text-xl text-center text-red-500">
      Your browser does not support Geolocation
    </p>
  ) : !isGeolocationEnabled ? (
    <p className="text-xl text-center text-red-500">
      Geolocation is not enabled
    </p>
  ) : coords ? (
    <>
      <p className="text-xl text-center">latitude: {coords.latitude}</p>
      <p className="text-xl text-center">longitude: {coords.longitude}</p>
    </>
  ) : (
    <p className="text-xl text-center">Getting the location data&hellip; </p>
  );
};
