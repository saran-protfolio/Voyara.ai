import React, { useState, useRef, useEffect } from 'react';
import { ICONS, SEARCH_SUGGESTION_DESTINATIONS } from '../constants';
import Icon from './common/Icon';
import { ImageFile } from '../types';

interface HeroProps {
  onGenerate: (prompt: string, image: ImageFile | null) => void;
  prompt: string;
  onPromptChange: (newPrompt: string) => void;
}

const MAX_SUGGESTIONS = 7;
const PAST_SEARCHES_KEY = 'voyara-past-searches';
type Suggestion = string | typeof SEARCH_SUGGESTION_DESTINATIONS[0];

const Hero: React.FC<HeroProps> = ({ onGenerate, prompt, onPromptChange }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const getPastSearches = (): string[] => {
    try {
      const searches = localStorage.getItem(PAST_SEARCHES_KEY);
      return searches ? JSON.parse(searches) : [];
    } catch (e) {
      console.error("Failed to parse past searches from localStorage", e);
      return [];
    }
  };

  const saveSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    try {
      let pastSearches = getPastSearches();
      pastSearches = pastSearches.filter(s => s.toLowerCase() !== searchTerm.toLowerCase());
      pastSearches.unshift(searchTerm);
      pastSearches = pastSearches.slice(0, 5); // Keep only the last 5
      localStorage.setItem(PAST_SEARCHES_KEY, JSON.stringify(pastSearches));
    } catch (e) {
      console.error("Failed to save search term to localStorage", e);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onPromptChange(value);

    if (value.trim().length > 1) {
      const lowerCaseValue = value.toLowerCase();
      const pastSearches = getPastSearches().filter(search =>
        search.toLowerCase().includes(lowerCaseValue)
      );
      
      const filteredPopular = SEARCH_SUGGESTION_DESTINATIONS.filter(dest =>
        dest.name.toLowerCase().includes(lowerCaseValue)
      );
      
      const pastSearchNames = new Set(pastSearches.map(s => s.toLowerCase()));
      const uniqueFilteredPopular = filteredPopular.filter(dest => !pastSearchNames.has(dest.name.toLowerCase()));

      const combined = [...pastSearches, ...uniqueFilteredPopular];
      setSuggestions(combined.slice(0, MAX_SUGGESTIONS));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleInputFocus = () => {
    if (prompt.trim() === '') {
      const pastSearches = getPastSearches();
      if (pastSearches.length > 0) {
        setSuggestions(pastSearches);
        setShowSuggestions(true);
      }
    } else if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    const suggestionText = typeof suggestion === 'string' ? suggestion : suggestion.name;
    onPromptChange(suggestionText);
    setShowSuggestions(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setFileName(file.name);
    }
  };
  
  const clearImage = () => {
    setImageFile(null);
    setFileName(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleGenerateClick = () => {
    if (!prompt && !imageFile) {
      alert('Please enter a trip description or upload an inspiration photo.');
      return;
    }

    saveSearch(prompt);
    setShowSuggestions(false);
    
    if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1];
            onGenerate(prompt, { base64: base64String, mimeType: imageFile.type });
        };
        reader.readAsDataURL(imageFile);
    } else {
        onGenerate(prompt, null);
    }
  };

  return (
    <div className="relative bg-brand-green-dark text-brand-cream text-center pt-20 sm:pt-32 pb-24 sm:pb-32 animate-fade-in">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop)' }}
      ></div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
          <span className="text-brand-orange">Where AI</span> Meets Your Adventure
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-brand-cream/80">
          Describe your dream trip or show us your inspiration. Voyara crafts the perfect itinerary.
        </p>

        <div className="mt-10 max-w-3xl mx-auto relative" ref={searchContainerRef}>
          <div className="bg-brand-cream dark:bg-brand-green/50 rounded-lg shadow-2xl p-1 sm:p-2 flex flex-row items-center gap-1 sm:gap-2 transition-colors duration-300">
            <input
              type="text"
              value={prompt}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="A relaxing beach vacation..."
              className="flex-1 min-w-0 px-2 sm:px-4 py-2 sm:py-3 text-brand-green-dark dark:text-brand-cream placeholder-brand-green/70 dark:placeholder-brand-cream/60 bg-transparent border-none focus:outline-none focus:ring-0 truncate"
              autoComplete="off"
            />
             <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload inspiration photo"
              className="flex-shrink-0 bg-brand-green/10 dark:bg-brand-cream/10 hover:bg-brand-green/20 dark:hover:bg-brand-cream/20 text-brand-green-dark dark:text-brand-cream p-2 sm:p-3 rounded-md flex items-center justify-center transition-colors"
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6">{ICONS.camera}</Icon>
            </button>
            <button
              onClick={handleGenerateClick}
              aria-label="Generate Trip"
              className="flex-shrink-0 bg-brand-orange hover:bg-brand-orange-dark text-white p-2 sm:p-3 rounded-md flex items-center justify-center transition-transform transform hover:scale-105"
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6">{ICONS.logo}</Icon>
            </button>
          </div>

          {fileName && (
            <div className="mt-3 inline-flex items-center bg-brand-cream/20 text-brand-cream text-sm font-medium px-3 py-1 rounded-full animate-fade-in transition-all">
              <span>{fileName}</span>
              <button 
                onClick={clearImage}
                className="ml-2 text-brand-cream/70 hover:text-white"
                aria-label="Remove image"
              >
                <Icon className="h-4 w-4">{ICONS.close}</Icon>
              </button>
            </div>
          )}

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-brand-cream dark:bg-brand-green-dark border border-brand-green/20 dark:border-brand-cream/20 rounded-lg shadow-lg z-10 overflow-hidden text-left animate-fade-in">
              <ul>
                {suggestions.map((suggestion, index) => {
                  const suggestionText = typeof suggestion === 'string' ? suggestion : suggestion.name;
                  const isRecent = typeof suggestion === 'string' && getPastSearches().includes(suggestion);
                  return (
                    <li
                      key={`${suggestionText}-${index}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="cursor-pointer hover:bg-brand-green/10 dark:hover:bg-brand-cream/10 text-brand-green-dark dark:text-brand-cream flex items-center p-4 transition-colors duration-150 border-t border-brand-green/10 dark:border-brand-cream/10 first:border-t-0"
                    >
                      {typeof suggestion === 'object' ? (
                        <>
                          <img src={suggestion.imageUrl} alt={suggestion.name} className="w-20 h-14 object-cover rounded-lg mr-4 flex-shrink-0"/>
                          <div className="overflow-hidden">
                            <p className="font-semibold truncate">{suggestion.name}</p>
                            <p className="text-sm text-brand-green/80 dark:text-brand-cream/70 truncate">{suggestion.description}</p>
                          </div>
                        </>
                      ) : (
                        <>
                           <div className="w-20 h-14 bg-brand-green/10 dark:bg-brand-cream/5 rounded-lg mr-4 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-brand-green/50 dark:text-brand-cream/40">{ICONS.search}</Icon>
                          </div>
                          <div className="flex-grow overflow-hidden flex items-center justify-between">
                            <span className="truncate">{suggestion}</span>
                            {isRecent && (
                               <span className="text-xs text-brand-green-dark dark:text-brand-green-dark bg-brand-green/20 dark:bg-brand-cream/80 ml-2 flex-shrink-0 px-2 py-0.5 rounded-full font-medium">Recent</span>
                            )}
                          </div>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;