import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "700px",
};

const GoogleMapComponent = ({ rowData, selectedSheet }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    }
  }, []);

  const markers = rowData[selectedSheet] || [];

  // Function to create a numbered marker icon as a data URL
  const createNumberedMarker = (number) => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="red" stroke="white" stroke-width="3"/>
        <text x="50%" y="50%" font-size="18" font-family="Arial" font-weight="bold" fill="white"
          text-anchor="middle" alignment-baseline="middle">${number}</text>
      </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  return (
    <div style={{ marginTop: 50 }}>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation || { lat: -6.200000, lng: 106.816666 }}
          zoom={10}
        >
          {markers.map((marker, index) =>
            marker.lat && marker.lng ? (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={{
                  url: createNumberedMarker(index + 1), // Generate numbered marker
                  scaledSize: new window.google.maps.Size(40, 40), // Adjust size
                }}
                onClick={() => setSelectedMarker(marker)}
              />
            ) : console.warn(`Invalid marker at index ${index}`, marker)
          )}
          {selectedMarker && (
            <InfoWindow position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }} onCloseClick={() => setSelectedMarker(null)}>
              <div style={{ color: "black", textAlign: "left" }}>
                <h4>{selectedMarker.name}</h4>
                <p>Alamat: {selectedMarker.address}</p>
                <p>Kode Fim: {selectedMarker.fimCode}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
