// Typescript model for Flights

export interface Flight {
    flightNumber: string;
    airline: string;
    departureCode: string;
    departureAirport: string;
    arrivalCode: string;
    arrivalAirport: string;
    scheduledDeparture: Date;  
    estimatedDeparture: Date;
    scheduledArrival: Date;
    estimatedArrival: Date;
    flightStatus: "On Time" | "Delayed" | "Cancelled";  // Limit status values
    departureWeather: string;
    arrivalWeather: string;
  }
  