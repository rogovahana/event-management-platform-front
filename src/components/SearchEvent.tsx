import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { fetchEvents } from '../services/SearchService'; 

interface Event {
  id: string;
  title: string;
  text: string;
  imgSrc: string;
}

function SearchEvent() {
  const [eventType, setEventType] = useState('');
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await fetchEvents(eventType, location, dateTime);
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container 
        fluid 
        className="search-event-container text-center bg-light p-3 rounded mb-4" 
        style={{ zIndex: 10, maxWidth: '90%' }}>
        <Form onSubmit={handleSearch}>
          <Row className="g-2">
            <Col xs={12} sm={6} md={3}>
              <Form.Select 
                aria-label="Looking for" 
                value={eventType} 
                onChange={(e) => setEventType(e.target.value)}
              >
                <option>Choose Event type</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </Form.Select>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Form.Select 
                aria-label="Location" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>Choose Location...</option>
                <option value="1">Location 1</option>
                <option value="2">Location 2</option>
                <option value="3">Location 3</option>
              </Form.Select>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Form.Select 
                aria-label="When"  
                value={dateTime} 
                onChange={(e) => setDateTime(e.target.value)}
              >
                <option>Choose date and time</option>
                <option value="1">Today</option>
                <option value="2">Tomorrow</option>
                <option value="3">This week</option>
              </Form.Select>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Button  type="submit" className="w-100" style={{ backgroundColor: "#7848F4" }}>Search</Button>
            </Col>
          </Row>
        </Form>
      </Container>
      
      {loading && <div className="loading">Loading...</div>}
      
      <Container className="mt-5">
        <Row>
          {events.map(event => (
            <Col key={event.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={event.imgSrc} />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>{event.text}</Card.Text>
                  <Button style={{ color: "#7848F4",}}>Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default SearchEvent;