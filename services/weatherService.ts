import { WeatherData, ForecastDay } from '../types';

const possibleConditions = [
  { condition: 'Sunny', icon: 'sun' },
  { condition: 'Partly Cloudy', icon: 'cloud' },
  { condition: 'Showers', icon: 'cloudRain' },
  { condition: 'Thunderstorms', icon: 'cloudLightning' },
  { condition: 'Snow', icon: 'cloudSnow' },
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// This is a mock service. In a real application, you would fetch this data from a weather API.
export const getWeatherForDestination = (destination: string): Promise<WeatherData> => {
  console.log(`Fetching mock weather for ${destination}...`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate potential API failure
      if (destination.toLowerCase().includes('error')) {
        reject(new Error('Failed to fetch weather data.'));
        return;
      }

      const randomCondition = possibleConditions[Math.floor(Math.random() * possibleConditions.length)];
      const baseTemp = Math.floor(Math.random() * 20) + 10; // Base temp between 10°C and 30°C

      const forecast: ForecastDay[] = [];
      const today = new Date().getDay();

      for (let i = 0; i < 5; i++) {
        const dayCondition = possibleConditions[Math.floor(Math.random() * possibleConditions.length)];
        const tempFluctuation = Math.floor(Math.random() * 5) - 2; // -2 to +2 variation
        forecast.push({
          day: daysOfWeek[(today + i) % 7],
          high: baseTemp + tempFluctuation + 3,
          low: baseTemp + tempFluctuation - 4,
          icon: dayCondition.icon,
        });
      }

      const weatherData: WeatherData = {
        current: {
          temperature: baseTemp,
          condition: randomCondition.condition,
          icon: randomCondition.icon,
        },
        forecast: forecast,
      };

      resolve(weatherData);
    }, 1500); // Simulate network delay
  });
};
