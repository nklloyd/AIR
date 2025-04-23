import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Toast, ToastContainer } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import FlightTracker from './FlightTracker';

// Default marker icon adjustment
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41], // Adjusted to align the bottom center
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom airplane icon
export const airplaneIconEast = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/61/61212.png',
  iconSize: [24, 24],
  iconAnchor: [12, 14], // Adjusted to align the bottom center
});

export const airplaneIconWest = new L.Icon({ 
  iconUrl: '../src/assets/61212.png',
  iconSize: [24, 24],
  iconAnchor: [12, 14], // Adjusted to align the bottom center
  rotationOrigin: 'center',
  rotationAngle: -90,
});

// Weather icon mapping
const weatherIcons = {
  'Clear': '☀️',
  'Sunny': '☀️',
  'Cloudy': '☁️',
  'Rainy': '🌧️',
  'Stormy': '⛈️',
  'Foggy': '🌫️'
};

// Airport coordinates mapping
const airportCoordinates = {
  'LAX': { lat: 33.9416, lng: -118.4085 },
  'JFK': { lat: 40.6413, lng: -73.7781 },
  'DEN': { lat: 39.8561, lng: -104.6737 },
  'MIA': { lat: 25.7932, lng: -80.2906 },
  'GNV': { lat: 29.6942, lng: -82.2718 },
  'ATL': { lat: 33.6407, lng: -84.4277 },
  'ORD': { lat: 41.9742, lng: -87.9073 },
  'SFO': { lat: 37.7749, lng: -122.4194 },
  'LAS': { lat: 36.0840, lng: -115.1537 },
  'MCO': { lat: 28.4312, lng: -81.3081 },
  'SEA': { lat: 47.4502, lng: -122.3088 },
  'DFW': { lat: 32.8998, lng: -97.0403 }
};

// Flight interface
interface Flight {
  'Flight Number': string;
  'Airline': string;
  'Departure Code': string;
  'Departure Airport': string;
  'Arrival Code': string;
  'Arrival Airport': string;
  'Scheduled Departure': string;
  'Estimated Departure': string;
  'Scheduled Arrival': string;
  'Estimated Arrival': string;
  'Flight Status': string;
  'Departure Weather': string;
  'Arrival Weather': string;
}

// Export these types and variables for use in FlightTracker
export { airportCoordinates, weatherIcons };
export type { Flight };

// Component to handle map view updates when location changes
function LocationMarker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const map = useMap();
  const { flightNumber } = useParams<{ flightNumber: string }>();

  useEffect(() => {
    map.locate()
      .on("locationfound", (e) => {
        setPosition([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, map.getZoom());
      })
      .on("locationerror", (e) => {
        setError(e.message);
        console.error("Error getting location:", e);
      });
  }, [map]);

  return position
}

