import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { useHotkeys } from "react-hotkeys-hook";

interface ReviewProps {
  eventId: number;
  userId: number;
  reviewId?: number;  
  onReviewSubmit: (review: { userId: number; eventId: number; rating: number; comment: string }) => void;
}

const Review: React.FC<ReviewProps> = ({ eventId, userId, reviewId, onReviewSubmit }) => {
  const [review, setReview] = useState({
    userId: userId,
    eventId: eventId,
    rating: 0,
    comment: "",
  });

  const [reviewError, setReviewError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetchReviews();

    if (reviewId) {
      fetchReview(reviewId);
    }
  }, [reviewId]);

  // Fetch all reviews for the event
  const fetchReviews = async () => {
    try {
      const response = await fetch(`https://localhost:7136/Review`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      setReviewError("Failed to fetch reviews.");
    }
  };

  // Fetch a specific review by ID
  const fetchReview = async (id: number) => {
    try {
      const response = await fetch(`https://localhost:7136/Review/${id}`);
      const reviewData = await response.json();
      if (reviewData) {
        setReview(reviewData);
        setIsEditing(true);
      } else {
        setReviewError("Review not found.");
      }
    } catch (error) {
      setReviewError("Failed to fetch review.");
    }
  };

  // Handle input changes
  const handleReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  // Handle star rating changes
  const handleRatingChange = (newRating: number) => {
    setReview({
      ...review,
      rating: newRating,
    });
  };

  // Submit new or updated review
  const handleReviewSubmit = async () => {
    try {
      if (isEditing) {
        //  existing review
        await fetch(`https://localhost:7136/Review?id=${reviewId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rating: review.rating, comment: review.comment }),
        });
      } else {
        // Add review
        await fetch('https://localhost:7136/Review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(review),
        });
      }
      // Update reviews list
      fetchReviews();
      setReviewError("");
      onReviewSubmit(review);
      setReview({ userId: userId, eventId: eventId, rating: 0, comment: "" });
      setIsEditing(false);
    } catch (error) {
      setReviewError("An error occurred. Please try again.");
    }
  };

  // keyboard shortcuts
  useHotkeys('ctrl+enter', handleReviewSubmit, [review]); //add
  useHotkeys('esc', () => {
    setReview({ userId: userId, eventId: eventId, rating: 0, comment: "" });
    setIsEditing(false); //delete
  });
  useHotkeys('ctrl+5', () => handleRatingChange(5), [review]); //add 5 star

  return (
    <div>
      <Card className="my-4">
        <Card.Body>
          <h5>{isEditing ? "Edit Review" : "Leave a Review"}</h5>
          <Form>
            <Form.Group controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <StarRatings
                rating={review.rating}
                changeRating={handleRatingChange}
                numberOfStars={5}
                name="rating"
              />
            </Form.Group>
            <Form.Group controlId="formComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="comment"
                value={review.comment}
                onChange={handleReviewChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleReviewSubmit}>
              {isEditing ? "Update Review" : "Submit Review"}
            </Button>
          </Form>
          {reviewError && <p className="mt-3 text-danger">{reviewError}</p>}
        </Card.Body>
      </Card>
      <div>
        <h5>Existing Reviews</h5>
        {reviews.length > 0 ? (
          <ul>
            {reviews
              .filter((rev) => rev.eventId === eventId)
              .map((rev, index) => (
                <li key={rev.id}>
                  <StarRatings
                    rating={rev.rating}
                    numberOfStars={5}
                    starRatedColor="#7848F4"
                    starDimension="25px"
                    starSpacing="5px"
                    name={`rating-${index}`}
                  />
                  <p>{rev.comment}</p>
                  <p><small>Reviewed by: {rev.userId}</small></p>
                </li>
              ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default Review;
