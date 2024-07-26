// testing
const API_URL = 'https://localhost:7136/api/Event';

export const fetchEvents = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    const response = await fetch(`${API_URL}/${eventId}`, {
      method: 'DELETE'
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
export const updateEvent = async (event: {
  title: any;
  description: any;
  startDate: any;
  endDate: any;
  location: any;
  latitude: any;
  longitude: any;
  organizerUserId: any;
  categoryId: any;
  cityId: any; 
  id: any; 
}) => {
  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhDR2FTdVhWanlONkVVUUo2MFR2QSJ9.eyJodHRwczovL2V2ZW50bWFuYWdlbWVudC5jb20vcm9sZXMiOlsiT3JnYW5pemVyIl0sImlzcyI6Imh0dHBzOi8vZGV2LTBoM3U3am9vcnQzZ2YybGIudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY2OWQwN2QzZDBiMDNhMTVhOTg3NTcyMCIsImF1ZCI6WyJodHRwczovL2Rldi0waDN1N2pvb3J0M2dmMmxiLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kZXYtMGgzdTdqb29ydDNnZjJsYi51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzIxOTEzNTE4LCJleHAiOjE3MjE5MjA3MTgsInNjb3BlIjoib3BlbmlkIiwiYXpwIjoiMnhqYm5SdXpGbWxrMlJVQmVHODlMVlNWYVdraE9vN0EifQ.iUZPvBX0ZgzGP4GYOv6jvEbrHKFPnlNaKbcDj2Eq4AmDGRGwtYbToUA3_6J0qomhceiQD-Gt6VdSnjbz4sKo-klhTqEmtHZo3Q2_6MlX_VabeED_y6ntgxTECZn1Z4cjx0amb2jaLvrMARIgUmKWJl5RTlQhI2GCnSdgHjeFBlay19sXtYIUXO5gBFv-oMqqL3R0XkGWmr7_tmeFoshMcGsCdqcElFMe_H4OONT5C6fd-peHx6lWXpaIZotJB0yqbcFA2mlgQ7ERuA_FFpx9kZP9U8byiFi27TVCwjq1AQfyUssn1cD-Bg0ZfkwtRx_rEdvpXg6ltMqwErdp9PwyLA'; 

  try {
    const response = await fetch(`${API_URL}/${event.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: event.title,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        location: event.location,
        latitude: event.latitude,
        longitude: event.longitude,
        organizerUserId: event.organizerUserId,
        categoryId: event.categoryId,
        cityId: event.cityId
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};