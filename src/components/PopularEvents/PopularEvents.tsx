import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  fetchPopularEvents,
  PopularEvent,
} from "../../services/PopularEventService";
import "./PopularEvents.css";

const PopularEvents: React.FC = () => {
  const [popularEvents, setPopularEvents] = useState<PopularEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch popular events when the component mounts
  useEffect(() => {
    const loadPopularEvents = async () => {
      try {
        const data = await fetchPopularEvents();
        setPopularEvents(data); // Update state with fetched events
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    loadPopularEvents();
  }, []); //array runs once on mount

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error loading popular events: {error}</div>;
  }

  return (
    <Container className="popular-events">
      <h2 className="mb-4">
        <span>Popular </span>
        <span style={{ color: "#7848F4" }}>Events</span>
      </h2>
      {popularEvents.length === 0 ? (
        <div className="no-events">No popular events available</div>
      ) : (
        <Row>
          {popularEvents.map((event) => (
            <Col key={event.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="event-card">
                <Card.Img
                  variant="top"
                  src={event.images[0]?.url}
                  className="event-image"
                />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>{event.description}</Card.Text>
                  <Card.Text>
                    <FaCalendarAlt />{" "}
                    {new Date(event.startDate).toLocaleDateString()} -{" "}
                    {new Date(event.endDate).toLocaleDateString()} <br />
                    <FaClock /> {new Date(
                      event.endDate
                    ).toLocaleTimeString()}{" "}
                    <br />
                    <FaMapMarkerAlt /> {event.location} <br />
                    <FaUser /> {event.attendees} attendees
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="mt-3"
                    onClick={() => navigate(`/event/${event.id}`)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default PopularEvents;
