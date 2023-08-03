import React from 'react';
import './review.css';
import RatingStars from 'react-rating-stars-component';
import { isloggedIn } from '../../../components/utils/contents';

const ReviewModal = ({ show, onClose, onReviewSubmit, rating, onRatingChange, reviewText, onReviewTextChange }) => {
  const handleReviewSubmit = () => {
    if (isloggedIn) {
      onReviewSubmit();
    } else {
      alert('Please login to write a review.');
    }
  };
  
  return (
    <div className="modal-overlay" style={{ display: show ? 'flex' : 'none' }} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Write a Review</h3>
        <div>
          <label>
            Rating:
            <RatingStars
              count={5}
              value={rating}
              onChange={onRatingChange}
              size={24}
              activeColor="#ffd700"
            />
          </label>
        </div>
        <div>
          <label>
            Review:
            <textarea value={reviewText} onChange={(e) => onReviewTextChange(e.target.value)} />
          </label>
        </div>
        <button onClick={onClose}>Close</button>
        <button onClick={handleReviewSubmit}>Submit Review</button>
      </div>
    </div>
  );
};

export default ReviewModal;
