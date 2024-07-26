import React, { useState } from 'react';
import './CreateEventPage.css';
import Navbari from '../../components/Navbar';

const CreateEventPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [organizerUserId, setOrganizerUserId] = useState<number>(0); 
  const [categoryId, setCategoryId] = useState<number>(0); 
  const [cityId, setCityId] = useState<number>(0); 
  const [ticketPrices, setTicketPrices] = useState<{ type: number; price: number }[]>([
    { type: 1, price: 0 },
    { type: 2, price: 0 }
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    latitude: '',
    longitude: '',
    ticketPrices: '',
    submitError: '',
  });

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
      latitude: latitude !== undefined ? '' : 'Latitude is required',
      longitude: longitude !== undefined ? '' : 'Longitude is required',
      ticketPrices: ticketPrices.some(ticket => ticket.price <= 0) ? 'Ticket prices must be positive' : '',
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
      latitude,
      longitude,
      organizerUserId,
      categoryId,
      cityId,
      ticketPrices,
    };

    try {
     const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhDR2FTdVhWanlONkVVUUo2MFR2QSJ9.eyJodHRwczovL2V2ZW50bWFuYWdlbWVudC5jb20vcm9sZXMiOlsiT3JnYW5pemVyIl0sImlzcyI6Imh0dHBzOi8vZGV2LTBoM3U3am9vcnQzZ2YybGIudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY2OTJiOWZhY2VhODc5MjY2MzkyYjFhNyIsImF1ZCI6WyJodHRwczovL2Rldi0waDN1N2pvb3J0M2dmMmxiLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kZXYtMGgzdTdqb29ydDNnZjJsYi51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzIxNzcwNzIzLCJleHAiOjE3MjE3Nzc5MjMsInNjb3BlIjoib3BlbmlkIiwiYXpwIjoiMnhqYm5SdXpGbWxrMlJVQmVHODlMVlNWYVdraE9vN0EifQ.QGZjuGoB2QsvqoF-9qvZnuMxaj-lQC3W3biaXx-hwMB68R2-pWjg4UHMAwu9aaOfvttYLPKwlkv2teu5sv_Pyo5XHfMPybaGA2IRI9C_BA1bsV6m4eq25ekYz_L_rp3HEevx34PRPTbiki2nZns7UAVZekarEkpzxeCx03EhchNE57QJUts1EZYm8NVPeDql-zASfmS6SgosskQrsNMF_gXl6dr6_KeCKJ5HXSoTc4ORsfP5S9UhOV6EMyJTBGalD4C6er01Jzpn3huv4OkMnE-GcwvXUtu_i_lLrzZ6oPCyCQXZ6dY-tNxFl_eic2KKn-bUAABJlvllx6Zzgawk3Q';
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
        setLatitude(0);
        setLongitude(0);
        setOrganizerUserId(0);
        setCategoryId(0);
        setCityId(0);
        setTicketPrices([{ type: 1, price: 0 }, { type: 2, price: 0 }]);
      } else {
        const errorText = await response.text();
        setErrors({ ...errors, submitError: `Failed to create event: ${errorText}` });
        console.error('Error response:', errorText);
      }
    } catch (error) {
      setErrors({ ...errors, submitError: 'An error occurred. Please try again later.' });
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
            <label htmlFor="latitude">Latitude</label>
            <input
              type="number"
              id="latitude"
              value={latitude}
              onChange={(e) => setLatitude(parseFloat(e.target.value))}
              className="form-control"
              placeholder="Enter latitude"
            />
            {errors.latitude && <p className="error-message">{errors.latitude}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="longitude">Longitude</label>
            <input
              type="number"
              id="longitude"
              value={longitude}
              onChange={(e) => setLongitude(parseFloat(e.target.value))}
              className="form-control"
              placeholder="Enter longitude"
            />
            {errors.longitude && <p className="error-message">{errors.longitude}</p>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="normalTicketPrice">Normal Ticket Price</label>
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
            <label htmlFor="vipTicketPrice">VIP Ticket Price</label>
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
          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Creating Event...' : 'Create Event'}
          </button>
          {errors.submitError && <p className="error-message">{errors.submitError}</p>}
        </form>
      </div>
    </>
  );
};

export default CreateEventPage;

