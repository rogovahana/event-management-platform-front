// needs some changes
import { useState, useEffect } from 'react';
import { fetchReviews, postReview, updateReview, deleteReview } from '../services/reviewService';
import '../components/Review.css'; 
import { useHotkeys } from 'react-hotkeys-hook';

interface Review {
  id: number;
  userId: number;
  eventId: number;
  rating: number;
  comment: string;
  userName: string;
  eventTitle: string;
}

const ReviewComponent = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ userId: 1, eventId: 1, rating: 0, comment: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editingReview, setEditingReview] = useState({ rating: 0, comment: '' });

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchReviews();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, []);

  const handleAddReview = async () => {
    try {
      const validRating = Math.min(Math.max(newReview.rating, 1), 5);
      setNewReview({ ...newReview, rating: validRating });
      
      const addedReview = await postReview(newReview);
      setReviews([...reviews, addedReview]);
      setNewReview({ userId: 1, eventId: 1, rating: 0, comment: '' });
      setError(null); 
    } catch (error) {
      console.error('Error adding review:', error);
      setError('Failed to add the review. Please try again.');
    }
  };

  const handleDeleteReview = async (id: number) => {
    try {
      await deleteReview(id);
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleUpdateReview = async (id: number) => {
    try {
      const validRating = Math.min(Math.max(editingReview.rating, 1), 5);
      const updated = await updateReview(id, { ...editingReview, rating: validRating });
      setReviews(reviews.map((review) => (review.id === id ? updated : review)));
      setEditingReviewId(null);
      setEditingReview({ rating: 0, comment: '' }); 
    } catch (error) {
      console.error('Error updating review:', error);
      setError('Failed to update the review. Please try again.');
    }
  };

  const handleReviewSubmit = () => {
    handleAddReview();
  };

  const handleRatingChange = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  // Keyboard shortcuts
  useHotkeys('ctrl+enter', handleReviewSubmit, [newReview]); // Post
  useHotkeys('esc', () => {
    setNewReview({ userId: 1, eventId: 1, rating: 0, comment: '' }); // Clear
  });
  useHotkeys('ctrl+5', () => handleRatingChange(5), [newReview]); // 5-star

  return (
    <div className="review-container">
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <ul className="review-list">
          {reviews.map((review) => (
            <li key={review.id} className="review-item">
              <p><strong>Event:</strong> {review.eventTitle}</p>
              <p><strong>User:</strong> {review.userName}</p>
              <p><strong>Rating:</strong> {review.rating}</p>
              <p><strong>Comment:</strong> {review.comment}</p>
              <button className="delete" onClick={() => handleDeleteReview(review.id)}>Delete</button>
              <button className="update" onClick={() => {
                setEditingReviewId(review.id);
                setEditingReview({ rating: review.rating, comment: review.comment });
              }}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="error-message">{error}</p>}
      <div className="add-review">
        <h3>{editingReviewId !== null ? 'Edit Review' : 'Add a Review'}</h3>
        <input
          type="number"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          value={editingReviewId !== null ? editingReview.rating : newReview.rating}
          onChange={(e) => {
            if (editingReviewId !== null) {
              setEditingReview({ ...editingReview, rating: Math.min(Math.max(Number(e.target.value), 1), 5) });
            } else {
              setNewReview({ ...newReview, rating: Math.min(Math.max(Number(e.target.value), 1), 5) });
            }
          }}
        />
        <input
          type="text"
          placeholder="Comment"
          value={editingReviewId !== null ? editingReview.comment : newReview.comment}
          onChange={(e) => {
            if (editingReviewId !== null) {
              setEditingReview({ ...editingReview, comment: e.target.value });
            } else {
              setNewReview({ ...newReview, comment: e.target.value });
            }
          }}
        />
        {editingReviewId !== null ? (
          <>
            <button onClick={() => handleUpdateReview(editingReviewId)}>Update Review</button>
            <button onClick={() => setEditingReviewId(null)}>Cancel</button>
          </>
        ) : (
          <button onClick={handleAddReview}>Add Review</button>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
