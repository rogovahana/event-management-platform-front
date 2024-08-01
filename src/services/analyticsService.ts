import axios from 'axios';

const API_URL = 'backend api';

export const getEventAnalytics = async (eventId: string) => {
  const response = await axios.get(`${API_URL}/event/${eventId}/analytics`);
  return response.data;
};