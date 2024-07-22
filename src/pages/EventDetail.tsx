import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Navbari from "../components/Navbar";
import Footer from "../components/Footer";
import AddToCalendarComponent from "../components/AddtoCalendarButton";
import Review from "../components/Review";

delete (L.Icon.Default.prototype as any)._getIconUrl;
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import StarRatings from "react-star-ratings";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface EventDetails {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  categoryId: number;
  cityId: number;
  attendees: number;
  images: { imageUrl: string }[];
}

interface Review {
  userId: number;
  eventId: number;
  rating: number;
  comment: string;
}

const EventDetails: React.FC = () => {
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Dummy event data
    const dummyEvent: EventDetails = {
      title: "Sample Event",
      description: "This is a description of the sample event.",
      startDate: "2024-07-21T22:15:05.908Z",
      endDate: "2024-07-21T22:15:05.908Z",
      location: "123 Sample Street, Sample City",
      categoryId: 1,
      cityId: 1,
      attendees: 150,
      images: [
        {
          imageUrl: "https://via.placeholder.com/800x400.png?text=Event+Image",
        },
      ],
    };
    setEvent(dummyEvent);
  }, []);

  const handleClose = () => setShowModal(false);
  const handleSignupClose = () => setShowSignupModal(false);
  const handleSignupShow = () => setShowSignupModal(true);

  const handleReviewSubmit = (review: Review) => {
    setReviews([...reviews, review]);
  };

  const shareUrl = window.location.href;

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbari />
      <Container fluid className="px-5">
        <Button variant="primary" href="/">
          &lt; Back
        </Button>
        <Card className="my-4">
          <Row noGutters>
            <Col md={8}>
              <Card.Img
                src={event.images[0].imageUrl}
                alt="Event Image"
                className="img-fluid"
              />
            </Col>
            <Col md={4}>
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <h5>Date & Time</h5>
                <p>
                  <FaCalendarAlt />{" "}
                  {new Date(event.startDate).toLocaleDateString()} -{" "}
                  {new Date(event.endDate).toLocaleDateString()} <br />
                  <FaMapMarkerAlt /> {event.location}
                </p>
                <Button variant="primary" onClick={handleSignupShow}>
                  Book Now
                </Button>
                <AddToCalendarComponent />
              </Card.Body>
            </Col>
          </Row>
        </Card>

        <Row>
          <Col md={8}>
            <Card className="my-4">
              <Card.Body>
                <h5 style={{ color: "#7848F4" }}>Description</h5>
                <p>{event.description}</p>
                <hr />
                <h5 style={{ color: "#7848F4" }}>Attendees</h5>
                <p>{event.attendees}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="my-4">
              <Card.Body>
                <h5>
                  <FaMapMarkerAlt /> Event Location
                </h5>

                <MapContainer
                  // lng lat or city?
                  center={[51.505, -0.09]}
                  zoom={15}
                  style={{ height: "400px", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {/* <Marker position={[event.lat, event.lng]}> */}
                  <Marker position={[51.505, -0.09]}>
                    <Popup>{event.location}</Popup>
                  </Marker>
                </MapContainer>
                <hr />
                <h5>Share on Social Media</h5>
                <p>
                  <FacebookShareButton url={shareUrl} title={event.title}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={event.title}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <WhatsappShareButton url={shareUrl} title={event.title}>
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Review Section */}
        <Review eventId={0} userId={0} onReviewSubmit={handleReviewSubmit} />

        <Card className="my-4">
          <Card.Body>
            <h5>Reviews</h5>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index}>
                  <StarRatings
                    rating={review.rating}
                    starRatedColor="#7848F4"
                    numberOfStars={5}
                    name="rating"
                  />
                  <p>{review.comment}</p>
                  <hr />
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </Card.Body>
        </Card>

        {/* Event Details Modal */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{event.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Date & Time </h5>
            <p>
              <FaCalendarAlt /> {new Date(event.startDate).toLocaleDateString()}{" "}
              - {new Date(event.endDate).toLocaleDateString()}
            </p>
            <h5>Location</h5>
            <p>
              <FaMapMarkerAlt /> {event.location}
            </p>
          </Modal.Body>
        </Modal>
        <Modal show={showSignupModal} onHide={handleSignupClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Already a member? <a href="/login">Log in</a>
            </p>
          </Modal.Body>
        </Modal>
      </Container>
      <Footer />
    </>
  );
};
export default EventDetails;
