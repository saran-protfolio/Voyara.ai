import React from 'react';
import { WeatherData } from '../types';
import { ICONS } from '../constants';
import Icon from './common/Icon';

interface WeatherWidgetProps {
  weather: WeatherData;
}

const WeatherIcon: React.FC<{ iconKey: string, className?: string }> = ({ iconKey, className }) => {
    const iconMap: { [key: string]: React.ReactNode } = {
        sun: ICONS.sun,
        cloud: ICONS.cloud,
        cloudRain: ICONS.cloudRain,
        cloudSnow: ICONS.cloudSnow,
        cloudLightning: ICONS.cloudLightning,
    };
    
    return <Icon className={className}>{iconMap[iconKey] || ICONS.sun}</Icon>;
};

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather }) => {
  return (
    <div className="bg-brand-green/5 dark:bg-brand-cream/5 border border-brand-green/10 dark:border-brand-cream/10 rounded-lg p-4 animate-fade-in transition-colors duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Current Weather */}
        <div className="flex items-center gap-4">
          <WeatherIcon iconKey={weather.current.icon} className="w-12 h-12 text-brand-orange" />
          <div>
            <p className="text-3xl font-bold text-brand-green-dark dark:text-brand-cream">{weather.current.temperature}°C</p>
            <p className="text-brand-green dark:text-brand-cream/80">{weather.current.condition}</p>
          </div>
        </div>

        {/* Forecast */}
        <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-4 overflow-x-auto w-full sm:w-auto">
          {weather.forecast.map((day, index) => (
            <div key={index} className="flex flex-col items-center flex-shrink-0 text-center bg-brand-green/10 dark:bg-brand-cream/10 p-2 rounded-md w-16">
              <p className="font-bold text-sm text-brand-green-dark dark:text-brand-cream">{day.day}</p>
              <WeatherIcon iconKey={day.icon} className="w-8 h-8 my-1 text-brand-green dark:text-brand-cream/80" />
              <p className="text-sm text-brand-green-dark dark:text-brand-cream">
                <span className="font-semibold">{day.high}°</span>
                <span className="opacity-70">/{day.low}°</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;