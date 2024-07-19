import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "./EventsbyCategory.css";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
};

type DummyEvents = {
  [key: string]: Event[];
};

const dummyEvents: DummyEvents = {
  Technology: [
    {
      id: 1,
      title: "Tech Conference",
      date: "2024-08-01",
      time: "10:00 AM",
      location: "Tech Center",
      imageUrl: "/assets/tech-conference.jpg",
    },
  ],
  Nightlife: [
    {
      id: 2,
      title: "Nightclub Party",
      date: "2024-08-15",
      time: "9:00 PM",
      location: "City Club",
      imageUrl: "/assets/nightclub-party.jpg",
    },
  ],
  Music: [
    {
      id: 3,
      title: "Live Music Show",
      date: "2024-09-10",
      time: "8:00 PM",
      location: "Music Hall",
      imageUrl: "/assets/music-show.jpg",
    },
  ],
  Art: [
    {
      id: 4,
      title: "Art Exhibition",
      date: "2024-07-20",
      time: "11:00 AM",
      location: "Art Gallery",
      imageUrl: "/assets/art-exhibition.jpg",
    },
  ],
  Sport: [
    {
      id: 5,
      title: "Football Match",
      date: "2024-08-25",
      time: "5:00 PM",
      location: "Stadium",
      imageUrl: "/assets/football-match.jpg",
    },
  ],
};

const ITEMS_PER_PAGE = 3;

const CategoryEvents: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Uncommentinggg  to use API
    /*
    const fetchEvents = async (category: string) => {
      try {
        const response = await fetch(`/api/events?category=${category}`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        return response.json();
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    fetchEvents(category || "").then(data => setEvents(data));
    */

    // Using dummy data for testing
    const eventCategory = category as keyof DummyEvents;
    setEvents(dummyEvents[eventCategory] || []);
  }, [category]);

  const handleEventClick = (id: number) => {
    console.log(`Event ${id} clicked`);
  };

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const currentEvents = events.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
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
              src={event.imageUrl}
              alt={event.title}
              className="event-image"
            />
            <div className="card-content">
              <h3>{event.title}</h3>
              <p>
                {event.date} at {event.time}
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
  );
};

export default CategoryEvents;