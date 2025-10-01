import React from 'react';

export const ICONS = {
  logo: (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.7,4.87,12.5,21.57a.75.75,0,0,1-1.3,0L2,4.87A1.75,1.75,0,0,1,3.44,2.5H20.26A1.75,1.75,0,0,1,21.7,4.87ZM12,18.81,18.81,5.5H4.89Z" fillOpacity="0.7"/>
      <g transform="scale(0.9) translate(1.5,1.5)">
          <path d="M19.75,4a2.75,2.75,0,1,1-5.5,0,2.75,2.75,0,0,1,5.5,0Zm-2.75,1.5a1.25,1.25,0,1,0,0-2.5,1.25,1.25,0,0,0,0,2.5Z"/>
          <path d="M12,14.5a3.5,3.5,0,1,0-7,0,3.5,3.5,0,0,0,7,0Zm-3.5,2a2,2,0,1,1,2-2,2,2,0,0,1-2,2Z"/>
          <path d="M12,11v7m-3.5-3.5h7m-5.3-1.8,3.6,3.6m-3.6,0,3.6-3.6" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round"/>
      </g>
    </svg>
  ),
  camera: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  paperPlane: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  ),
  clock: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  lightbulb: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  ),
  food: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15a2 2 0 0 0-2 2v5" />
      <path d="M17 15a2 2 0 0 1 2 2v5" />
      <path d="M19 15v-3a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v3" />
    </svg>
  ),
  attraction: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 8 1.5 1.5-2.4 2.4.9.9 2.4-2.4L20 12V8h-4z" />
      <path d="M4 12V8h4l1.5 1.5-2.4 2.4.9.9 2.4-2.4L12 12" />
      <path d="m8 16 1.5-1.5 2.4 2.4.9-.9-2.4-2.4L12 12" />
      <path d="M12 20v-4l-1.5-1.5 2.4-2.4.9.9-2.4 2.4L12 16z" />
    </svg>
  ),
  activity: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.5 16.5-1.5 12l7-4.5 7 4.5-7 4.5" />
      <path d="m-1.5 12 7 4.5 7-4.5" />
      <path d="M12.5 21 19.5 16.5l-7-4.5" />
      <path d="m19.5 16.5-7-4.5" />
      <path d="M5.5 16.5 12.5 12" />
    </svg>
  ),
  travel: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C20.2 10.7 20 10.3 20 10V7c0-2.2-1.8-4-4-4h-2c-1.1 0-2 .9-2 2v1" />
        <path d="M8 17h1" />
        <path d="M14 17h1" />
        <path d="M12 17H5c-1.7 0-3-1.3-3-3v0c0-1.7 1.3-3 3-3h12" />
        <path d="M3 11v- минералов3.5c0-1.4 1.1-2.5 2.5-2.5h3.5" />
        <circle cx="6.5" cy="17.5" r="2.5" />
        <circle cx="16.5" cy="17.5" r="2.5" />
    </svg>
  ),
    accommodation: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 21h20" />
      <path d="M6 21v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
      <path d="M12 3v12" />
      <path d="M11 3H5a2 2 0 0 0-2 2v10" />
      <path d="M13 3h6a2 2 0 0 1 2 2v10" />
    </svg>
  ),
  mapPin: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  sun: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  moon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  search: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  wand: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2 18.28V22h3.72L21.64 5.36a1.21 1.21 0 0 0 0-1.72Z" />
      <path d="m14 7 3 3" />
      <path d="M5 6v4" />
      <path d="M19 14v4" />
      <path d="M10 2v2" />
      <path d="M7 8H3" />
      <path d="M21 16h-4" />
      <path d="M11 3H9" />
    </svg>
  ),
  userCheck: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  ),
  messageChat: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  gem: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 13L2 9Z" />
      <path d="M12 22 6 9l-4-6" />
      <path d="M12 22 18 9l4-6" />
      <path d="M2 9h20" />
    </svg>
  ),
  close: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  share: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  ),
  starFilled: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  starOutline: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  cloud: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  cloudRain: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9" />
      <path d="M16 14v6" />
      <path d="M8 14v6" />
      <path d="M12 16v6" />
    </svg>
  ),
  cloudSnow: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 17.5A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
        <path d="m9 12-3 6" />
        <path d="m14 12-3 6" />
        <path d="m3 14 3 6" />
        <path d="m11 14 3 6" />
        <path d="m19 14-3 6" />
    </svg>
  ),
  cloudLightning: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.5 14.5A7.5 7.5 0 0 0 18 6h-1.26a8 8 0 1 0-11.25 9" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  ),
};

