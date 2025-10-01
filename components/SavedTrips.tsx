import React, { useState, useEffect } from 'react';
import { Itinerary } from '../types';

const SAVED_TRIPS_KEY = 'voyara-saved-trips';

interface SavedTripsProps {
  onViewTrip: (itinerary: Itinerary) => void;
  onPlanNewTrip: () => void;
}

const SavedTrips: React.FC<SavedTripsProps> = ({ onViewTrip, onPlanNewTrip }) => {
  const [savedTrips, setSavedTrips] = useState<Itinerary[]>([]);

  useEffect(() => {
    try {
      const storedTrips = localStorage.getItem(SAVED_TRIPS_KEY);
      if (storedTrips) {
        setSavedTrips(JSON.parse(storedTrips).reverse()); // Show most recent first
      }
    } catch (e) {
      console.error("Failed to load saved trips from localStorage", e);
    }
  }, []);

  const handleDeleteTrip = (tripIdToDelete: string) => {
    const updatedTrips = savedTrips.filter(trip => trip.id !== tripIdToDelete);
    setSavedTrips(updatedTrips);
    try {
      localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(updatedTrips.reverse())); // Store back in original order
    } catch (e) {
      console.error("Failed to update saved trips in localStorage", e);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-green-dark dark:text-brand-cream">My Saved Trips</h1>
        <p className="mt-4 text-lg text-brand-green dark:text-brand-cream/80 max-w-2xl mx-auto">
          Your collection of adventures waiting to happen. Revisit your plans or start a new journey.
        </p>
      </div>

      {savedTrips.length === 0 ? (
        <div className="text-center bg-white dark:bg-brand-green rounded-xl shadow-lg p-10 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-brand-green-dark dark:text-brand-cream">No Trips Saved Yet!</h2>
          <p className="mt-2 text-brand-green dark:text-brand-cream/80">Looks like your adventure book is empty. Let's change that!</p>
          <button
            onClick={onPlanNewTrip}
            className="mt-6 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105"
          >
            Plan a New Trip
          </button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {savedTrips.map(trip => (
            <div key={trip.id} className="bg-white dark:bg-brand-green rounded-xl shadow-lg p-6 flex flex-col justify-between transition-transform transform hover:-translate-y-2">
              <div>
                <h3 className="text-2xl font-bold text-brand-green-dark dark:text-brand-cream">{trip.destination}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 my-2 text-sm text-brand-green dark:text-brand-cream/80">
                  <span><strong>Duration:</strong> {trip.duration}</span>
                  <span><strong>Budget:</strong> {trip.budget}</span>
                </div>
                <p className="mt-3 text-brand-green/90 dark:text-brand-cream/90 text-sm italic">"{trip.summary}"</p>
              </div>
              <div className="mt-6 flex gap-2 justify-end">
                <button
                  onClick={() => handleDeleteTrip(trip.id!)}
                  className="bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => onViewTrip(trip)}
                  className="bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  View Itinerary
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedTrips;