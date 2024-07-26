import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
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
import Category from "./Category";

type Event = {
  title: string;
  location: string;
  date: string;
};

function Carouseli() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
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
  return (
    <div>
      <ToastContainer />

      <div className="carousel-container position-relative">
        <Carousel>
        {events.map((_event, index) => (
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
 
       
      </div>
      <div className="search-event-section mt-4">
        <SearchEvent />
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
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Carouseli;
