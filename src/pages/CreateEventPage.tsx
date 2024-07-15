import React, { useState } from 'react';
import './CreateEventPage.css'; 
import Navbari from '../components/Navbar';

const CreateEventPage: React.FC = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName || !eventDate || !eventDescription) {
      alert('All fields are required');
      return;
    }

    const event = {
      name: eventName,
      date: eventDate,
      description: eventDescription,
      image: eventImage,
    };

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        alert('Event created successfully');
        setEventName('');
        setEventDate('');
        setEventDescription('');
        setEventImage(null);
      } else {
        alert('Failed to create event');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEventImage(e.target.files[0]);
    }
  };

  return (
    <>
    <Navbari />
    <div className="container my-5">
      <h1 className="text-center mb-4">Create Event</h1>
      <form onSubmit={handleSubmit} className="create-event-form">
        <div className="form-group mb-3">
          <label htmlFor="eventName">Event Name</label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="form-control"
            placeholder="Enter event name" 
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="eventDate">Event Date</label>
          <input
            type="date"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="form-control" 
          />
        </div>
        <h1 className="mb-4">Event Description</h1>
        <div className="form-group mb-3">
          <label htmlFor="eventImage">Event Image</label>
          <input
            type="file"
            id="eventImage"
            onChange={handleImageChange}
            className="form-control" 
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="eventDescription" className="event-description-label">Event Description</label>
          <textarea
            id="eventDescription"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="form-control"
            rows={5}
            placeholder="Enter event description"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Create Event</button>
      </form>
    </div>
    </>
  );
};

export default CreateEventPage;
