import Carousel from "react-bootstrap/Carousel";
import baneri1 from "../assets/logo/carousel/baner1.jpg";
import SearchEvent from "./SearchEvent";
import { Container, Row, Col, Button } from "react-bootstrap";

function Carouseli() {
  return (
    <div>
      <div className="carousel-container position-relative">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={baneri1} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={baneri1} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={baneri1} alt="Third slide" />
          </Carousel.Item>
        </Carousel>
        <div className="d-none d-md-block position-absolute bottom-0 start-50 translate-middle-x w-100">
          <SearchEvent />
        </div>
      </div>
      <div className="d-md-none">
        <SearchEvent />
      </div>
      <div className="create-event-section bg-light p-4 mt-5">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
              <i className="fas fa-calendar-plus fa-3x text-primary"></i>
            </Col>
            <Col xs={12} md={8} className="text-center text-md-left">
              <h3 className="mb-3">Create Your Next Event</h3>
              <Button
                variant="warning"
                size="lg"
                className="create-event-button"
              >
                <i className="fas fa-plus-circle mr-2"></i> Create an Event
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Carouseli;