export const SEARCH_SUGGESTION_DESTINATIONS = [
  { 
    name: 'Paris, France', 
    description: 'City of Love, art, and gastronomy.', 
    imageUrl: 'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?q=80&w=2070&auto=format&fit=crop' 
  },
  { 
    name: 'Rome, Italy', 
    description: 'Ancient ruins, Renaissance art, and vibrant street life.', 
    imageUrl: 'https://images.unsplash.com/photo-1529260830199-42c24129f196?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Tokyo, Japan', 
    description: 'A dazzling blend of futuristic technology and ancient traditions.', 
    imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Bali, Indonesia', 
    description: 'Volcanic islands, lush rice paddies, and coral reefs.', 
    imageUrl: 'https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=1925&auto=format&fit=crop'
  },
  {
    name: 'Swiss Alps, Switzerland',
    description: 'Breathtaking mountain vistas, hiking, and skiing.',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'Santorini, Greece',
    description: 'Iconic whitewashed villages and dramatic Aegean views.',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-52b9be4ac20c?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'Kyoto, Japan',
    description: 'Temples, geishas, and traditional gardens.',
    imageUrl: 'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?q=80&w=2042&auto=format&fit=crop'
  },
];

export const MOCK_REVIEWS = [
  { id: '1', itemId: 'Eiffel Tower', author: 'Alex D.', rating: 5, comment: "Voyara's tip to go in the evening was perfect! The sparkling lights were magical, and the crowds were much smaller. An unforgettable experience." },
  { id: '2', itemId: 'Louvre Museum', author: 'Samantha P.', rating: 4, comment: "The AI's guided path to see the highlights was a lifesaver. It's a huge place, and we would have been lost without it. Only 4 stars because it's still so crowded!" },
  { id: '3', itemId: 'Le Procope', author: 'Ben Carter', rating: 5, comment: "Best onion soup I've ever had. Thanks for the recommendation, Voyara! The historical atmosphere was incredible." },
  { id: '4', itemId: 'Colosseum', author: 'Maria G.', rating: 5, comment: "The 'skip-the-line' ticket advice was crucial. We walked right in while others waited for hours. The history here is just breathtaking." }
];

export const DAILY_DESTINATIONS = [
  { name: 'Maldives', country: 'Maldives', emoji: '🏝️' },
  { name: 'Reykjavik', country: 'Iceland', emoji: '🌋' },
  { name: 'Amalfi Coast', country: 'Italy', emoji: '🍋' },
  { name: 'Serengeti', country: 'Tanzania', emoji: '🦓' },
  { name: 'Bora Bora', country: 'French Polynesia', emoji: '🐢' },
  { name: 'Marrakech', country: 'Morocco', emoji: '🕌' },
  { name: 'New Zealand', country: 'New Zealand', emoji: '🥝' },
  { name: 'Machu Picchu', country: 'Peru', emoji: '🦙' },
  { name: 'Prague', country: 'Czech Republic', emoji: '🏰' },
  { name: 'Dubai', country: 'UAE', emoji: '🏙️' },
  { name: 'Bangkok', country: 'Thailand', emoji: '🛵' },
  { name: 'Cairo', country: 'Egypt', emoji: '🏺' }
];