import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, Loader2 } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import type { WeatherData } from './types/weather';

const API_KEY = 'cb6538f8a8fc4df1be492634250201';
const API_BASE_URL = 'https://api.weatherapi.com/v1/current.json';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(API_BASE_URL, {
        params: {
          key: API_KEY,
          q: `${lat},${lon}`,
          aqi: 'yes'
        }
      });
      setWeather(response.data);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Weather API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchLocation = async (query: string) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(API_BASE_URL, {
        params: {
          key: API_KEY,
          q: query,
          aqi: 'yes'
        }
      });
      setWeather(response.data);
    } catch (err) {
      setError('Location not found. Please try a different location.');
      console.error('Weather API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setError('Unable to retrieve your location');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      searchLocation(search);
    }
  };

  useEffect(() => {
    handleLocationClick();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Weather Report
        </h1>

        <div className="mb-8">
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a city..."
                className="w-full px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <button
              type="button"
              onClick={handleLocationClick}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              title="Get current location"
            >
              <MapPin className="w-6 h-6" />
            </button>
          </form>
        </div>

        <div className="flex justify-center">
          {loading ? (
            <div className="flex items-center gap-2 text-white">
              <Loader2 className="w-6 h-6 animate-spin" />
              Loading...
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          ) : weather ? (
            <WeatherCard weather={weather} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;