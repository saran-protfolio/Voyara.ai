import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ReviewsShowcase from './components/ReviewsShowcase';
import ItineraryDisplay from './components/ItineraryDisplay';
import Footer from './components/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import { Itinerary, ImageFile, Review } from './types';
import { generateItinerary } from './services/geminiService';
import { MOCK_REVIEWS } from './constants';
import DailyDestinations from './components/DailyDestinations';
import SavedTrips from './components/SavedTrips';

type View = 'home' | 'itinerary' | 'savedTrips';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('voyara-theme') as Theme) || 'light';
  });

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('voyara-theme', theme);
  }, [theme]);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedItineraryData = params.get('itinerary');

    if (sharedItineraryData) {
      try {
        const decodedItinerary = atob(sharedItineraryData);
        const parsedItinerary: Itinerary = JSON.parse(decodedItinerary);
        if (parsedItinerary && parsedItinerary.destination && parsedItinerary.days) {
          setItinerary(parsedItinerary);
          setView('itinerary');
          window.history.replaceState({}, '', window.location.pathname);
        }
      } catch (e) {
        console.error("Failed to parse shared itinerary from URL", e);
        setError("The shared itinerary link is invalid or corrupted.");
      }
    }
  }, []);

  const handleGenerate = useCallback(async (promptToGenerate: string, image: ImageFile | null) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedItinerary = await generateItinerary(promptToGenerate, image);
      setItinerary(generatedItinerary);
      setView('itinerary');
      window.scrollTo(0, 0);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error: ${err.message}. Please try again.`);
      } else {
        setError('An unknown error occurred.');
      }
      setView('home');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handlePostReview = (newReviewData: Omit<Review, 'id' | 'author'>) => {
    const newReview: Review = {
      ...newReviewData,
      id: new Date().toISOString(), // Simple unique ID
      author: 'Voyara Traveler' // Placeholder author
    };
    setReviews(prevReviews => [newReview, ...prevReviews]);
  };

  const resetToHome = () => {
    setView('home');
    setItinerary(null);
    setError(null);
    setPrompt('');
    if (window.location.search) {
      window.history.replaceState({}, '', window.location.pathname);
    }
    window.scrollTo(0, 0);
  }

  const handleDestinationClick = (destinationName: string) => {
    setPrompt(`A trip to ${destinationName}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleViewSavedTrip = (savedItinerary: Itinerary) => {
    setItinerary(savedItinerary);
    setView('itinerary');
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (view) {
      case 'itinerary':
        return itinerary && (
          <ItineraryDisplay 
            itinerary={itinerary} 
            reviews={reviews}
            onPostReview={handlePostReview}
            onReset={resetToHome} 
          />
        );
      case 'savedTrips':
        return <SavedTrips onViewTrip={handleViewSavedTrip} onPlanNewTrip={resetToHome} />;
      case 'home':
      default:
        return (
            <>
                <Hero 
                    onGenerate={handleGenerate}
                    prompt={prompt}
                    onPromptChange={setPrompt}
                />
                <DailyDestinations onDestinationClick={handleDestinationClick} />
                {error && (
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                        <div className="bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 dark:border-red-500/40 text-red-800 dark:text-red-300 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Oops! </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    </div>
                )}
                <Features />
                <ReviewsShowcase reviews={reviews} />
            </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream dark:bg-brand-green-dark font-sans transition-colors duration-300">
      {isLoading && <LoadingSpinner />}
      <Header onHomeClick={resetToHome} onSavedTripsClick={() => setView('savedTrips')} theme={theme} onToggleTheme={toggleTheme} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;