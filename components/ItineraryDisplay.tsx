import React, { useState, useCallback, useEffect } from 'react';
import { Itinerary, Activity, Review, WeatherData } from '../types';
import { ICONS } from '../constants';
import Icon from './common/Icon';
import ReviewForm from './ReviewForm';
import StarRating from './common/StarRating';
import WeatherWidget from './WeatherWidget';
import { getWeatherForDestination } from '../services/weatherService';

const SAVED_TRIPS_KEY = 'voyara-saved-trips';

interface ItineraryDisplayProps {
  itinerary: Itinerary;
  reviews: Review[];
  onPostReview: (review: Omit<Review, 'id' | 'author'>) => void;
  onReset: () => void;
}

const ActivityTypeIcon: React.FC<{ type: Activity['type'] }> = ({ type }) => {
  const iconMap = {
    'Dining': ICONS.food,
    'Attraction': ICONS.attraction,
    'Activity': ICONS.activity,
    'Travel': ICONS.travel,
    'Accommodation': ICONS.accommodation,
  };
  return <Icon className="w-6 h-6 text-brand-green dark:text-brand-orange">{iconMap[type] || ICONS.mapPin}</Icon>;
};

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary, reviews, onPostReview, onReset }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [openReviewFormId, setOpenReviewFormId] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);

  useEffect(() => {
    // Check if this itinerary is already saved
    try {
      const savedTrips: Itinerary[] = JSON.parse(localStorage.getItem(SAVED_TRIPS_KEY) || '[]');
      const alreadyExists = itinerary.id ? savedTrips.some(trip => trip.id === itinerary.id) : false;
      setIsSaved(alreadyExists);
    } catch (e) {
      console.error("Failed to check saved trips", e);
    }
  }, [itinerary.id]);


  useEffect(() => {
    const fetchWeather = async () => {
      if (!itinerary.destination) return;
      setIsWeatherLoading(true);
      try {
        const data = await getWeatherForDestination(itinerary.destination);
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        setWeatherData(null); // Clear previous data on error
      } finally {
        setIsWeatherLoading(false);
      }
    };

    fetchWeather();
  }, [itinerary.destination]);

  const handlePostReviewAndClose = (review: Omit<Review, 'id' | 'author'>) => {
    onPostReview(review);
    setOpenReviewFormId(null);
  };
  
  const handleSaveTrip = () => {
    if (isSaved) return;
    try {
      const savedTrips: Itinerary[] = JSON.parse(localStorage.getItem(SAVED_TRIPS_KEY) || '[]');
      const tripToSave = { ...itinerary, id: itinerary.id || Date.now().toString() };
      
      // Avoid duplicates if somehow a trip without an ID is saved multiple times
      const filteredTrips = savedTrips.filter(t => t.id !== tripToSave.id);

      localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify([...filteredTrips, tripToSave]));
      setIsSaved(true);
    } catch (e) {
        alert("Sorry, we couldn't save your trip. Please try again.");
        console.error("Failed to save trip to localStorage", e);
    }
  };

  const handleShare = useCallback(async () => {
    if (isSharing) return;

    const itineraryString = JSON.stringify(itinerary);
    const encodedItinerary = btoa(itineraryString);
    const shareUrl = `${window.location.origin}${window.location.pathname}?itinerary=${encodedItinerary}`;

    if (navigator.share) {
      try {
        setIsSharing(true);
        await navigator.share({
          title: `My Voyara Trip to ${itinerary.destination}`,
          text: `Check out this amazing trip to ${itinerary.destination} planned by Voyara!`,
          url: shareUrl,
        });
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          // User cancelled share, do nothing.
        } else {
          console.error('Share failed, falling back to clipboard.', error);
          try {
            await navigator.clipboard.writeText(shareUrl);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
          } catch (copyError) {
            console.error('Failed to copy fallback:', copyError);
            alert('Failed to share or copy link.');
          }
        }
      } finally {
        setIsSharing(false);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
        alert('Failed to copy link.');
      }
    }
  }, [itinerary, isSharing]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="bg-white dark:bg-brand-green rounded-xl shadow-2xl p-6 md:p-10 transition-colors duration-300">
        <div className="border-b border-brand-green/20 dark:border-brand-cream/20 pb-6 mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-green-dark dark:text-brand-cream">{itinerary.destination}</h1>
          
          <div className="mt-4">
            {isWeatherLoading ? (
              <div className="bg-brand-green/10 dark:bg-brand-cream/10 rounded-lg p-3 text-center text-brand-green-dark dark:text-brand-cream/80">Loading weather forecast...</div>
            ) : weatherData ? (
              <WeatherWidget weather={weatherData} />
            ) : (
               <div className="bg-red-500/10 rounded-lg p-3 text-center text-red-700 dark:text-red-300">Could not load weather forecast.</div>
            )}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-brand-green dark:text-brand-cream/80">
            <span><strong>Duration:</strong> {itinerary.duration}</span>
            <span><strong>Budget:</strong> {itinerary.budget}</span>
          </div>
          <p className="mt-4 text-lg text-brand-green-dark dark:text-brand-cream font-semibold bg-brand-green/10 dark:bg-brand-cream/10 p-3 rounded-lg">
            "{itinerary.summary}" <span className="text-sm font-normal text-brand-green-dark/80 dark:text-brand-cream/70">- AI Summary</span>
          </p>
        </div>
        <div className="space-y-10">
          {itinerary.days.map((day) => (
            <div key={day.day} className="grid md:grid-cols-[1fr_3fr] gap-8">
              <div className="md:border-r md:border-brand-green/20 dark:md:border-brand-cream/20 md:pr-8">
                <h2 className="text-2xl font-bold text-brand-green dark:text-brand-orange">{day.day}</h2>
                <p className="text-brand-green/80 dark:text-brand-cream/70 mt-1">{day.theme}</p>
              </div>
              <div className="space-y-6">
                {day.activities.map((activity, index) => {
                  const activityReviews = reviews.filter(r => r.itemId === activity.description);
                  const isReviewFormOpen = openReviewFormId === activity.description;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="font-bold text-brand-green-dark dark:text-brand-cream">{activity.time}</div>
                        <div className="w-px flex-grow bg-gray-200 dark:bg-gray-600 my-2"></div>
                      </div>
                      <div className="flex-1 pb-6 border-b border-dashed border-brand-green/20 dark:border-brand-cream/20 last:border-none last:pb-0">
                        <div className="flex items-center gap-3">
                          <ActivityTypeIcon type={activity.type} />
                          <h3 className="font-semibold text-lg text-brand-green-dark dark:text-brand-cream">{activity.description}</h3>
                        </div>
                        <div className="mt-3 ml-9 p-3 bg-brand-orange/10 border border-brand-orange/20 rounded-lg flex gap-3">
                          <Icon className="w-5 h-5 text-brand-orange-dark flex-shrink-0 mt-0.5">{ICONS.lightbulb}</Icon>
                          <p className="text-sm text-brand-orange-dark"><strong className="font-semibold">AI Tip:</strong> {activity.ai_tip}</p>
                        </div>
                        {activityReviews.length > 0 && (
                          <div className="mt-4 ml-9 space-y-3">
                            {activityReviews.map(review => (
                              <div key={review.id} className="p-3 bg-brand-green/5 dark:bg-brand-cream/5 rounded-lg">
                                <StarRating rating={review.rating} readOnly />
                                <p className="text-sm text-brand-green dark:text-brand-cream/90 mt-1 italic">"{review.comment}"</p>
                                <p className="text-xs text-right text-brand-green/80 dark:text-brand-cream/60 mt-1">- {review.author}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="mt-4 ml-9">
                          {isReviewFormOpen ? (
                            <ReviewForm 
                              itemId={activity.description}
                              onPostReview={handlePostReviewAndClose}
                              onCancel={() => setOpenReviewFormId(null)}
                            />
                          ) : (
                            <button
                              onClick={() => setOpenReviewFormId(activity.description)}
                              className="text-sm font-semibold text-brand-green dark:text-brand-orange hover:text-brand-green-dark dark:hover:opacity-80 transition"
                            >
                              Leave a Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={onReset}
            className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 w-full sm:w-auto"
          >
            Create a New Trip
          </button>
          <button
            onClick={handleSaveTrip}
            disabled={isSaved}
            className="bg-brand-green/20 dark:bg-brand-cream/20 hover:bg-brand-green/30 dark:hover:bg-brand-cream/30 text-brand-green-dark dark:text-brand-cream font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaved ? 'Trip Saved!' : 'Save Trip'}
          </button>
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="bg-brand-green/20 dark:bg-brand-cream/20 hover:bg-brand-green/30 dark:hover:bg-brand-cream/30 text-brand-green-dark dark:text-brand-cream font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon className="w-5 h-5">{ICONS.share}</Icon>
            {isSharing ? 'Sharing...' : isCopied ? 'Link Copied!' : 'Share Itinerary'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDisplay;