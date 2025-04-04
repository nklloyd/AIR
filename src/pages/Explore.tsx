import { useEffect, useState } from 'react';
import { loadFlightData } from '../utils/parseCSV';
import SearchDialog from './SearchDialog';

export default function Explore() {
  const [flights, setFlights] = useState<any[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<any[]>([]);

      useEffect(() => {
    loadFlightData().then(data => {
      console.log("Loaded flight data:", data); 
      setFlights(data);
    });
  }, []);
  

  const handleSearch = (filters: any) => {
    const fieldMap: Record<string, string> = {
      flightNumber: "Flight Number",
      airline: "Airline",
      departureCode: "Departure Code",
      departureAirport: "Departure Airport",
      scheduledDeparture: "Departure Date",
      arrivalCode: "Arrival Code",
      arrivalAirport:"Arrival Airport",
      scheduledArrival: "Arrival Date",
      flightStatus: "Flight Status",
      departureWeather: "Departure Weather",
      arrivalWeather: "Arrival Weather",
    };
  
    const filtered = flights.filter(flight => {
      return Object.entries(filters).every(([key, value]) => {
        const field = fieldMap[key];
        return value
          ? flight[field]?.toLowerCase().includes(value.toLowerCase())
          : true;
      });
    });
  
    setFilteredFlights(filtered);
  };
  

  return (
    <div className="p-4">
      <SearchDialog onSearch={handleSearch} />

      {filteredFlights.length > 0 ? (
        <div className="overflow-x-auto mt-8">
          <table className="min-w-full border border-gray-300 rounded-lg shadow">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Flight #</th>
                <th className="px-4 py-2 text-left">Airline</th>
                <th className="px-4 py-2 text-left">From → To</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Departure</th>
                <th className="px-4 py-2 text-left">Arrival</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredFlights.map((flight, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{flight["Flight Number"]}</td>
                  <td className="px-4 py-2">{flight["Airline"]}</td>
                  <td className="px-4 py-2">
                    {flight["Departure Code"]} → {flight["Arrival Code"]}
                  </td>
                  <td className="px-4 py-2">{flight["Flight Status"]}</td>
                  <td className="px-4 py-2">
                    {flight["Scheduled Departure"]?.split(" ")[1]}<br />
                    <span className="text-sm text-gray-500">
                      Est: {flight["Estimated Departure"]?.split(" ")[1]}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {flight["Scheduled Arrival"]?.split(" ")[1]}<br />
                    <span className="text-sm text-gray-500">
                      Est: {flight["Estimated Arrival"]?.split(" ")[1]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-6 text-gray-500 text-center">No flights match your search.</p>
      )}
    </div>
  );
}
