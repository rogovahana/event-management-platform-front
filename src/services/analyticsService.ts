import axios from 'axios';

const API_URL = 'backend api'; 


export const getEventAnalyticsForPeriod = async (period: 'Last30Days' | 'Last60Days' | 'Last90Days') => {
  const response = await axios.get(`${API_URL}/api/Analytics/${period}`);
  return response.data;
};


export const getEventAnalyticsForDateRange = async (startDate: string, endDate: string) => {
  const response = await axios.get(`${API_URL}/api/Analytics/${startDate}-${endDate}`);
  return response.data;
};

export const generateAnalyticsReport = async (daysOffset?: number, startDate?: string, endDate?: string) => {
  let url = `${API_URL}/api/Analytics/generate-raport`;

  if (daysOffset !== undefined) {
    url += `/${daysOffset}`;
  } else if (startDate && endDate) {
    url += `/custom-date/${startDate}-${endDate}`;
  } else {
    url += `/alltime`;
  }

  const response = await axios.get(url);
  return response.data;
};
