import React, { useState } from 'react';
import './CreateEventPage.css';
import Navbari from '../../components/Navbar/Navbar';

const CreateEventPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [categoryId, setCategoryId] = useState<number>(0); 
  const [cityId, setCityId] = useState<number>(0); 
  const [ticketPrices, setTicketPrices] = useState<{ type: number; price: number }[]>([
    { type: 1, price: 0 },
    { type: 2, price: 0 }
  ]);
  const [availableTickets, setAvailableTickets] = useState<number>(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    categoryId: '',
    cityId: '',
    availableTickets: '',
    ticketPrices: '',
    imageUrls: '',
    submitError: '',
  });

  const categories = [
    { id: 1, name: 'Music' },
    { id: 2, name: 'Sports' },
    { id: 3, name: 'Arts' },
    { id: 4, name: 'Technology' },
    { id: 5, name: 'Food & Drink' },
  ];

  const cities = [
    { id: 1, name: 'New York City' },
    { id: 2, name: 'Los Angeles' },
    { id: 3, name: 'Chicago' },
    { id: 4, name: 'Houston' },
    { id: 5, name: 'Phoenix' },
  ];

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    let isFormValid = true;
    const validationErrors = {
      title: title ? '' : 'Title is required',
      description: description ? '' : 'Description is required',
      startDate: startDate ? '' : 'Start Date is required',
      endDate: endDate ? '' : 'End Date is required',
      location: location ? '' : 'Location is required',
      categoryId: categoryId ? '' : 'Category is required',
      cityId: cityId ? '' : 'City is required',
      availableTickets: availableTickets > 0 ? '' : 'Available tickets must be greater than zero',
      ticketPrices: ticketPrices.some(ticket => ticket.price <= 0) ? 'Ticket prices must be positive' : '',
      imageUrls: imageUrls.length > 0 ? '' : 'At least one image URL is required',
    };

    isFormValid = Object.values(validationErrors).every(error => error === '');

    if (!isFormValid) {
      setSubmitting(false);
      return;
    }

    const eventPayload = {
      title,
      description,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      location,
      categoryId,
      cityId,
      availableTickets,
      ticketPrices,
      imageUrls,
    };

    try {
      const token = sessionStorage.getItem('accessToken');
      const response = await fetch('https://localhost:7136/api/Event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(eventPayload),
      });

      if (response.ok) {
        alert('Event created successfully');
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setLocation('');
        setCategoryId(0);
        setCityId(0);
        setAvailableTickets(0);
        setTicketPrices([{ type: 1, price: 0 }, { type: 2, price: 0 }]);
        setImageUrls([]);
      } else {
        const errorText = await response.text();
        setErrors({ ...errors, submitError: `Failed to create event: ${errorText}` });
      }
    } catch (error) {
      setErrors({ ...errors, submitError: 'An error occurred. Please try again later.' });
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
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              placeholder="Enter event title"
            />
            {errors.title && <p className="error-message">{errors.title}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="description" className="event-description-label">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              rows={5}
              placeholder="Enter event description"
            ></textarea>
            {errors.description && <p className="error-message">{errors.description}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="datetime-local"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="form-control"
            />
            {errors.startDate && <p className="error-message">{errors.startDate}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="endDate">End Date</label>
            <input
              type="datetime-local"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="form-control"
            />
            {errors.endDate && <p className="error-message">{errors.endDate}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              placeholder="Enter event location"
            />
            {errors.location && <p className="error-message">{errors.location}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="categoryId">Category</label>
            <select
              id="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(parseInt(e.target.value))}
              className="form-control"
            >
              <option value={0}>Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="error-message">{errors.categoryId}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="cityId">City</label>
            <select
              id="cityId"
              value={cityId}
              onChange={(e) => setCityId(parseInt(e.target.value))}
              className="form-control"
            >
              <option value={0}>Select a city</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
            {errors.cityId && <p className="error-message">{errors.cityId}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="availableTickets">Available Tickets</label>
            <input
              type="number"
              id="availableTickets"
              value={availableTickets}
              onChange={(e) => setAvailableTickets(parseInt(e.target.value))}
              className="form-control"
              placeholder="Enter available tickets"
            />
            {errors.availableTickets && <p className="error-message">{errors.availableTickets}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="normalTicketPrice">Normal Ticket Price (€)</label>
            <input
              type="number"
              id="normalTicketPrice"
              value={ticketPrices.find(ticket => ticket.type === 1)?.price || 0}
              onChange={(e) => setTicketPrices(ticketPrices.map(ticket => ticket.type === 1 ? { ...ticket, price: parseFloat(e.target.value) } : ticket))}
              className="form-control"
              placeholder="Enter normal ticket price"
            />
            {errors.ticketPrices && <p className="error-message">{errors.ticketPrices}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="vipTicketPrice">VIP Ticket Price  (€)</label>
            <input
              type="number"
              id="vipTicketPrice"
              value={ticketPrices.find(ticket => ticket.type === 2)?.price || 0}
              onChange={(e) => setTicketPrices(ticketPrices.map(ticket => ticket.type === 2 ? { ...ticket, price: parseFloat(e.target.value) } : ticket))}
              className="form-control"
              placeholder="Enter VIP ticket price"
            />
            {errors.ticketPrices && <p className="error-message">{errors.ticketPrices}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="imageUrls">Image URLs</label>
            <input
              type="text"
              id="imageUrls"
              value={imageUrls.join(', ')}
              onChange={(e) => setImageUrls(e.target.value.split(',').map(url => url.trim()))}
              className="form-control"
              placeholder="Enter image URLs"
            />
            {errors.imageUrls && <p className="error-message">{errors.imageUrls}</p>}
          </div>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Event'}
          </button>
          {errors.submitError && <p className="error-message">{errors.submitError}</p>}
        </form>
      </div>
    </>
  );
};

export default CreateEventPage;
