import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import VehicleCard from './VehicleCard';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [sortByPrice, setSortByPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [rating, setRating] = useState('');

  // Initialize startDate and endDate from localStorage or use default values
  const [startDate, setStartDate] = useState(localStorage.getItem('startDate') || '');
  const [endDate, setEndDate] = useState(localStorage.getItem('endDate') || '');

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    try {
      console.log('Fetching vehicles with startDate:', startDate, 'endDate:', endDate);
      const response = await axios.get('http://localhost:8080/api/vehicles/available', {
        params: {
          companyName: companyName || undefined,
          sortBy: sortByPrice || undefined,
          capacity: capacity || undefined,
          rating: rating || undefined,
          startDate: startDate,
          endDate: endDate,
        }
      });
      setVehicles(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setError("Failed to fetch vehicles. Please try again later.");
    }
    setLoading(false);
  }, [companyName, sortByPrice, capacity, rating, startDate, endDate]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchVehicles();
    }
  }, [startDate, endDate, fetchVehicles]);

  // Save startDate and endDate to localStorage whenever they change
  useEffect(() => {
    if (startDate) {
      localStorage.setItem('startDate', startDate);
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      localStorage.setItem('endDate', endDate);
    }
  }, [endDate]);

  const handleClearFilters = () => {
    setCompanyName('');
    setSortByPrice('');
    setCapacity('');
    setRating('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Explore Our Vehicles</h1>
      <div className="flex gap-4 justify-end">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]} // Restrict to today onwards
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate || new Date().toISOString().split('T')[0]} // Restrict to today or selected start date
          className="p-2 border rounded"
        />
      </div>
      <div className="flex gap-12">
        <div className="w-full sm:w-1/3 md:w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Filters</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="p-2 border rounded"
            />
            <select
              value={sortByPrice}
              onChange={(e) => setSortByPrice(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Sort by Price</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
            <select
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Select Capacity</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="7">7</option>
            </select>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Select Rating</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars & above</option>
              <option value="3">3 Stars & above</option>
            </select>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleClearFilters}
              className="bg-red-500 text-white p-2 rounded"
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div className="w-full">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="loader"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center mb-4">{error}</p>
          ) : (
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))
              ) : (
                <p className="text-gray-500 text-center w-full">
                  No vehicles found with the selected filters.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleList;