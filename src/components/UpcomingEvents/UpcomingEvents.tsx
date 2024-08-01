import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import './UpcomingEvents.css';
import { fetchEvents } from '../../services/UpcomingEventService';

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: number;
  endDate: number;
  location: string;
  cityId: number;
}

const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);// Update state with fetched events
      } catch (error) {
        console.error('Upcoming events:', error);
      } finally {
        setLoading(false);// Stop loading
      }
    };
    loadEvents();
  }, []);    //array runs once on mount

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">
        <span>Upcoming </span>
        <span style={{ color: "#7848F4" }}>Events</span>
      </h2>
      {events.length === 0 ? (
        <div className="no-events">No events to show</div>
      ) : (
        <Row>
          {events.map(event => (
            <Col key={event.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="event-card">
                {/* <Card.Img variant="top" src={event.imgSrc} /> */}
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>{event.description}</Card.Text>
                  <Card.Text>
                    <strong>Date:</strong> {new Date(event.startDate).toLocaleDateString()} <br />
                    <strong>Time:</strong> {new Date(event.startDate).toLocaleTimeString()} <br />
                    <strong>Location:</strong> {event.location}
                  </Card.Text>
                  <Button 
                    variant="primary"
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
}

export default UpcomingEvents;
