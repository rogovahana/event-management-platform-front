import React, { useEffect, useState } from 'react';
import { fetchEvents, deleteEvent } from '../services/eventService';
import './ManageEventsPage.css';
import Navbari from '../components/Navbar';

const ManageEventsPage: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch events', error);
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  const handleDelete = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter(event => event.id !== eventId));
      alert('Event deleted successfully');
    } catch (error) {
      console.error('Failed to delete event', error);
      alert('Failed to delete event');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
    <Navbari />
    <div className="container my-5">
      <h1 className="text-center mb-4">Manage Events</h1>
      {events.length === 0 ? (
        <p className="text-center">No events found</p>
      ) : (
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{event.description}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2" onClick={() => console.log('Edit', event.id)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(event.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default ManageEventsPage;
