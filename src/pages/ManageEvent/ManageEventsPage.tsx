import React, { useEffect, useState } from 'react';
import { fetchEvents, deleteEvent, updateEvent } from '../../services/eventService';
import './ManageEventsPage.css';
import Navbari from '../../components/Navbar/Navbar';

const ManageEventsPage: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<any>(null);

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

  const handleEdit = (event: any) => {
    setEditingEvent(event);
  };

  const handleUpdate = async (updatedEvent: any) => {
    try {
      await updateEvent(updatedEvent);
      setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
      setEditingEvent(null);
      alert('Event updated successfully');
    } catch (error) {
      console.error('Failed to update event', error);
      alert('Failed to update event');
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
        {editingEvent ? (
          <EventForm event={editingEvent} onSubmit={handleUpdate} onCancel={() => setEditingEvent(null)} />
        ) : (
          <>
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
                        <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(event)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(event.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </>
  );
};

const EventForm: React.FC<{ event: any, onSubmit: (event: any) => void, onCancel: () => void }> = ({ event, onSubmit, onCancel }) => {
  const [name, setName] = useState(event.name);
  const [date, setDate] = useState(event.date);
  const [description, setDescription] = useState(event.description);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ ...event, name, date, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="eventName">Event Name</label>
        <input
          type="text"
          id="eventName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder="Enter event name"
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="eventDate">Event Date</label>
        <input
          type="date"
          id="eventDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="eventDescription">Event Description</label>
        <textarea
          id="eventDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          rows={5}
          placeholder="Enter event description"
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary btn-block">Save</button>
      <button type="button" className="btn btn-secondary btn-block" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default ManageEventsPage;
