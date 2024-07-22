import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './UpcomingEvents.css';

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  city: string;
  attendees: number;
  images: string[];
}

const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEvents(dummyEvents);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">
        <span>Upcoming </span>
        <span style={{color: "#7848F4"}}>Events</span>
      </h2>
      {events.length === 0 ? (
        <div className="no-events">No events to show</div>
      ) : (
        <Row>
          {events.map(event => (
            <Col key={event.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <div className="card-container">
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={event.images[0]} />
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>
                      {event.description}
                      <br />
                      <span>Start Date: {event.startDate}</span>
                      <br />
                      <span>End Date: {event.endDate}</span>
                      <br />
                      <span>Location: {event.city}</span>
                      <br />
                      <span>Attendees: {event.attendees}</span>
                    </Card.Text>
                    <Button>Go somewhere</Button>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default UpcomingEvents;

// Dummy data to simulate fetching events
const dummyEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference',
    description: 'An exhibition showcasing the works of local artists',
    startDate: '2024-08-15',
    endDate: '2024-08-17',
    city: 'San Francisco, CA',
    attendees: 500,
    images: ['https://via.placeholder.com/150']
  },
  {
    id: '2',
    title: 'Art Exhibition',
    description: 'An exhibition showcasing the works of local artists',
    startDate: '2024-09-01',
    endDate: '2024-09-30',
    city: 'New York City, NY',
    attendees: 200,
    images: ['https://via.placeholder.com/150']
  },
  {
    id: '3',
    title: 'Music Festival',
    description: 'A festival featuring live music performances',
    startDate: '2024-10-10',
    endDate: '2024-10-12',
    city: 'Chicago, IL',
    attendees: 800,
    images: ['https://via.placeholder.com/150']
  },
  {
    id: '4',
    title: 'Food Expo',
    description: 'An expo showcasing the latest trends in the food industry',
    startDate: '2024-11-05',
    endDate: '2024-11-07',
    city: 'Los Angeles, CA',
    attendees: 400,
    images: ['https://via.placeholder.com/150']
  }
];