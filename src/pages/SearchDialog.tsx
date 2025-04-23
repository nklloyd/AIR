import { useState } from "react";
import Select from "react-select";

interface SearchFilters {
  flightNumber?: string;
  airline?: string;
  departureCode?: string;
  arrivalCode?: string;
  flightStatus?: string;
  departureWeather?: string;
  arrivalWeather?: string;
}

interface Props {
  onSearch: (filters: SearchFilters) => void;
}

const AIRLINE_OPTIONS = [
  { value: "Delta Airlines", label: "Delta Airlines" },
  { value: "JetBlue Airways", label: "JetBlue Airways" },
  { value: "United Airlines", label: "United Airlines" },
  { value: "American Airlines", label: "American Airlines" },
  { value: "Southwest Airlines", label: "Southwest Airlines" },
];
const FILTER_LABELS: Record<string, string> = {
    flightNumber: "Flight Number",
    airline: "Airline",
    departureCode: "Departure Code",
    arrivalCode: "Arrival Code",
    scheduledDeparture: "Departure Date",
    arrivalDate: "Arrival Date",
    flightStatus: "Flight Status",
    departureWeather: "Departure Weather",
    arrivalWeather: "Arrival Weather",
  };
  

const WEATHER_OPTIONS = ["Clear", "Sunny", "Foggy", "Cloudy", "Rainy", "Stormy"].map(w => ({
  value: w,
  label: w,
}));

const STATUS_OPTIONS = ["On Time", "Delayed", "Cancelled"].map(s => ({ value: s, label: s }));

const AIRPORT_CODES = ["LAX", "JFK", "DEN", "MIA", "GNV", "ATL", "ORD", "SFO", "LAS", "MCO", "SEA", "DFW"].map(code => ({
  value: code,
  label: code,
}));

export default function SearchDialog({ onSearch }: Props) {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: keyof SearchFilters, option: any) => {
    setFilters({ ...filters, [name]: option?.value || "" });
  };

  const handleRemoveFilter = (key: keyof SearchFilters) => {
    const updated = { ...filters };
    delete updated[key];
    setFilters(updated);
  };

  const handleSubmit = () => {
    onSearch(filters);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-center my-4">
        <button
          onClick={() => setIsOpen(true)}
          className="text-white bg-blue-600 px-20 py-35 rounded-xl shadow hover:bg-blue-700 transition"
        >
          🔍 Find Flights
        </button>

        {/* Active Filters */}
        {Object.keys(filters).length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {Object.entries(filters).map(([key, value]) => (
            <span key={key} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {FILTER_LABELS[key] || key}: {value}
                <button
                  onClick={() => handleRemoveFilter(key as keyof SearchFilters)}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/50">
          <div className=" w-full max-w-6xl bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-10 text-center text-blue-700">Search Flights</h2>

            {/* Horizontal Flex Layout */}
            <div className="flex flex-row gap-6">

              {/* General Info */}
              <div className="bg-gray-50 p-4 rounded-xl flex-1 mb-1">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">General Info</h3>
                <div className="space-y-4">
                  <input
                    name="flightNumber"
                    placeholder="Flight Number"
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-400"
                  />
                  <div></div>
                  <Select
                    name="airline"
                    options={AIRLINE_OPTIONS}
                    placeholder="Airline"
                    onChange={opt => handleSelectChange("airline", opt)}
                  />
                  <Select
                    name="flightStatus"
                    options={STATUS_OPTIONS}
                    placeholder="Flight Status"
                    onChange={opt => handleSelectChange("flightStatus", opt)}
                  />
                </div>
              </div>

              {/* Departure Info */}
              <div className="bg-gray-50 p-4 rounded-xl flex-1">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Departure Info</h3>
                <div className="space-y-4">
                  <Select
                    name="departureCode"
                    options={AIRPORT_CODES}
                    placeholder="Departure Code"
                    onChange={opt => handleSelectChange("departureCode", opt)}
                  />
                  <input
                    name="scheduledDeparture"
                    type="date"
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-400"
                  />
                  <div></div>
                  <Select
                    name="departureWeather"
                    options={WEATHER_OPTIONS}
                    placeholder="Departure Weather"
                    onChange={opt => handleSelectChange("departureWeather", opt)}
                  />
                </div>
              </div>

              {/* Arrival Info */}
              <div className="bg-gray-50 p-4 rounded-xl flex-1">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Arrival Info</h3>
                <div className="space-y-4">
                  <Select
                    name="arrivalCode"
                    options={AIRPORT_CODES}
                    placeholder="Arrival Code"
                    onChange={opt => handleSelectChange("arrivalCode", opt)}
                  />
                  <input
                    name="arrivalDate"
                    type="date"
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-400"
                  />
                  <div></div>
                  <Select
                    name="arrivalWeather"
                    options={WEATHER_OPTIONS}
                    placeholder="Arrival Weather"
                    onChange={opt => handleSelectChange("arrivalWeather", opt)}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex justify-end gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2  transition overflow-hidden"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2  transition overflow-hidden"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
