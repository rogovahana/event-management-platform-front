import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import baneri1 from "../assets/logo/carousel/baner1.jpg";
import "./UpcomingEvents.css";

function UpcomingEvents() {
  const [events /*, setEvents */] = useState([
    {
      id: 1,
      title:
        "BestSelller Book Bootcamp -write, Market & Publish Your Book -Lucknow",
      text: "Saturday, March 18, 9.30PM",
      imgSrc: baneri1,
    },
    {
      id: 2,
      title:
        "BestSelller Book Bootcamp -write, Market & Publish Your Book -Lucknow",
      text: "Saturday, March 18, 9.30PM",
      imgSrc: baneri1,
    },
    {
      id: 3,
      title:
        "BestSelller Book Bootcamp -write, Market & Publish Your Book -Lucknow",
      text: "Saturday, March 18, 9.30PM",
      imgSrc: baneri1,
    },
    {
      id: 4,
      title:
        "BestSelller Book Bootcamp -write, Market & Publish Your Book -Lucknow",
      text: "Saturday, March 18, 9.30PM",
      imgSrc: baneri1,
    },
  ]);

  const loadMoreEvents = () => {
    // Future implementation: Load more events from API????
    // fetch('/api/events?offset=' + events.length)
    //   .then(response => response.json())
    //   .then(newEvents => setEvents([...events, ...newEvents]))
    //   .catch(error => console.error('Error loading more events:', error));
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">
        <span>Upcoming </span>
        <span style={{ color: "orange" }}>Events</span>
      </h2>
      <Row>
        {events.map((event) => (
          <Col key={event.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <div className="card-container">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={event.imgSrc} />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>{event.text}</Card.Text>
                  <Button variant="warning">Go somewhere</Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Button variant="warning" onClick={loadMoreEvents}>
          Load More
        </Button>
      </div>
    </Container>
  );
}

export default UpcomingEvents;
