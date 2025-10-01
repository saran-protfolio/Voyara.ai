import React from 'react';
import { Review } from '../types';
import StarRating from './common/StarRating';

interface ReviewsShowcaseProps {
  reviews: Review[];
}

const ReviewsShowcase: React.FC<ReviewsShowcaseProps> = ({ reviews }) => {
  const displayedReviews = reviews.slice(0, 3); // Show the latest 3 reviews

  return (
    <section className="py-16 sm:py-24 bg-brand-green/10 dark:bg-black/20 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-brand-green-dark dark:text-brand-cream sm:text-4xl">
            Voices of Voyara
          </h2>
          <p className="mt-4 text-lg text-brand-green dark:text-brand-cream/80 max-w-2xl mx-auto">
            See what fellow travelers are saying about the trips we've planned.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedReviews.map((review) => (
            <div key={review.id} className="bg-brand-cream dark:bg-brand-green rounded-lg shadow-lg p-6 flex flex-col transition-colors duration-300">
              <div className="flex-grow">
                <StarRating rating={review.rating} readOnly />
                <p className="text-brand-green dark:text-brand-cream/90 mt-4 italic">"{review.comment}"</p>
              </div>
              <div className="mt-4 pt-4 border-t border-brand-green/20 dark:border-brand-cream/20">
                <p className="font-semibold text-brand-green-dark dark:text-brand-cream">{review.author}</p>
                <p className="text-sm text-brand-green/80 dark:text-brand-cream/70">on {review.itemId}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsShowcase;