import React, { useState } from 'react';
import './CreateEventPage.css';
import Navbari from '../components/Navbar';

const CreateEventPage: React.FC = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [eventNameError, setEventNameError] = useState('');
  const [eventDateError, setEventDateError] = useState('');
  const [eventDescriptionError, setEventDescriptionError] = useState('');
  const [eventImageError, setEventImageError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    let isFormValid = true;

    if (!eventName.trim()) {
      setEventNameError('Event name is required!');
      isFormValid = false;
    } else {
      setEventNameError('');
    }

    if (!eventDate.trim()) {
      setEventDateError('Event date is required!');
      isFormValid = false;
    } else {
      setEventDateError('');
    }

    if (!eventDescription.trim()) {
      setEventDescriptionError('Event description is required!');
      isFormValid = false;
    } else {
      setEventDescriptionError('');
    }

    if (!eventImage) {
      setEventImageError('Event image is required!');
      isFormValid = false;
    } else {
      setEventImageError('');
    }

    if (!isFormValid) {
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', eventName);
    formData.append('date', eventDate);
    formData.append('description', eventDescription);
    if (eventImage) {
      formData.append('image', eventImage);
    }

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        body: formData,
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
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEventImage(e.target.files[0]);
      setEventImageError(''); 
    }
  };

  return (
    <>
      <Navbari />
      <div className="create-event-container my-5">
        <h1 className="text-center mb-4">Create Event</h1>
        <form onSubmit={handleFormSubmit} className="create-event-form">
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
            {eventNameError && <p className="error-message">{eventNameError}</p>}
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
            {eventDateError && <p className="error-message">{eventDateError}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="eventImage">Event Image</label>
            <input
              type="file"
              id="eventImage"
              onChange={handleImageChange}
              className="form-control"
            />
            {eventImageError && <p className="error-message">{eventImageError}</p>}
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
            {eventDescriptionError && <p className="error-message">{eventDescriptionError}</p>}
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Creating Event...' : 'Create Event'}
          </button>
          {submitError && <p className="error-message">{submitError}</p>}
        </form>
      </div>
    </>
  );
};

export default CreateEventPage;
