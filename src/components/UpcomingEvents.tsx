import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './UpcomingEvents.css';
import { fetchEvents } from '../services/UpcomingEventService';

interface Event {
  id: string;
  title: string;
  text: string;
  imgSrc: string;
}

const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">
        <span>Upcoming </span>
        <span style={{color: "#7848F4",}}>Events</span>
      </h2>
      {events.length === 0 ? (
        <div className="no-events">No events to show</div>
      ) : (
        <Row>
          {events.map(event => (
            <Col key={event.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <div className="card-container">
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={event.imgSrc} />
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>{event.text}</Card.Text>
                    <Button style={{ color: "#7848F4",}}>Go somewhere</Button>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default UpcomingEvents;
