import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import {
  fetchRecommendedEvents,
  RecommendedEvent,
} from "../services/RecommendationService";
import { useNavigate } from "react-router-dom";

const RecommendedEvents: React.FC = () => {
  // State to hold recommended events, loading state, and error message
  const [recommendedEvents, setRecommendedEvents] = useState<
    RecommendedEvent[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Effect to fetch recommended events when component mounts
  useEffect(() => {
    const loadRecommendedEvents = async () => {
      try {
        // Fetch recommended events from the service
        const data = await fetchRecommendedEvents();
        setRecommendedEvents(data);
      } catch (error) {
        setError("Error loading recommended events.");
      } finally {
        setLoading(false);
      }
    };

    loadRecommendedEvents();
  }, []); // runs once on mount

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleViewEventClick = (eventId: number) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <Row>
      <Col>
        <h3>Recommended Events</h3>

        {/* Check if there are recommended events to display */}
        {recommendedEvents.length > 0 ? (
          recommendedEvents.map((recommendedEvent) => (
            <Card key={recommendedEvent.id} className="my-3">
              <Card.Body>
                <Card.Title>{recommendedEvent.title}</Card.Title>
                <p>
                  <FaCalendarAlt />{" "}
                  {new Date(recommendedEvent.startDate).toLocaleDateString()} -{" "}
                  {new Date(recommendedEvent.endDate).toLocaleDateString()}{" "}
                  <br />
                  <FaClock />{" "}
                  {new Date(recommendedEvent.endDate).toLocaleTimeString()}{" "}
                  <br />
                  <FaMapMarkerAlt /> {recommendedEvent.location}
                </p>
                <Button
                  variant="primary"
                  onClick={() => handleViewEventClick(recommendedEvent.id)}
                >
                  View Event
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No recommended events available.</p>
        )}
      </Col>
    </Row>
  );
};

export default RecommendedEvents;
