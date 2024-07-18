import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import baneri1 from "../assets/logo/carousel/baner1.jpg";
import SearchEvent from "./SearchEvent";
// import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateEventButton from "./CreateEventButton";
import Category from "../components/Category";

type Event = {
  title: string;
  location: string;
  date: string;
};

function Carouseli() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Hardcode events data
    const eventData: Event[] = [
      {
        title: "Sample Event 1",
        location: "Sample Location 1",
        date: "2024-07-15T18:00:00Z",
      },
      {
        title: "Sample Event 2",
        location: "Sample Location 2",
        date: "2024-07-16T20:00:00Z",
      },
    ];

    console.log(" events:", eventData);
    setEvents(eventData);
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div>
      <ToastContainer />

      <div className="carousel-container position-relative">
        <Carousel>
          {events.map((event, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={baneri1}
                alt={`Slide ${index}`}
  style={{ maxHeight: "679px", objectFit: "cover" }}
                
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="position-absolute" style={{ top: "20%", left: "10%" }}>
          <div
            className="bg-white p-3 rounded shadow text-dark"
            style={{ width: "300px" }}
          >
            <img
              src={baneri1}
              alt="Event"
              className="img-fluid mb-2"
  style={{ maxHeight: "400px", objectFit: "cover" }}
            />
            <p className="mb-1">Title: {events[0]?.title}</p>
            <p className="mb-2">Location: {events[0]?.location}</p>
            <Button variant="primary" onClick={handleShow}>
              View Event Details
            </Button>
          </div>
        </div>
        <div className="position-absolute bottom-0 start-50 translate-middle-x w-100">
          <SearchEvent />
        </div>
        <div className="d-md-none">
          <SearchEvent />
        </div>
      </div>
      <Category />
      <div className="create-event-section bg-light p-4 mt-5">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
              <i className="fas fa-calendar-plus fa-3x"></i>
            </Col>
            <Col xs={12} md={8} className="text-center text-md-left">
              <h3 className="mb-3">Create Your Next Event</h3>
              <CreateEventButton />
              {/* <Link to="/create-event">
                <Button
                  size="lg"
                  className="create-event-button"
                  style={{ backgroundColor: "#7848F4" }}
                >
                  <i className="fas fa-plus-circle mr-2"></i> Create an Event
                </Button>
              </Link> */}
            </Col>
          </Row>
        </Container>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12} md={4}>
                <img src={baneri1} alt="Event" className="img-fluid" />
              </Col>
              <Col xs={12} md={8}>
                <h5>{events[0]?.title}</h5>
                <p>Date and Time: {events[0]?.date}</p>
                <p>Location: {events[0]?.location}</p>
                <p>Description: Event Description</p>

                <Button
                  variant="primary"
                  onClick={() => alert("Booking confirmed")}
                  className="mr-2"
                >
                  Book Now
                </Button>
                <Button onClick={() => alert("Added to calendar")}>
                  Add to Calendar
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Carouseli;
