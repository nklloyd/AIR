import React, { useState, useEffect } from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMap, Polyline} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Toast, ToastContainer } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom airplane icon
const airplaneIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/61/61212.png', // Using a URL to an airplane icon
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// Weather icon mapping
const weatherIcons: {[key: string]: string} = {
  'Clear': '☀️',
  'Sunny': '☀️',
  'Cloudy': '☁️',
  'Rainy': '🌧️',
  'Stormy': '⛈️',
  'Foggy': '🌫️'
};

// Airport coordinates mapping
const airportCoordinates: {[key: string]: {lat: number, lng: number}} = {
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

// FlightTracker component to track a single flight
function FlightTracker({ flight }: { flight: Flight | null }) {
  const map = useMap();
  const [currentTime, setCurrentTime] = useState<Date>(new Date('2025-03-20T12:00:00'));
  const [flightPosition, setFlightPosition] = useState<{lat: number, lng: number} | null>(null);
  const [progress, setProgress] = useState(0);
  const [showWeatherToast, setShowWeatherToast] = useState(false);
  const [weatherToastType, setWeatherToastType] = useState<'departure' | 'arrival'>('departure');

  // Simulate flight progress
  useEffect(() => {
    if (!flight) return;
    
    const scheduledDeparture = new Date(flight['Scheduled Departure']);
    const estimatedArrival = new Date(flight['Estimated Arrival']);
    
    // Start time at scheduled departure
    setCurrentTime(scheduledDeparture);
    
    const timer = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = new Date(prev);
        newTime.setMinutes(newTime.getMinutes() + 10); // Advance 10 minutes each tick
        
        // Check if time has reached or passed estimated arrival
        if (newTime >= estimatedArrival) {
          clearInterval(timer);
          return estimatedArrival;
        }
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [flight]);

  // Update flight position based on current time
  useEffect(() => {
    if (!flight) return;
    
    const departureCode = flight['Departure Code'];
    const arrivalCode = flight['Arrival Code'];
    
    if (airportCoordinates[departureCode] && airportCoordinates[arrivalCode]) {
      const departure = airportCoordinates[departureCode];
      const arrival = airportCoordinates[arrivalCode];
      
      const scheduledDeparture = new Date(flight['Scheduled Departure']);
      const estimatedArrival = new Date(flight['Estimated Arrival']);
      
      // Calculate progress (0 to 1)
      const totalFlightTime = estimatedArrival.getTime() - scheduledDeparture.getTime();
      const elapsed = currentTime.getTime() - scheduledDeparture.getTime();
      const newProgress = Math.min(Math.max(elapsed / totalFlightTime, 0), 1);
      
      setProgress(newProgress);
      
      // Show departure weather toast near beginning of flight
      if (newProgress > 0.05 && newProgress < 0.1) {
        setWeatherToastType('departure');
        setShowWeatherToast(true);
      }
      // Show arrival weather toast near end of flight
      else if (newProgress > 0.9 && newProgress < 0.95) {
        setWeatherToastType('arrival');
        setShowWeatherToast(true);
      }
      
      // Interpolate position
      const currentLat = departure.lat + (arrival.lat - departure.lat) * newProgress;
      const currentLng = departure.lng + (arrival.lng - departure.lng) * newProgress;
      
      setFlightPosition({ lat: currentLat, lng: currentLng });
    }
  }, [currentTime, flight]);

  // Hide weather toast after 5 seconds
  useEffect(() => {
    if (!showWeatherToast) return;
    
    const timeout = setTimeout(() => {
      setShowWeatherToast(false);
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, [showWeatherToast]);

  if (!flight || !flightPosition) return null;

  const departureCode = flight['Departure Code'];
  const arrivalCode = flight['Arrival Code'];
  
  if (!airportCoordinates[departureCode] || !airportCoordinates[arrivalCode]) return null;
  
  const departure = airportCoordinates[departureCode];
  const arrival = airportCoordinates[arrivalCode];

  return (
    <>
      {/* Render departure airport */}
      <Marker position={[departure.lat, departure.lng]}>
        <Popup>{flight['Departure Airport']} ({departureCode})</Popup>
      </Marker>
      
      {/* Render arrival airport */}
      <Marker position={[arrival.lat, arrival.lng]}>
        <Popup>{flight['Arrival Airport']} ({arrivalCode})</Popup>
      </Marker>
      
      {/* Render flight path */}
      <Polyline 
        positions={[[departure.lat, departure.lng], [arrival.lat, arrival.lng]]} 
        color={flight['Flight Status'] === 'On Time' ? 'green' : flight['Flight Status'] === 'Delayed' ? 'orange' : 'red'}
        opacity={0.6} 
        weight={3}
      />
      
      {/* Render airplane position */}
      <Marker position={[flightPosition.lat, flightPosition.lng]} icon={airplaneIcon}>
        <Popup>
          {flight['Flight Number']} - {flight['Airline']}<br />
          {flight['Departure Code']} → {flight['Arrival Code']}<br />
          Status: {flight['Flight Status']}
        </Popup>
      </Marker>
    </>
  );
}

const MapComponent: React.FC = () => {
    // Default position for US centered view
    const defaultPosition: [number, number] = [39.8283, -98.5795];
    const [flight, setFlight] = useState<Flight | null>(null);
    const [currentTime, setCurrentTime] = useState<Date>(new Date('2025-03-20T12:00:00'));
    const [showWeatherToast, setShowWeatherToast] = useState(false);
    const [weatherToastType, setWeatherToastType] = useState<'departure' | 'arrival'>('departure');
    
    // Find a random flight
    useEffect(() => {
        fetch('/mock_data/mock_flight_data.csv')
          .then(response => response.text())
          .then(csvData => {
            // Parse CSV
            const lines = csvData.split('\n');
            const headers = lines[0].split(',');
            
            const parsedFlights: Flight[] = lines.slice(1).map(line => {
              const values = line.split(',');
              const entry: {[key: string]: string} = {};
              
              headers.forEach((header, index) => {
                entry[header] = values[index];
              });
              
              return entry as unknown as Flight;
            }).filter(flight => Boolean(flight['Flight Number']));
            
            // Filter flights with valid airport codes
            const validFlights = parsedFlights.filter(flight => {
              return airportCoordinates[flight['Departure Code']] && 
                     airportCoordinates[flight['Arrival Code']];
            });
            
            if (validFlights.length > 0) {
              // Select a random flight
              const randomIndex = Math.floor(Math.random() * validFlights.length);
              const randomFlight = validFlights[randomIndex];
              setFlight(randomFlight);
            }
          })
          .catch(error => {
            console.error('Error fetching flight data:', error);
          });
    }, []);

    // Simulate flight progress
    useEffect(() => {
        if (!flight) return;
        
        const scheduledDeparture = new Date(flight['Scheduled Departure']);
        
        // Start time at scheduled departure
        setCurrentTime(scheduledDeparture);
    }, [flight]);
    
    return (
        <div className="flex h-full w-full relative" style={{ height: "calc(100vh - 120px)" }}>
            <MapContainer 
                center={defaultPosition} 
                zoom={4} 
                className="h-full w-3/4"
                style={{ height: "100%" }}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    subdomains="abcd"
                    maxZoom={19}
                />
                <LocationMarker />
                <FlightTracker flight={flight} />
            </MapContainer>
            
            {/* Flight information sidebar */}
            <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto shadow-lg" style={{ height: "100%" }}>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Flight Information</h3>
                <div className="bg-gray-800 text-white p-3 rounded-md mb-4 text-center">
                    Current Time: {currentTime.toLocaleString()}
                </div>
                
                {flight ? (
                    <div className="bg-white p-4 rounded-lg shadow mb-4">
                        <h4 className="text-lg font-medium mb-2">{flight['Flight Number']} - {flight['Airline']}</h4>
                        <p className="mb-2">
                            <span className="font-semibold">Route:</span> {flight['Departure Code']} ({flight['Departure Airport']}) → 
                            {flight['Arrival Code']} ({flight['Arrival Airport']})
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
                                'text-red-600 ml-2'
                            }>
                                {flight['Flight Status']}
                            </span>
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="font-semibold mb-2">Weather:</p>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Departure</p>
                                    <p>{weatherIcons[flight['Departure Weather']] || ''} {flight['Departure Weather']}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Arrival</p>
                                    <p>{weatherIcons[flight['Arrival Weather']] || ''} {flight['Arrival Weather']}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-700">Loading flight information...</p>
                )}
            </div>
            
            {/* toast*/}
            {flight && showWeatherToast && (
                <div className="absolute top-4 right-[calc(25%+1rem)] z-50 bg-white p-3 rounded-lg shadow-lg border-l-4 border-blue-500 max-w-xs">
                    <div className="flex items-center">
                        <div className="mr-3 text-2xl">
                            {weatherIcons[
                                weatherToastType === 'departure' 
                                    ? flight['Departure Weather'] 
                                    : flight['Arrival Weather']
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
        </div>
    );
};

export default MapComponent;