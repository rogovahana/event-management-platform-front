// needs to add the logic of auth0(userid needs to chanfe)
import { useState, useEffect, useCallback } from "react";
import {
  fetchReviewsByEventId,
  postReview,
  updateReview,
  deleteReview,
} from "../../services/reviewService";
import "../ReviewEvents/Review.css";
import { useHotkeys } from "react-hotkeys-hook";

interface Review {
  id: number;
  userId: number;
  eventId: number;
  rating: number;
  comment: string;
  userName: string;
  eventTitle: string;
}

interface ReviewComponentProps {
  eventId: number;
}

type LoadingAction = "add" | "update" | "delete" | null; // Indicates which action is currently loading

const ReviewComponent = ({ eventId }: ReviewComponentProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewForm, setReviewForm] = useState<{
    id: number | null;
    rating: number;
    comment: string;
  }>({
    id: null,
    rating: 0,
    comment: "",
  });
  const [loading, setLoading] = useState(true); // if reviews are being loaded
  const [error, setError] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<LoadingAction>(null);

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      try {
        const data = await fetchReviewsByEventId(eventId);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to fetch reviews. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, [eventId]);
  // add a new review
  const handleAddReview = async () => {
    if (reviewForm.rating < 1 || reviewForm.rating > 5) {
      setError("Rating must be between 1 and 5.");
      return;
    }

    setLoadingAction("add");
    try {
      const addedReview = await postReview({
        ...reviewForm,
        userId: 1,
        eventId,
      }); // 1 for NOW
      setReviews((prev) => [...prev, addedReview]); // Add new review to the list
      setReviewForm({ id: null, rating: 0, comment: "" });
      setError(null);
    } catch (error) {
      console.error("Error adding review:", error);
      setError("Failed to add the review. Please try again.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDeleteReview = async (id: number) => {
    setLoadingAction("delete");
    try {
      await deleteReview(id); // Delete the review by ID
      setReviews((prev) => prev.filter((review) => review.id !== id)); // Remove the deleted review from the list
    } catch (error) {
      console.error("Error deleting review:", error);
      setError("Failed to delete the review. Please try again.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleUpdateReview = async () => {
    if (reviewForm.id === null) return;
    if (reviewForm.rating < 1 || reviewForm.rating > 5) {
      setError("Rating must be between 1 and 5.");
      return;
    }

    setLoadingAction("update");
    try {
      const updated = await updateReview(reviewForm.id, {
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });
      setReviews((prev) =>
        prev.map((review) => (review.id === reviewForm.id ? updated : review))
      );
      setReviewForm({ id: null, rating: 0, comment: "" });
      setError(null);
    } catch (error) {
      console.error("Error updating review:", error);
      setError("Failed to update the review. Please try again.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleReviewSubmit = useCallback(() => {
    if (reviewForm.id === null) {
      handleAddReview();
    } else {
      handleUpdateReview();
    }
  }, [reviewForm, handleAddReview, handleUpdateReview]);

  const handleRatingChange = (rating: number) => {
    setReviewForm((prev) => ({ ...prev, rating }));
  };

  useHotkeys("ctrl+enter", handleReviewSubmit, [reviewForm]); // Post or Update
  useHotkeys("esc", () => {
    setReviewForm({ id: null, rating: 0, comment: "" }); // Clear
  });
  useHotkeys("ctrl+5", () => handleRatingChange(5), [reviewForm]); // 5-star

  return (
    <div className="review-container">
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <ul className="review-list">
          {reviews.map((review) => (
            <li key={review.id} className="review-item">
              <p>
                <strong>Event:</strong> {review.eventTitle}
              </p>
              <p>
                <strong>User:</strong> {review.userName}
              </p>
              <p>
                <strong>Rating:</strong> {review.rating}
              </p>
              <p>
                <strong>Comment:</strong> {review.comment}
              </p>
              <button
                className="delete"
                onClick={() => handleDeleteReview(review.id)}
                disabled={loadingAction === "delete"}
              >
                Delete
              </button>
              <button
                className="update"
                onClick={() => {
                  setReviewForm({
                    id: review.id,
                    rating: review.rating,
                    comment: review.comment,
                  });
                }}
                disabled={loadingAction === "update"}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="error-message">{error}</p>}
      <div className="add-review">
        <h3>{reviewForm.id !== null ? "Edit Review" : "Add a Review"}</h3>
        <input
          type="number"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          value={reviewForm.rating}
          onChange={(e) => handleRatingChange(Number(e.target.value))}
          disabled={loadingAction !== null}
        />
        <input
          type="text"
          placeholder="Comment"
          value={reviewForm.comment}
          onChange={(e) =>
            setReviewForm((prev) => ({ ...prev, comment: e.target.value }))
          }
          disabled={loadingAction !== null}
        />
        {reviewForm.id !== null ? (
          <>
            <button
              onClick={handleUpdateReview}
              disabled={loadingAction === "update"}
            >
              Update Review
            </button>
            <button
              onClick={() =>
                setReviewForm({ id: null, rating: 0, comment: "" })
              }
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleAddReview} disabled={loadingAction === "add"}>
            Add Review
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
