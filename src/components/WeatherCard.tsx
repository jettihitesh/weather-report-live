import React from 'react';
import { Cloud, Droplets, Wind, Thermometer, Gauge } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weather: WeatherData;
}

const getAQILabel = (index: number) => {
  const labels = ['Good', 'Moderate', 'Unhealthy for sensitive', 'Unhealthy', 'Very Unhealthy', 'Hazardous'];
  return labels[index - 1] || 'Unknown';
};

const getAQIColor = (index: number) => {
  const colors = {
    1: 'bg-green-100 text-green-800',
    2: 'bg-yellow-100 text-yellow-800',
    3: 'bg-orange-100 text-orange-800',
    4: 'bg-red-100 text-red-800',
    5: 'bg-purple-100 text-purple-800',
    6: 'bg-gray-800 text-white'
  };
  return colors[index as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">{weather.location.name}</h2>
          <p className="text-gray-600">{weather.location.country}</p>
        </div>
        <img
          src={`https:${weather.current.condition.icon}`}
          alt={weather.current.condition.text}
          className="w-16 h-16"
        />
      </div>
      
      <div className="mb-6">
        <div className="text-4xl font-bold mb-2">
          {Math.round(weather.current.temp_c)}°C
        </div>
        <p className="text-gray-600 capitalize">{weather.current.condition.text}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <Thermometer className="w-5 h-5 mr-2 text-gray-600" />
          <div>
            <p className="text-sm text-gray-600">Feels like</p>
            <p className="font-semibold">{Math.round(weather.current.feelslike_c)}°C</p>
          </div>
        </div>
        <div className="flex items-center">
          <Droplets className="w-5 h-5 mr-2 text-gray-600" />
          <div>
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="font-semibold">{weather.current.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center">
          <Wind className="w-5 h-5 mr-2 text-gray-600" />
          <div>
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="font-semibold">{Math.round(weather.current.wind_kph)} km/h</p>
          </div>
        </div>
        <div className="flex items-center">
          <Cloud className="w-5 h-5 mr-2 text-gray-600" />
          <div>
            <p className="text-sm text-gray-600">Pressure</p>
            <p className="font-semibold">{weather.current.pressure_mb} mb</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center mb-3">
          <Gauge className="w-5 h-5 mr-2 text-gray-600" />
          <h3 className="font-semibold">Air Quality</h3>
        </div>
        <div className="space-y-3">
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getAQIColor(weather.current.air_quality['us-epa-index'])}`}>
            {getAQILabel(weather.current.air_quality['us-epa-index'])}
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-600">PM2.5</p>
              <p className="font-medium">{weather.current.air_quality.pm2_5.toFixed(1)} µg/m³</p>
            </div>
            <div>
              <p className="text-gray-600">PM10</p>
              <p className="font-medium">{weather.current.air_quality.pm10.toFixed(1)} µg/m³</p>
            </div>
            <div>
              <p className="text-gray-600">O₃</p>
              <p className="font-medium">{weather.current.air_quality.o3.toFixed(1)} µg/m³</p>
            </div>
            <div>
              <p className="text-gray-600">NO₂</p>
              <p className="font-medium">{weather.current.air_quality.no2.toFixed(1)} µg/m³</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;