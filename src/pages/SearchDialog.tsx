import { useState } from "react";

interface SearchFilters {
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

export default function SearchDialog({ onSearch }: Props) {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSearch(filters);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex justify-center my-4">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          🔍 Open Flight Search
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl border-4 border-blue-500 p-8 w-full max-w-3xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Search Flights</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="airline"
                placeholder="Airline"
                onChange={handleChange}
                className="border p-3 rounded-xl w-full"
              />
              <input
                name="departureCode"
                placeholder="Departure Code"
                onChange={handleChange}
                className="border p-3 rounded-xl w-full"
              />
              <input
                name="arrivalCode"
                placeholder="Arrival Code"
                onChange={handleChange}
                className="border p-3 rounded-xl w-full"
              />
              <select
                name="flightStatus"
                onChange={handleChange}
                className="border p-3 rounded-xl w-full bg-white"
              >
                <option value="">Any Status</option>
                <option value="On Time">On Time</option>
                <option value="Delayed">Delayed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <input
                name="departureWeather"
                placeholder="Departure Weather"
                onChange={handleChange}
                className="border p-3 rounded-xl w-full"
              />
              <input
                name="arrivalWeather"
                placeholder="Arrival Weather"
                onChange={handleChange}
                className="border p-3 rounded-xl w-full"
              />
            </div>

            <div className="mt-6 flex justify-end gap-4">
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
