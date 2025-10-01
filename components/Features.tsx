import React from 'react';
import { ICONS } from '../constants';
import Icon from './common/Icon';

const features = [
  {
    icon: ICONS.wand,
    title: 'AI-Powered Itineraries',
    description: 'Describe your dream trip or upload an inspiration photo. Our AI crafts a detailed, day-by-day plan in seconds.',
  },
  {
    icon: ICONS.cloud,
    title: 'Live Weather Forecasts',
    description: 'Get real-time and 5-day weather forecasts for your destination, integrated directly into your itinerary.',
  },
  {
    icon: ICONS.gem,
    title: 'Save & Revisit Trips',
    description: "Keep a collection of your favorite generated itineraries. Access your saved adventures anytime from the 'My Trips' page.",
  },
  {
    icon: ICONS.share,
    title: 'Share Your Adventure',
    description: 'Easily share your generated travel plans with friends and family via a simple link.',
  },
  {
    icon: ICONS.paperPlane,
    title: 'Daily Destination Ideas',
    description: "Stuck for inspiration? Discover new and exciting travel ideas every day with our 'Daily Departures' spotlight.",
  },
  {
    icon: ICONS.lightbulb,
    title: 'Local Insights & AI Tips',
    description: 'Go beyond the basics. Every activity includes a unique AI-powered tip to discover hidden gems and local secrets.',
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-brand-green transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-brand-green-dark dark:text-brand-cream sm:text-4xl">
            Your Entire Trip, Intelligently Planned
          </h2>
          <p className="mt-4 text-lg text-brand-green dark:text-brand-cream/80 max-w-2xl mx-auto">
            Voyara is more than a booking site. We're your personal AI travel agent, co-piloting your journey from inspiration to destination.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-green dark:bg-brand-orange text-brand-cream dark:text-brand-green-dark transition-colors duration-300">
                  <Icon className="h-6 w-6">{feature.icon}</Icon>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-brand-green-dark dark:text-brand-cream">{feature.title}</h3>
                <p className="mt-2 text-base text-brand-green dark:text-brand-cream/80">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;