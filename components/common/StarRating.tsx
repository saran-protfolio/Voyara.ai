import React, { useState } from 'react';
import { ICONS } from '../../constants';
import Icon from './Icon';

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
  readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating, readOnly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const onMouseEnter = (index: number) => {
    if (!readOnly) {
      setHoverRating(index);
    }
  };

  const onMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };

  const onSaveRating = (index: number) => {
    if (!readOnly && setRating) {
      setRating(index);
    }
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className={`cursor-pointer transition-colors ${readOnly ? 'cursor-default' : ''}`}
          onMouseEnter={() => onMouseEnter(index)}
          onMouseLeave={() => onMouseLeave()}
          onClick={() => onSaveRating(index)}
        >
          <Icon className={`w-6 h-6 ${
            (hoverRating || rating) >= index
              ? 'text-brand-orange'
              : 'text-brand-green/30 dark:text-brand-cream/30'
          }`}>
            {(hoverRating || rating) >= index ? ICONS.starFilled : ICONS.starOutline}
          </Icon>
        </div>
      ))}
    </div>
  );
};

export default StarRating;