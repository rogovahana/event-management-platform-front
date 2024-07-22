import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BrowseEventsPage.css'; 
import firstEvent from '../assets/events/event_1.webp';
import secondEvent from '../assets/events/event_2.webp';
import Navbari from '../components/Navbar';
import Footeri from '../components/Footer';
import { Dropdown, Modal, Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaEnvelope, FaFacebookMessenger } from 'react-icons/fa';
import Map from '../components/Map'; 
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  location: string;
  imageUrl: string;
  latitude: number; 
  longitude: number;
}

const BrowseEventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();
  const [isSharePopupVisible, setSharePopupVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    // Temporary, only to test before API is ready
    setEvents([
      {
        id: 1,
        title: 'Pro-Bono Coaching Sessions',
        date: 'Wed, Jul 17',
        time: '1:00 PM CEST',
        description: 'Join our pro-bono coaching sessions to unlock your potential.',
        location: 'Online',
        imageUrl: firstEvent,
        latitude: 51.505, 
        longitude: -0.09, 
      },
      {
        id: 2,
        title: 'Think & Grow Rich Challenge',
        date: 'Mon, Jul 24',
        time: '11:00 AM EDT',
        description: 'Join our Think & Grow Rich challenge.',
        location: 'Online',
        imageUrl: secondEvent,
        latitude: 51.515, 
        longitude: -0.1, 
      },
      {
        id: 3,
        title: 'Pro-Bono Coaching Sessions',
        date: 'Wed, Jul 17',
        time: '1:00 PM CEST',
        description: 'Join our pro-bono coaching sessions to unlock your potential.',
        location: 'Online',
        imageUrl: firstEvent,
        latitude: 51.525,
        longitude: -0.11, 
      },
   
    ]);
  }, []);

  const handleEventClick = (eventId: number) => {
    navigate(`/events`);
  };

  const handleShareClick = (event: Event) => {
    setSelectedEvent(event);
    setSharePopupVisible(true);
  };

  const handleClosePopup = () => {
    setSharePopupVisible(false);
  };

  return (
    <>
      <Navbari />
      <div className="browse-events-page">
        <div className="browse-events-container">
          <div className="filter-container">
            <div>
              <h1>Browse Events</h1>
            </div>
            <div className="filters-row mb-3">
              <div className="filter-item">
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-events">
                    Events
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Today</Dropdown.Item>
                    <Dropdown.Item>Tomorrow</Dropdown.Item>
                    <Dropdown.Item>This Week</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="filter-item">
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-type">
                    Any type
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Any type</Dropdown.Item>
                    <Dropdown.Item>Workshop</Dropdown.Item>
                    <Dropdown.Item>Seminar</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="filter-item">
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-distance">
                    2 miles
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>2 miles</Dropdown.Item>
                    <Dropdown.Item>5 miles</Dropdown.Item>
                    <Dropdown.Item>10 miles</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="filter-item">
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-category">
                    Any category
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Any category</Dropdown.Item>
                    <Dropdown.Item>Business</Dropdown.Item>
                    <Dropdown.Item>Technology</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="filter-item">
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-sort">
                    Sort by: Relevance
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Relevance</Dropdown.Item>
                    <Dropdown.Item>Date</Dropdown.Item>
                    <Dropdown.Item>Popularity</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="events-container position-relative">
            <div className="events-list">
              {events.map(event => (
                <div className="event-card" key={event.id}>
                  <div className="event-content" onClick={() => handleEventClick(event.id)}>
                    <img src={event.imageUrl} alt={event.title} />
                    <div className="card-content">
                      <h3>{event.title}</h3>
                      <p>{event.date} at {event.time}</p>
                      <p>{event.location}</p>
                    </div>
                  </div>
                  <div className="card-icons">
                    <a href="#" onClick={() => handleShareClick(event)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" className="injected-svg fill-current">
                        <title>Share this event</title>
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.8232 5.23741C10.9807 5.07992 11.25 5.19146 11.25 5.41419L11.25 14.25C11.25 14.6642 11.5858 15 12 15C12.4142 15 12.75 14.6642 12.75 14.25V5.41418C12.75 5.19146 13.0193 5.07992 13.1768 5.23741L15.9697 8.0303C16.2626 8.32319 16.7374 8.32319 17.0303 8.0303C17.3232 7.73741 17.3232 7.26253 17.0303 6.96964L13.2374 3.17675C12.554 2.49333 11.446 2.49333 10.7626 3.17675L6.96967 6.96964C6.67678 7.26253 6.67678 7.73741 6.96967 8.0303C7.26256 8.32319 7.73744 8.32319 8.03033 8.0303L10.8232 5.23741ZM9.25 10H6C4.89543 10 4 10.8954 4 12V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V12C20 10.8954 19.1046 10 18 10H14.75V11.5H18C18.2761 11.5 18.5 11.7239 18.5 12V20C18.5 20.2761 18.2761 20.5 18 20.5H6C5.72386 20.5 5.5 20.2761 5.5 20V12C5.5 11.7239 5.72386 11.5 6 11.5H9.25V10Z"></path>
                      </svg>
                    </a>
                    <a href="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" className="injected-svg fill-current" data-src="https://secure.meetupstatic.com/next/images/design-system-icons/bookmark-outline.svg" xmlnsXlink="http://www.w3.org/1999/xlink" data-icon="icon-1538">
                        <title>Save event</title>
                        <path fillRule="evenodd" clipRule="evenodd" d="M18 3.5H6C5.72386 3.5 5.5 3.72386 5.5 4V19.573L10.4348 17.1056C11.4201 16.6129 12.5799 16.6129 13.5652 17.1056L18.5 19.5729V4C18.5 3.72386 18.2761 3.5 18 3.5ZM6 2C4.89543 2 4 2.89543 4 4V20.382C4 21.1253 4.78231 21.6088 5.44721 21.2764L11.1056 18.4472C11.6686 18.1657 12.3314 18.1657 12.8944 18.4472L18.5528 21.2764C19.2177 21.6088 20 21.1253 20 20.382V4C20 2.89543 19.1046 2 18 2H6Z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="map-container">
              <Map events={events} />
            </div>
          </div>
        </div>
      </div>

      <Footeri />

      <Modal show={isSharePopupVisible} onHide={handleClosePopup} centered>
        <Modal.Header closeButton>
          <Modal.Title>Share with friends</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <Container>
              <Row className="mb-3">
                <Col md={12} className="text-center">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=link/here`} target="_blank" rel="noopener noreferrer">
                    <FaFacebook size={24} />
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=link/here`} target="_blank" rel="noopener noreferrer">
                    <FaTwitter size={24} />
                  </a>
                  <a href={`mailto:?subject=Check%20out%20this%20event&body=link/here`} target="_blank" rel="noopener noreferrer">
                    <FaEnvelope size={24} />
                  </a>
                  <a href={`https://m.me/?link=link/here`} target="_blank" rel="noopener noreferrer">
                    <FaFacebookMessenger size={24} />
                  </a>
                </Col>
              </Row>
              {/* <Row>
                <Col md={12} className="text-center">
                  <InputGroup>
                    <FormControl
                      readOnly
                      value={`link/here`}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => navigator.clipboard.writeText(`link/here`)}
                    >
                      Copy
                    </Button>
                  </InputGroup>
                </Col>
              </Row> */}
            </Container>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BrowseEventsPage;
