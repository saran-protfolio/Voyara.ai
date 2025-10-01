import React, { useState, useEffect } from 'react';
import { DAILY_DESTINATIONS } from '../constants';
import { WeatherData } from '../types';
import { getWeatherForDestination } from '../services/weatherService';
import WeatherWidget from './WeatherWidget';

interface Destination {
  name: string;
  country: string;
  emoji: string;
}

interface DailyDestinationsProps {
  onDestinationClick: (destinationName: string) => void;
}

const DailyDestinations: React.FC<DailyDestinationsProps> = ({ onDestinationClick }) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [currentWeatherIndex, setCurrentWeatherIndex] = useState(0);

  useEffect(() => {
    const getDailyDestinations = () => {
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 0);
      const diff = now.getTime() - startOfYear.getTime();
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);

      const numToShow = 4;
      const totalDestinations = DAILY_DESTINATIONS.length;
      
      const startIndex = (dayOfYear * numToShow) % totalDestinations;
      
      const selected: Destination[] = [];
      for (let i = 0; i < numToShow; i++) {
        selected.push(DAILY_DESTINATIONS[(startIndex + i) % totalDestinations]);
      }
      setDestinations(selected);
    };

    getDailyDestinations();
  }, []);
  
  // Cycle through destinations for weather display
  useEffect(() => {
    if (destinations.length === 0) return;

    const timer = setInterval(() => {
      setCurrentWeatherIndex(prevIndex => (prevIndex + 1) % destinations.length);
    }, 8000); // Change weather spotlight every 8 seconds

    return () => clearInterval(timer);
  }, [destinations]);

  // Fetch weather when the spotlighted destination changes
  useEffect(() => {
    if (destinations.length === 0) return;

    const fetchWeather = async () => {
      setIsWeatherLoading(true);
      try {
        const data = await getWeatherForDestination(destinations[currentWeatherIndex].name);
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather for daily destination:", error);
        setWeatherData(null);
      } finally {
        setIsWeatherLoading(false);
      }
    };

    fetchWeather();
  }, [currentWeatherIndex, destinations]);


  if (destinations.length === 0) {
    return null;
  }
  
  const currentDestination = destinations[currentWeatherIndex];

  return (
    <div className="relative w-[90%] max-w-4xl mx-auto -mt-16 sm:-mt-20 z-10">
        <div className="bg-brand-green/20 dark:bg-brand-cream/10 backdrop-blur-lg rounded-xl shadow-2xl p-4 sm:p-6 border border-brand-cream/20 dark:border-brand-cream/10 transition-colors duration-300">
            <h3 className="text-center text-sm sm:text-base font-semibold text-brand-cream mb-4 tracking-wider uppercase">Daily Departures</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-brand-cream">
                {destinations.map((dest) => (
                    <div 
                      key={dest.name} 
                      onClick={() => onDestinationClick(dest.name)}
                      className="flex flex-col items-center text-center group cursor-pointer p-2 rounded-lg transition-all duration-300 hover:bg-brand-cream/10"
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-brand-cream/10 to-brand-cream/30 group-hover:from-brand-cream/20 group-hover:to-brand-cream/40 transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                        <span className="text-4xl sm:text-5xl transition-transform duration-300 group-hover:scale-110">
                          {dest.emoji}
                        </span>
                      </div>
                      <p className="mt-3 font-bold text-sm sm:text-base">{dest.name}</p>
                      <p className="text-xs sm:text-sm opacity-80">{dest.country}</p>
                    </div>
                ))}
            </div>
            
            <div className="mt-6">
              {isWeatherLoading ? (
                 <div className="text-center text-brand-cream/70 p-4 rounded-lg bg-black/10">Fetching live forecast...</div>
              ) : weatherData && currentDestination ? (
                <div>
                   <p className="text-center text-sm font-semibold text-brand-cream/90 mb-2">
                    Weather Spotlight: <span className="font-bold">{currentDestination.name}</span>
                  </p>
                  <WeatherWidget weather={weatherData} />
                </div>
              ) : (
                 <div className="text-center text-brand-orange/90 p-4 rounded-lg bg-black/10">Could not load weather spotlight.</div>
              )}
            </div>

        </div>
    </div>
  );
};

export default DailyDestinations;