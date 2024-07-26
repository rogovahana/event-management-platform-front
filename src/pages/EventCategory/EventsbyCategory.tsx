import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "./EventsbyCategory.css";
import Navbari from "../../components/Navbar";
import Footeri from "../../components/Footer";

type Event = {
  id: string;
  title: string;
  startDate: string;
  time: string;
  location: string;
  images: string;
};

const ITEMS_PER_PAGE = 3;

const categoryToIdMap: { [key: string]: number } = {
  Music: 1,
  Sports: 2,
  Arts: 3,
  Technology: 4,
  "Food & Drink": 5,
};

const CategoryEvents: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async (categoryId: number) => {
      try {
        const response = await fetch(`https://localhost:7136/api/Event/category/${categoryId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("Invalid data format", data);
          setEvents([]);
        }
      } catch (error) {
        console.error(error);
        setEvents([]);
      }
    };

    const categoryId = categoryToIdMap[category as string];
    if (categoryId !== undefined) {
      fetchEvents(categoryId);
    } else {
      console.error("Invalid category");
      setEvents([]);
    }
  }, [category]);

  const handleEventClick = (id: string) => {
    navigate(`/Event/${id}`); 
  };

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const currentEvents = events.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
    <Navbari/>
    <Container className="my-4">

      <h1>{category} Events</h1>
      <div className="events-container">
        {currentEvents.map((event) => (
          <div
            key={event.id}
            className="event-card"
            onClick={() => handleEventClick(event.id)}
          >
            <img
              src={event.images}
              alt={event.title}
              className="event-image"
            />
            <div className="card-content">
              <h3>{event.title}</h3>
              <p>
                Date: {event.startDate} at: {event.time}
              </p>
              <p>{event.location}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <Button
          className="btn"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            className={`btn ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          className="btn"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          &gt;
        </Button>
      </div>

    </Container>
  
    </>
    
  );

};

export default CategoryEvents;