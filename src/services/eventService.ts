const API_URL = 'https://localhost:7136/api/Event';

export const fetchEvents = async() => {
  try {
    const response = await fetch(`${API_URL}?pageNumber=${1}&pageSize=${20}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    const token = sessionStorage.getItem('accessToken');
    const response = await fetch(`${API_URL}/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    console.log(response);
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
  try {
    const token = sessionStorage.getItem('accessToken');
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
