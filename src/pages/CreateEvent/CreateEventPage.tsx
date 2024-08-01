// needs to handle and for images 
import React, { useState } from 'react';
import './CreateEventPage.css';
import Navbari from '../../components/Navbar/Navbar';

const CreateEventPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [organizerUserId, setOrganizerUserId] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [cityId, setCityId] = useState<number>(0);
  const [ticketPrices, setTicketPrices] = useState<{ type: number; price: number }[]>([
    { type: 1, price: 0 }, // Normal Price
    { type: 2, price: 0 }  // VIP Price
  ]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    ticketPrices: '',
    imageFiles: '',
    submitError: '',
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    // Validate form inputs
    let isFormValid = true;
    const validationErrors = {
      title: title ? '' : 'Title is required',
      description: description ? '' : 'Description is required',
      startDate: startDate ? '' : 'Start Date is required',
      endDate: endDate ? '' : 'End Date is required',
      location: location ? '' : 'Location is required',
      ticketPrices: ticketPrices.some(ticket => ticket.price <= 0) ? 'Ticket prices must be positive' : '',
      imageFiles: imageFiles.length === 0 ? 'At least one image is required' : '',
      submitError: '', 
    };

    // Check if start date is before today
    const today = new Date().toISOString().split('T')[0];
    if (startDate && new Date(startDate) < new Date(today)) {
      validationErrors.startDate = 'Start Date cannot be in the past';
      isFormValid = false;
    }

    // Check if end date is before start date
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      validationErrors.endDate = 'End Date cannot be before Start Date';
      isFormValid = false;
    }

    isFormValid = Object.values(validationErrors).every(error => error === '');

    if (!isFormValid) {
      setSubmitting(false);
      setErrors(validationErrors);
      return;
    }

    // JSON data
    const eventData = {
      title,
      description,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      location,
      organizerUserId,
      categoryId,
      cityId,
      ticketPrices,
      
    };

    try {
      const token = 'TOKEN_HERE'; // Replace
      const response = await fetch('https://localhost:7136/api/Event', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        alert('Event created successfully');
        // Reset form fields
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setLocation('');
        setOrganizerUserId(0);
        setCategoryId(0);
        setCityId(0);
        setTicketPrices([{ type: 1, price: 0 }, { type: 2, price: 0 }]);
        setImageFiles([]); // Reset image files
      } else {
        const errorText = await response.text();
        setErrors({ ...validationErrors, submitError: `Failed to create event: ${errorText}` });
        console.error('Error response:', errorText);
      }
    } catch (error) {
      setErrors({ ...validationErrors, submitError: 'An error occurred. Please try again later.' });
      console.error('An error occurred:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbari />
      <div className="create-event-container my-5">
        <h1 className="text-center mb-4">Create Event</h1>
        <form onSubmit={handleFormSubmit} className="create-event-form">
          <div className="form-group mb-3">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              placeholder="Event Title"
              required
            />
            {errors.title && <p className="error-message">{errors.title}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              placeholder="Event Description"
              required
            />
            {errors.description && <p className="error-message">{errors.description}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="form-control"
              required
            />
            {errors.startDate && <p className="error-message">{errors.startDate}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="endDate">End Date</label>
            <input
              id="endDate"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="form-control"
              required
            />
            {errors.endDate && <p className="error-message">{errors.endDate}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              placeholder="Location"
              required
            />
            {errors.location && <p className="error-message">{errors.location}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(parseInt(e.target.value))}
              className="form-control"
              required
            >
              <option value="0">Select a category</option>
              <option value="1">Music</option>
              <option value="2">Sports</option>
              <option value="3">Arts</option>
              <option value="4">Technology</option>
              <option value="5">Food & Drink</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="city">City</label>
            <select
              id="city"
              value={cityId}
              onChange={(e) => setCityId(parseInt(e.target.value))}
              className="form-control"
              required
            >
              <option value="0">Select a city</option>
              <option value="1">New York City</option>
              <option value="2">Los Angeles</option>
              <option value="3">Chicago</option>
              <option value="4">Houston</option>
              <option value="5">Phoenix</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label>Ticket Prices</label>
            {ticketPrices.map((ticket, index) => (
              <div key={index} className="mb-2">
                <label>{ticket.type === 1 ? 'Normal Price' : 'VIP Price'}</label>
                <div className="input-group">
                  <input
                    type="number"
                    value={ticket.price}
                    onChange={(e) => {
                      const newPrice = parseFloat(e.target.value);
                      setTicketPrices(ticketPrices.map((t, i) =>
                        i === index ? { ...t, price: newPrice } : t
                      ));
                    }}
                    className="form-control"
                    min="0"
                  />
                  <span className="input-group-text">€</span>
                </div>
              </div>
            ))}
            {errors.ticketPrices && <p className="error-message">{errors.ticketPrices}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="imageFiles">Images</label>
            <input
              id="imageFiles"
              type="file"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  setImageFiles(Array.from(e.target.files));
                }
              }}
              className="form-control"
              accept="image/*"
              required
            />
            {errors.imageFiles && <p className="error-message">{errors.imageFiles}</p>}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Create Event'}
          </button>
          {errors.submitError && <p className="error-message mt-3">{errors.submitError}</p>}
        </form>
      </div>
    </>
  );
};

export default CreateEventPage;
