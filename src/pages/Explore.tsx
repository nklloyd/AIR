import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"
import SearchDialog from './SearchDialog';

export default function Explore() {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [flights, setFlights] = useState<any[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<any[]>([]);

  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [dropdown, setDropdown] = useState<{
    visible: boolean;
    x: number;
    y: number;
    flightNumber: string | null;
  }>({ visible: false, x: 0, y: 0, flightNumber: null });

  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});

  
  const handleSearch = (filters: any) => {
    const filtered = flights.filter((flight) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
  
        const fieldValue = flight[key]; // directly use camelCase key
        if (!fieldValue) return false;
  
        return String(fieldValue).toLowerCase().includes(String(value).toLowerCase());
      });
    });
  
    setFilteredFlights(filtered);
  };
  
  // Load favorites + selection from localStorage
  useEffect(() => {
    fetch('/mock_data/mock_flight_data.csv')
      .then(res => res.text())
      .then(csv => {
        const lines = csv.split('\n');
        const headers = lines[0].split(',');
  
        const parsed = lines.slice(1).map(line => {
          const values = line.split(',');
          const flight: any = {};
          headers.forEach((header, idx) => {
            flight[header] = values[idx];
          });
          return flight;
        }).filter(f => f["Flight Number"]);
  
        // Normalize keys so the rest of your code works
        const normalized = parsed.map(f => ({
          flightNumber: f["Flight Number"],
          airline: f["Airline"],
          departureCode: f["Departure Code"],
          arrivalCode: f["Arrival Code"],
          scheduledDeparture: f["Scheduled Departure"],
          scheduledArrival: f["Scheduled Arrival"],
          flightStatus: f["Flight Status"],
        }));
  
        setFlights(normalized);
      })
      .catch(err => {
        console.error("Failed to load flights:", err);
      });
  }, []);
  
  
  

  // Save favorites + selection to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (selectedFlight) {
      localStorage.setItem("selectedFlight", selectedFlight);
    } else {
      localStorage.removeItem("selectedFlight");
    }
  }, [selectedFlight]);

  const toggleFavorite = (flightNumber: string) => {
    const isFav = favorites.includes(flightNumber);
    const updated = isFav
      ? favorites.filter(f => f !== flightNumber)
      : [...favorites, flightNumber];

    setFavorites(updated);

    toast[isFav ? "error" : "success"](
      isFav
        ? `❌ Removed flight ${flightNumber} from favorites.`
        : `⭐ Added flight ${flightNumber} to favorites!`,
      { duration: 5000 }
    );
  };

  return (
    
    <div
      className="p-4 space-y-4 relative"
      onClick={() => {
        setDropdown({ visible: false, x: 0, y: 0, flightNumber: null });
        setSelectedFlight(null);
      }}
    >
      

  <div className="flex justify-center flex-wrap mb-4">
        <div className="flex items-center gap-4">
          <div>
            <img src="/Air Logo.png" alt="Air Logo" className="h-10" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-1000">Explore Flights</h1>
            <SearchDialog onSearch={handleSearch} />            
          </div>
        </div>
      </div>


      {/* Dropdown menu */}
      {dropdown.visible && dropdown.flightNumber && (
        <div
          className="absolute bg-white shadow-lg rounded border border-gray-200 z-50 w-48"
          style={{ top: dropdown.y -150, left: dropdown.x +150}}
          onClick={(e) => e.stopPropagation()}
        >
          <button
          onClick={() => {
            setDropdown({ ...dropdown, visible: false });
            navigate(`/map/${dropdown.flightNumber}`); 
          }}
          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
          ✈️ See Flight
          </button>

          <button
            onClick={() => {
              toggleFavorite(dropdown.flightNumber!);
              setDropdown({ ...dropdown, visible: false });
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            {favorites.includes(dropdown.flightNumber)
              ? "❌ Remove from Favorites"
              : "⭐ Add to Favorites"}
          </button>
        </div>
      )}

      {/* Flight Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 shadow rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Flight #</th>
              <th className="p-3">Airline</th>
              <th className="p-3">From → To</th>
              <th className="p-3">Scheduled Departure</th>
              <th className="p-3">Scheduled Arrival</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
          {(filteredFlights.length > 0 ? filteredFlights : flights).map((flight) => {
              const flightNumber = String(flight.flightNumber);
              const isFavorited = favorites.includes(flightNumber);
              const isSelected = selectedFlight === flightNumber;

              return (
                <tr
                  key={flightNumber}
                  ref={(el) => (rowRefs.current[flightNumber] = el)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFlight(flightNumber);

                    const rowElement = rowRefs.current[flightNumber];
                    if (rowElement) {
                      const rect = rowElement.getBoundingClientRect();
                      const scrollTop = window.scrollY || document.documentElement.scrollTop;
                      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

                      setDropdown({
                        visible: true,
                        x: rect.left + scrollLeft,
                        y: rect.bottom + scrollTop,
                        flightNumber,
                      });
                    }
                  }}
                  className={`cursor-pointer transition ${
                    isSelected
                      ? "bg-blue-100"
                      : favorites.includes(flightNumber)
                      ? "bg-yellow-50"
                      : "hover:bg-blue-50"
                  }`}
                  
                >
                  <td className="p-3 font-medium text-gray-800">
                    {flightNumber}
                    {isFavorited && (
                      <span className="ml-2 text-yellow-500" title="Favorited">   ⭐ </span>
                    )}
                  </td>
                  <td className="p-3">{flight.airline}</td>
                  <td className="p-3">{flight.departureCode} → {flight.arrivalCode}</td>
                  <td className="p-3">{new Date(flight.scheduledDeparture).toLocaleString()}</td>
                  <td className="p-3">{new Date(flight.scheduledArrival).toLocaleString()}</td>
                  <td className="p-3">{flight.flightStatus}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