const MapComponent: React.FC = () => {
  const defaultPosition: [number, number] = [39.8283, -98.5795];
  const [flight, setFlight] = useState<Flight | null>(null);
  const { flightNumber } = useParams<{ flightNumber: string }>();

  // Consider lifting currentTime and toast state up if you need a single source of truth
  const [showWeatherToast, setShowWeatherToast] = useState(false);
  const [weatherToastType, setWeatherToastType] = useState<'departure' | 'arrival'>('departure');
  const [showCancelledToast, setShowCancelledToast] = useState(false);

  useEffect(() => {
    fetch('/mock_data/mock_flight_data.csv')
      .then(response => response.text())
      .then(csvData => {
        const lines = csvData.split('\n');
        const headers = lines[0].split(',');
        
        const parsedFlights: Flight[] = lines.slice(1).map(line => {
          const values = line.split(',');
          const entry: { [key: string]: string } = {};
          headers.forEach((header, index) => {
            entry[header] = values[index];
          });
          return entry as unknown as Flight;
        }).filter(flight => Boolean(flight['Flight Number']));
        
        const validFlights = parsedFlights.filter(flight =>
          airportCoordinates[flight['Departure Code'] as keyof typeof airportCoordinates] &&
          airportCoordinates[flight['Arrival Code'] as keyof typeof airportCoordinates]
        );
        
        const matchedFlight = validFlights.find(f => f['Flight Number'] === flightNumber);

        if (matchedFlight) {
          setFlight(matchedFlight);
        } else {
          console.warn("Flight not found:", flightNumber);
        }
        
      })
      .catch(error => {
        console.error('Error fetching flight data:', error);
      });
  }, []);

  // Handle weather toast visibility
  const handleShowWeatherToast = (show: boolean, type: 'departure' | 'arrival') => {
    setWeatherToastType(type);
    setShowWeatherToast(show);
    
    if (show) {
      // fade the toast out after 5 seconds
      setTimeout(() => {
        setShowWeatherToast(false);
      }, 5000);
    }
  };

  // Handle cancelled flight toast visibility
  const handleShowCancelledToast = (show: boolean) => {
    setShowCancelledToast(show);
    
    if (show) {
      // Auto-hide toast after 8 seconds
      setTimeout(() => setShowCancelledToast(false), 8000);
    }
  };

  return (
    <div className="flex h-full w-full relative" style={{ height: "calc(100vh - 120px)" }}>
      {/* Weather toast notification */}
      {showWeatherToast && flight && (
        <div className="absolute top-4 right-4 z-[9999] bg-white p-3 rounded-lg shadow-lg border-l-4 border-blue-500 max-w-xs">
          <div className="flex items-center">
            <div className="mr-3 text-2xl">
              {weatherIcons[
                (weatherToastType === 'departure' 
                  ? flight['Departure Weather'] 
                  : flight['Arrival Weather']
                ) as keyof typeof weatherIcons
              ] || '🌤️'}
            </div>
            <div>
              <h4 className="font-medium">Weather Alert</h4>
              <p className="text-sm text-gray-600">
                {weatherToastType === 'departure'
                  ? `Departing ${flight['Departure Airport']}`
                  : `Arriving ${flight['Arrival Airport']}`
                }: {
                  weatherToastType === 'departure'
                    ? flight['Departure Weather']
                    : flight['Arrival Weather']
                }
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Cancelled flight toast notification */}
      {showCancelledToast && flight && (
        <div className="absolute top-4 right-4 z-[9999] bg-white p-3 rounded-lg shadow-lg border-l-4 border-red-500 max-w-xs">
          <div className="flex items-center">
            <div className="mr-3 text-2xl">
              ❌
            </div>
            <div>
              <h4 className="font-medium">Flight Cancelled</h4>
              <p className="text-sm text-gray-600">
                Flight {flight['Flight Number']} from {flight['Departure Code']} to {flight['Arrival Code']} has been cancelled.
              </p>
            </div>
          </div>
        </div>
      )}

<MapContainer 
  center={defaultPosition} 
  zoom={4} 
  className="h-full w-3/4"
  style={{ height: "100%" }}
>
  {/* Base layer */}
  <TileLayer
    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    subdomains="abcd"
    maxZoom={19}
  />
  <LocationMarker />
  <FlightTracker 
    flight={flight} 
    onShowWeatherToast={handleShowWeatherToast}
    onShowCancelledToast={handleShowCancelledToast}
  />
</MapContainer>

      
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto shadow-lg" style={{ height: "100%" }}>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Flight Information</h3>
        {/* Note: To synchronize time, consider passing the currentTime from FlightTracker here */}
        {flight ? (
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h4 className="text-lg font-medium mb-2">{flight['Flight Number']} - {flight['Airline']}</h4>
            <p className="mb-2">
              <span className="font-semibold">Route:</span> {flight['Departure Code']} ({flight['Departure Airport']}) → {flight['Arrival Code']} ({flight['Arrival Airport']})
            </p>
            <p className="mb-2">
              <span className="font-semibold">Departure:</span> {new Date(flight['Scheduled Departure']).toLocaleString()}
              {flight['Scheduled Departure'] !== flight['Estimated Departure'] && 
                <span className="text-orange-500"> (Est: {new Date(flight['Estimated Departure']).toLocaleString()})</span>}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Arrival:</span> {new Date(flight['Scheduled Arrival']).toLocaleString()}
              {flight['Scheduled Arrival'] !== flight['Estimated Arrival'] && 
                <span className="text-orange-500"> (Est: {new Date(flight['Estimated Arrival']).toLocaleString()})</span>}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Status:</span> 
              <span className={
                flight['Flight Status'] === 'On Time' ? 'text-green-600 ml-2' : 
                flight['Flight Status'] === 'Delayed' ? 'text-orange-500 ml-2' : 
                'text-red-500 ml-2'
              }>
                {flight['Flight Status']}
              </span>
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="font-semibold mb-2">Weather:</p>
              <p>{weatherIcons[flight['Departure Weather'] as keyof typeof weatherIcons] || ''} {flight['Departure Weather']}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-700">Loading flight information...</p>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
