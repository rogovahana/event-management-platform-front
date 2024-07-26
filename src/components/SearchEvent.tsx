import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { fetchEvents } from '../services/SearchService';
import './SearchEvent.css';

interface Event {
  id: string;
  title: string;
  description: string;
  imgSrc: string;
}

const cities = [
  { id: '1', name: 'New York City' },
  { id: '2', name: 'Los Angeles' },
  { id: '3', name: 'Chicago' },
  { id: '4', name: 'Houston' },
  { id: '5', name: 'Phoenix' }
];

const categories = [
  { id: '1', name: 'Music' },
  { id: '2', name: 'Sports' },
  { id: '3', name: 'Arts' },
  { id: '4', name: 'Technology' },
  { id: '5', name: 'Food & Drink' }
];

function SearchEvent() {
  const [cityId, setCityId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [searchText, setSearchText] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate at least one field is filled
    if (!cityId && !categoryId && !searchText) {
      alert('Please fill at least one search field.');
      return;
    }

    setLoading(true);
    try {
      const data = await fetchEvents({ cityId, categoryId, searchText });
      setEvents(data);
      setShowNoResults(data.length === 0);
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
        style={{ zIndex: 10, maxWidth: '90%' }}
      >
        <Form onSubmit={handleSearch}>
          <Row className="g-2">
            <Col xs={12} sm={6} md={3}>
              <Form.Select value={cityId} onChange={(e) => setCityId(e.target.value)}>
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Form.Control
                type="text"
                placeholder="Search for events"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col xs={12} sm={6} md={3}>
              <Button type="submit" className="w-100" style={{ backgroundColor: '#7848F4' }}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      {loading && <div className="loading">Loading...</div>}

      {!loading && showNoResults && (
        <Container className="mt-5">
          <Row>
            <Col>
              <div className="no-results">No events found. Please adjust your search criteria and try again.</div>
            </Col>
          </Row>
        </Container>
      )}

      <Container className="mt-5 search-results-container">
        <Row>
          {events.map((event) => (
            <Col key={event.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src={event.imgSrc} />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>{event.description}</Card.Text>
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