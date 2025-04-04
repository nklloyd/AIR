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

const WEATHER_OPTIONS = [
  "Clear", "Sunny", "Foggy", "Cloudy", "Rainy", "Stormy"
].map(w => ({ value: w, label: w }));

const STATUS_OPTIONS = [
  "On Time", "Delayed", "Cancelled"
].map(s => ({ value: s, label: s }));

const AIRPORT_CODES = [
  "LAX", "JFK", "DEN", "MIA", "GNV", "ATL", "ORD", "SFO", "LAS", "MCO", "SEA", "DFW"
].map(code => ({ value: code, label: code }));

export default function SearchDialog({ onSearch }: Props) {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
          className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          🔍 Open Flight Search
        </button>

        {/* Active Filters */}
        {Object.keys(filters).length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {Object.entries(filters).map(([key, value]) => (
              <span
                key={key}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {key}: {value}
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
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl border-4 border-blue-500 p-8 w-full max-w-4xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Search Flights</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* General Info */}
  <div>
    <h3 className="text-xl font-semibold mb-4 text-gray-700">General Info</h3>
    <div className="space-y-4">
      <input
        name="flightNumber"
        placeholder="Flight Number"
        onChange={handleChange}
        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-400"
      />
      <Select
        name="airline"
        options={AIRLINE_OPTIONS}
        placeholder="Airline"
        onChange={(opt) => handleSelectChange("airline", opt)}
      />
      <Select
        name="flightStatus"
        options={STATUS_OPTIONS}
        placeholder="Flight Status"
        onChange={(opt) => handleSelectChange("flightStatus", opt)}
      />
    </div>
  </div>

  {/* Departure Info */}
  <div>
    <h3 className="text-xl font-semibold mb-4 text-gray-700">Departure Info</h3>
    <div className="space-y-4">
      <Select
        name="departureCode"
        options={AIRPORT_CODES}
        placeholder="Departure Code"
        onChange={(opt) => handleSelectChange("departureCode", opt)}
      />
      <input
        name="scheduledDeparture"
        type="datetime-local"
        onChange={handleChange}
        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-400"
      />
      <Select
        name="departureWeather"
        options={WEATHER_OPTIONS}
        placeholder="Departure Weather"
        onChange={(opt) => handleSelectChange("departureWeather", opt)}
      />
    </div>
  </div>

  {/* Arrival Info */}
  <div>
    <h3 className="text-xl font-semibold mb-4 text-gray-700">Arrival Info</h3>
    <div className="space-y-4">
      <Select
        name="arrivalCode"
        options={AIRPORT_CODES}
        placeholder="Arrival Code"
        onChange={(opt) => handleSelectChange("arrivalCode", opt)}
      />
      <input
        name="arrivalDate"
        type="datetime-local"
        onChange={handleChange}
        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-400"
      />
      <Select
        name="arrivalWeather"
        options={WEATHER_OPTIONS}
        placeholder="Arrival Weather"
        onChange={(opt) => handleSelectChange("arrivalWeather", opt)}
      />
    </div>
  </div>
</div>


            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
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
