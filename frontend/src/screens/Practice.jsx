import React from 'react';
import { useState } from 'react';
import Rating from '../components/Rating';

export default function Practice() {
  const [rating, setRating] = useState(0);
  console.log(rating);
  return (
    <div>
      <button className="rating-btn" onClick={() => setRating(1)}>
        <i className={rating >= 1 ? 'fas fa-star' : 'far fa-star'}></i>
      </button>
      <button className="rating-btn" onClick={() => setRating(2)}>
        <i className={rating >= 2 ? 'fas fa-star' : 'far fa-star'}></i>
      </button>
      <button className="rating-btn" onClick={() => setRating(3)}>
        <i className={rating >= 3 ? 'fas fa-star' : 'far fa-star'}></i>
      </button>
      <button className="rating-btn" onClick={() => setRating(4)}>
        <i className={rating >= 4 ? 'fas fa-star' : 'far fa-star'}></i>
      </button>
      <button className="rating-btn" onClick={() => setRating(5)}>
        <i className={rating >= 5 ? 'fas fa-star' : 'far fa-star'}></i>
      </button>

      {/* <Rating rating={rating} numReviews={10}></Rating> */}
    </div>
  );
}
