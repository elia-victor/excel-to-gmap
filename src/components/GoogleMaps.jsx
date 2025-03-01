import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "75%",
  height: "500px",
};

const GoogleMapComponent = ({ rowData, selectedMarker, setSelectedMarker }) => {
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

  // Function to generate a Google Maps link for a specific marker
  const generateGoogleMapsLink = (lat, lng) => {
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

  return (
    <>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={rowData.length > 0 ? rowData[0] : currentLocation}
          zoom={10}
        >
          {rowData.map((marker, index) =>
            marker.lat && marker.lng ? (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={{
                  url: createNumberedMarker(index + 1),
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
                onClick={() => setSelectedMarker(marker)}
              />
            ) : console.warn(`Invalid marker at index ${index}`, marker)
          )}

          {selectedMarker && (
            <InfoWindow position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }} onCloseClick={() => setSelectedMarker(null)}>
              <div style={{ color: "black", textAlign: "left" }}>
                <h3>{selectedMarker.name}</h3>
                <p><strong>Alamat:</strong> {selectedMarker.address}</p>
                <p><strong>Kode FIM:</strong> {selectedMarker.fimCode}</p>
                <p><strong>Koordinat:</strong> {`${selectedMarker.lat},${selectedMarker.lng}`}</p>
                <p><strong>Kolektibilitas:</strong> {selectedMarker.collectability}</p>
                <p><strong>Tanggal:</strong> {selectedMarker.date}</p>
                <p><strong>Keterangan:</strong> {selectedMarker.description}</p>
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                  <a
                    href={generateGoogleMapsLink(selectedMarker.lat, selectedMarker.lng)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "8px 12px",
                      backgroundColor: "#0000E6",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Share Location 📍
                  </a>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default GoogleMapComponent;
