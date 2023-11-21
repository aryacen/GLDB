import React from 'react';

function RatingRead({ rating }) {

  const fullStar = '★'
  const halfStar = `\u2B50\uFE0F\u1F31C`
  const emptyStar = '☆'

  return (
    <div className="rating-container-read">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className="star-read"
        >
          {index + 1 <= rating ? fullStar : emptyStar}
        </span>
      ))}
    </div>
  );
}

export default RatingRead;