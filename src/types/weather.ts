export interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    pressure_mb: number;
    wind_kph: number;
    condition: {
      text: string;
      icon: string;
    };
    air_quality: {
      'us-epa-index': number;
      pm2_5: number;
      pm10: number;
      co: number;
      no2: number;
      o3: number;
      so2: number;
    };
  };
}