export const fetchEvents = async () => {
  const response = await fetch('https://localhost:7136/api/Event/upcomingEvents');
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  const data = await response.json();
  console.log('Fetched events:', data);
  return data;
};
