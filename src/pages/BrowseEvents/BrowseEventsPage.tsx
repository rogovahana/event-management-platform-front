import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BrowseEventsPage.css';
import Navbari from '../../components/Navbar/Navbar';
import Footeri from '../../components/Footer/Footer';
import { Dropdown, Modal, Container, Row, Col, Button, FormControl, InputGroup } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaEnvelope, FaFacebookMessenger } from 'react-icons/fa';
import Map from '../../components/Map';


// Event object
interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string;
  cityId: number;
  categoryId: number;
  availableTickets: number;
  attendees: number;
}


// Functional component for browsing events
const BrowseEventsPage: React.FC = () => {
   // State variables
  const [events, setEvents] = useState<Event[]>([]);
  const [cityId, setCityId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSharePopupVisible, setSharePopupVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [noEventsFound, setNoEventsFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetch('https://localhost:7136/api/Event');
        if (!response.ok) {
          throw new Error('Network response was not ok' + response.statusText);
        }
        const data = await response.json();
        const formattedEvents = data.map((event: any) => ({
          id: event.id,
          title: event.title,
          description: event.description,
          startDate: new Date(event.startDate).toLocaleDateString(),
          endDate: new Date(event.endDate).toLocaleDateString(),
          location: event.location,
          imageUrl: event.imageUrl,
          cityId: event.cityId,
          categoryId: event.categoryId,
          availableTickets: event.availableTickets,
          attendees: event.attendees,
        }));

        const filteredEvents = formattedEvents.filter((event: { cityId: number; categoryId: number; title: string; description: string; }) => {
          return (
            // Check if cityId is null or if the event's cityId matches the specified cityId
            (cityId === null || event.cityId === cityId) && 
               // Check if categoryId is null or if the event's categoryId matches the specified categoryId
            (categoryId === null || event.categoryId === categoryId) &&
            // Check if the searchTerm is empty or if the event's title or description contains the searchTerm
            (searchTerm === '' || event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.description.toLowerCase().includes(searchTerm.toLowerCase()))
          );
        });

        setEvents(filteredEvents);
        setNoEventsFound(filteredEvents.length === 0);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    getEvents();
  }, [cityId, categoryId, searchTerm]);

  const handleEventClick = (eventId: number) => {
    navigate(`/event/${eventId}`);
  };
// Show share popup and set the selected event
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
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search for events"
                aria-label="Search for events"
                aria-describedby="basic-addon2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            <div className="filters-row mb-3">
              <div className="filter-item">
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-city">
                    {cityId ? `City: ${cityId}` : 'Select City'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setCityId(1)}>New York City</Dropdown.Item>
                    <Dropdown.Item onClick={() => setCityId(2)}>Los Angeles</Dropdown.Item>
                    <Dropdown.Item onClick={() => setCityId(3)}>Chicago</Dropdown.Item>
                    <Dropdown.Item onClick={() => setCityId(4)}>Houston</Dropdown.Item>
                    <Dropdown.Item onClick={() => setCityId(5)}>Phoenix</Dropdown.Item>
                    <Dropdown.Item onClick={() => setCityId(null)}>Any City</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="filter-item">
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-category">
                    {categoryId ? `Category: ${categoryId}` : 'Select Category'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setCategoryId(1)}>Music</Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategoryId(2)}>Sports</Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategoryId(3)}>Arts</Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategoryId(4)}>Technology</Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategoryId(5)}>Food & Drink</Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategoryId(null)}>Any Category</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="events-container position-relative">
            <div className="events-list">
              {noEventsFound ? (
                <div className="no-events-message">
                  <h2>No events found</h2>
                  <p>Try adjusting the filters or check back later.</p>
                </div>
              ) : (
                events.map(event => (
                  <div className="event-card" key={event.id}>
                    <div className="event-content" onClick={() => handleEventClick(event.id)}>
                      <img src={event.imageUrl} alt={event.title} />
                      <div className="card-content">
                        <h3>{event.title}</h3>
                        <p>{event.startDate} to {event.endDate}</p>
                        <p>{event.location}</p>
                        <p>Available Tickets: {event.availableTickets}</p>
                        <p>Attendees: {event.attendees}</p>
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
                          <path fillRule="evenodd" clipRule="evenodd" d="M6.00003 4.75C5.58582 4.75 5.25003 5.08579 5.25003 5.5V19.2575C5.25003 19.549 5.48992 19.7888 5.78138 19.7888C5.90984 19.7888 6.03377 19.7417 6.12964 19.6575L12 14.5516L17.8704 19.6575C18.1051 19.8664 18.4575 19.8416 18.6664 19.6069C18.7507 19.511 18.7978 19.387 18.7978 19.2586V5.5C18.7978 5.08579 18.462 4.75 18.0478 4.75H6.00003ZM3.75003 5.5C3.75003 4.25736 4.75739 3.25 6.00003 3.25H18.0478C19.2905 3.25 20.2978 4.25736 20.2978 5.5V19.2586C20.2978 20.3681 19.4123 21.2536 18.3028 21.2536C17.8002 21.2536 17.3122 21.0652 16.9398 20.7244L12 16.1969L7.0603 20.7244C6.68788 21.0652 6.19993 21.2536 5.69728 21.2536C4.58778 21.2536 3.70226 20.3681 3.70226 19.2586V5.5H3.75003Z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="map-container">
              <Map events={events} />
            </div>
          </div>
        </div>
        <Modal show={isSharePopupVisible} onHide={handleClosePopup}>
          <Modal.Header closeButton>
            <Modal.Title>Share Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedEvent && (
              <Container>
                <Row>
                  <Col>
                    <h3>{selectedEvent.title}</h3>
                    <p>{selectedEvent.description}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button variant="outline-primary" href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank">
                      <FaFacebook /> Share on Facebook
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="outline-primary" href={`https://twitter.com/intent/tweet?text=${selectedEvent.title}&url=${window.location.href}`} target="_blank">
                      <FaTwitter /> Share on Twitter
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="outline-primary" href={`mailto:?subject=${selectedEvent.title}&body=${selectedEvent.description} %0A ${window.location.href}`} target="_blank">
                      <FaEnvelope /> Share via Email
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="outline-primary" href={`https://m.me/?link=${window.location.href}`} target="_blank">
                      <FaFacebookMessenger /> Share on Messenger
                    </Button>
                  </Col>
                </Row>
              </Container>
            )}
          </Modal.Body>
        </Modal>
      </div>
      <Footeri />
    </>
  );
};

export default BrowseEventsPage;