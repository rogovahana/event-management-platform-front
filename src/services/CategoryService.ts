export const fetchEvents = async (category: string) => {
  const response = await fetch(`/api/events?category=${category}`);
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json();
};
