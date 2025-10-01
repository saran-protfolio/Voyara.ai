import React from 'react';
import { ICONS } from '../../constants';
import Icon from './Icon';

const LoadingSpinner: React.FC = () => {
  const messages = [
    "Plotting the course to adventure...",
    "Consulting our globetrotting AI...",
    "Packing your virtual bags...",
    "Finding hidden gems...",
    "Negotiating with the weather gods...",
    "Aligning the stars for your perfect trip..."
  ];
  const [message, setMessage] = React.useState(messages[0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-brand-green-dark/80 backdrop-blur-sm flex flex-col justify-center items-center z-50 animate-fade-in">
      <div className="animate-spin text-brand-orange h-16 w-16">
        <Icon className="h-full w-full">{ICONS.logo}</Icon>
      </div>
      <p className="text-brand-cream text-lg mt-4 font-medium transition-all duration-300">{message}</p>
    </div>
  );
};

export default LoadingSpinner;