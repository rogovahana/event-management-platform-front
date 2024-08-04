import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ticket1 from "../assets/logo/carousel/ticket1.jpg";
import ticket2 from "../assets/logo/carousel/ticket2.jpg";

import SearchEvent from "./SearchEvent/SearchEvent";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateEventButton from "./CreateEventButton";
import Category from "./Category/Category";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Carouseli() {
  const navigate = useNavigate();

  useEffect(() => {
      const hasShownNotification = localStorage.getItem("notificationShown");

      if (!hasShownNotification) {
        toast.info(
          <div onClick={() => navigate("/browse-events")} style={{ cursor: "pointer" }}>
            Check out our Events!
          </div>,
          {
            position: "bottom-right",
            autoClose: 5000,
          }
        );

        localStorage.setItem("notificationShown", "true");
      }
    }, [navigate]);

   
  return (
    <div>
      <ToastContainer /> {/* Container for toast notifications */}
      <div className="carousel-container position-relative">
        <Carousel interval={3000}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={ticket1}
              alt="ticket 1"
              style={{ maxHeight: "679px", objectFit: "cover" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={ticket2}
              alt="ticket2"
              style={{ maxHeight: "678px", objectFit: "cover" }}
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="search-event-section mt-4">
        <SearchEvent />
      </div>
      <Category />
      <div className="create-event-section
     p-4 mt-5">
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