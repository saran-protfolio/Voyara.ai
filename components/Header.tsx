import React from 'react';
import { ICONS } from '../constants';
import Icon from './common/Icon';

interface HeaderProps {
    onHomeClick: () => void;
    onSavedTripsClick: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick, onSavedTripsClick, theme, onToggleTheme }) => {
  return (
    <header className="bg-brand-cream/80 dark:bg-brand-green-dark/80 backdrop-blur-md shadow-sm sticky top-0 z-40 transition-colors duration-300">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={onHomeClick} className="flex-shrink-0 flex items-center gap-3 text-brand-green-dark dark:text-brand-cream hover:opacity-80 transition-opacity">
              <Icon className="h-10 w-10 text-brand-green dark:text-brand-orange">{ICONS.logo}</Icon>
              <div className="flex flex-col items-start">
                  <span className="text-2xl font-bold leading-none">Voyara</span>
                  <span className="text-xs text-brand-green/80 dark:text-brand-cream/70 leading-none">AI Travel Planner</span>
              </div>
            </button>
          </div>
          <div className="flex items-center gap-4">
             <button
              onClick={onSavedTripsClick}
              className="font-semibold text-brand-green dark:text-brand-cream/90 hover:text-brand-green-dark dark:hover:text-brand-cream transition-colors"
            >
              My Trips
            </button>
            <button
                onClick={onToggleTheme}
                aria-label="Toggle theme"
                className="text-brand-green-dark dark:text-brand-orange hover:opacity-70 transition-opacity p-2 rounded-full"
            >
                <Icon className="w-6 h-6">{theme === 'light' ? ICONS.moon : ICONS.sun}</Icon>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;