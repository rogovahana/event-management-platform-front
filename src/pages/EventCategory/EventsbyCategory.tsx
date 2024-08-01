import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "../EventCategory/EventsbyCategory.css";
import Navbari from "../../components/Navbar/Navbar";
import Footeri from "../../components/Footer/Footer";

// type for the event object
type Event = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  categoryId: number;
  availableTickets: number;
  cityId: number;
  attendees: number;
  images: {
    url: string;
  }[];
};

// Number of events to display per page
const ITEMS_PER_PAGE = 3;

const categoryToIdMap: { [key: string]: number } = {
  Music: 1,
  Sports: 2,
  Arts: 3,
  Technology: 4,
  "Food & Drink": 5,
};

const CategoryEvents: React.FC = () => {
  // category name from URL parameters
  const { category } = useParams<{ category: string }>();
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get the category ID from the category name
        const categoryId = categoryToIdMap[category as string];
        if (categoryId === undefined) {
          throw new Error("Invalid category");
        }

        const response = await fetch(
          `https://localhost:7136/api/Event/category/${categoryId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category]);

  const handleEventClick = (id: number) => {
    navigate(`/Event/${id}`);
  };
  // Calculate total number of pages for pagination
  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  // Get the events to display on the current page
  const currentEvents = events.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Navbari />
      <Container className="my-4">
        <h1>
          <span style={{ color: "#7848F4" }}>{category}</span> Events
        </h1>
        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="category-events-container">
            {currentEvents.map((event) => (
              <div
                key={event.id}
                className="category-event-card"
                onClick={() => handleEventClick(event.id)}
              >
                <img
                  src={
                    event.images.length > 0
                      ? event.images[0].url
                      : "placeholder.jpg"
                  }
                  alt={event.title}
                  className="category-event-image"
                />
                <div className="category-card-content">
                  <h3>{event.title}</h3>
                  <p>
                    Date: {new Date(event.startDate).toLocaleDateString()} at:{" "}
                    {new Date(event.startDate).toLocaleTimeString()}
                  </p>
                  <p>{event.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="category-pagination">
          <Button
            className="category-btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </Button>
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              className={`category-btn ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            className="category-btn"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            &gt;
          </Button>
        </div>
      </Container>
      <Footeri />
    </>
  );
};

export default CategoryEvents;