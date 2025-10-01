export interface Activity {
  time: string;
  description: string;
  type: 'Dining' | 'Attraction' | 'Activity' | 'Travel' | 'Accommodation';
  ai_tip: string;
}

export interface DayPlan {
  day: number;
  theme: string;
  activities: Activity[];
}

export interface Itinerary {
  id?: string; // Optional unique ID for saved itineraries
  destination: string;
  duration: string;
  budget: string;
  summary: string;
  days: DayPlan[];
}

export interface ImageFile {
  base64: string;
  mimeType: string;
}

export interface Review {
  id: string;
  itemId: string; // The description of the activity/attraction
  author: string;
  rating: number; // 1-5
  comment: string;
}

// Weather Types
export interface CurrentWeather {
  temperature: number;
  condition: string;
  icon: string;
}

export interface ForecastDay {
  day: string;
  high: number;
  low: number;
  icon: string;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastDay[];
}