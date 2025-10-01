import React, { useState } from 'react';
import StarRating from './common/StarRating';
import { Review } from '../types';

interface ReviewFormProps {
  itemId: string;
  onPostReview: (review: Omit<Review, 'id' | 'author'>) => void;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ itemId, onPostReview, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }
    if (comment.trim() === '') {
      setError('Please leave a comment.');
      return;
    }
    onPostReview({
      itemId,
      rating,
      comment
    });
    // Reset form for next time
    setRating(0);
    setComment('');
    setError('');
  };

  return (
    <div className="mt-4 p-4 bg-brand-green/5 dark:bg-brand-cream/5 border border-brand-green/10 dark:border-brand-cream/10 rounded-lg animate-fade-in">
      <h4 className="font-semibold text-brand-green-dark dark:text-brand-cream mb-2">Share Your Experience</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <StarRating rating={rating} setRating={setRating} />
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="How was it? What did you like or dislike?"
          className="w-full p-2 border border-brand-green/30 dark:border-brand-cream/20 rounded-md bg-brand-cream dark:bg-brand-green text-brand-green-dark dark:text-brand-cream focus:ring-2 focus:ring-brand-green dark:focus:ring-brand-orange focus:outline-none transition"
          rows={3}
        ></textarea>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <div className="flex justify-end gap-2 mt-3">
          <button
            type="button"
            onClick={onCancel}
            className="bg-brand-green/20 dark:bg-brand-cream/20 hover:bg-brand-green/30 dark:hover:bg-brand-cream/30 text-brand-green-dark dark:text-brand-cream font-bold py-2 px-4 rounded-lg transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-brand-green dark:bg-brand-orange hover:bg-opacity-80 dark:hover:opacity-90 text-brand-cream dark:text-brand-green-dark font-bold py-2 px-4 rounded-lg transition-colors text-sm"
          >
            Post Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;