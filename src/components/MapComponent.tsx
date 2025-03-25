import React, { useState, useEffect } from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map view updates when location changes
function LocationMarker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    }).on("locationerror", (e) => {
      setError(e.message);
      console.error("Error getting location:", e);
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        You are here
      </Popup>
    </Marker>
  );
}

const MapComponent: React.FC = () => {
    // Default position if geolocation fails
    const defaultPosition: [number, number] = [51.505, -0.09];
    
    return (
        <MapContainer 
            center={defaultPosition} 
            zoom={13} 
            style={{height: '100vh'}}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                subdomains="abcd"
                maxZoom={19}
            />
            <LocationMarker />
        </MapContainer>
    );
};

export default MapComponent;