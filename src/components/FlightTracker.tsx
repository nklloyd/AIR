import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMap, Polyline } from 'react-leaflet';
import { airportCoordinates, Flight, airplaneIconEast, weatherIcons, airplaneIconWest } from './MapComponent';

interface FlightTrackerProps {
  flight: Flight | null;
  onShowWeatherToast: (show: boolean, type: 'departure' | 'arrival') => void;
  onShowCancelledToast: (show: boolean) => void;
}

function FlightTracker({ flight, onShowWeatherToast, onShowCancelledToast }: FlightTrackerProps) {
  const map = useMap();
  const [currentTime, setCurrentTime] = useState<Date>(new Date('2025-03-20T12:00:00'));
  const [flightPosition, setFlightPosition] = useState<{lat: number, lng: number} | null>(null);
  const [progress, setProgress] = useState(0);

  // Check for cancelled flights first
  useEffect(() => {
    if (flight && flight['Flight Status'] === 'Cancelled') {
      onShowCancelledToast(true);
    }
  }, [flight, onShowCancelledToast]);

  // Simulate flight progress only for non-cancelled flights
  useEffect(() => {
    if (!flight || flight['Flight Status'] === 'Cancelled') return;
    
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

  // Update flight position based on current time (only for non-cancelled flights)
  useEffect(() => {
    if (!flight || flight['Flight Status'] === 'Cancelled') return;
    
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
        onShowWeatherToast(true, 'departure');
      }
      // Show arrival weather toast near end of flight
      else if (newProgress > 0.9 && newProgress < 0.95) {
        onShowWeatherToast(true, 'arrival');
      }
      
      // Interpolate position
      const currentLat = departure.lat + (arrival.lat - departure.lat) * newProgress;
      const currentLng = departure.lng + (arrival.lng - departure.lng) * newProgress;
      
      setFlightPosition({ lat: currentLat, lng: currentLng });
    }
  }, [currentTime, flight, onShowWeatherToast]);

  if (!flight) return null;

  const departureCode = flight['Departure Code'];
  const arrivalCode = flight['Arrival Code'];
  
  if (!airportCoordinates[departureCode] || !airportCoordinates[arrivalCode]) return null;
  
  const departure = airportCoordinates[departureCode];
  const arrival = airportCoordinates[arrivalCode];
  
  const isCancelled = flight['Flight Status'] === 'Cancelled';

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
      
      {/* Render flight path only for non-cancelled flights */}
      {!isCancelled && (
        <Polyline 
          positions={[[departure.lat, departure.lng], [arrival.lat, arrival.lng]]} 
          color={flight['Flight Status'] === 'On Time' ? 'green' : flight['Flight Status'] === 'Delayed' ? 'orange' : 'red'}
          opacity={0.6} 
          weight={3}
        />
      )}
      
      {/* Render airplane position only for non-cancelled flights */}
      {!isCancelled && flightPosition && (
        // if departure airport is to the right of arrivalairport, use airplaneIconWest, else use airplaneIconEast
        <Marker
          position={[flightPosition.lat, flightPosition.lng]}
          icon={
            departure.lng > arrival.lng ? airplaneIconWest : airplaneIconEast
          }
        >
          <Popup>
            {flight['Flight Number']} - {flight['Airline']}<br />
            {flight['Departure Code']} → {flight['Arrival Code']}<br />
            Status: {flight['Flight Status']}
          </Popup>
        </Marker>
      )}
    </>
  );
}

export default FlightTracker;