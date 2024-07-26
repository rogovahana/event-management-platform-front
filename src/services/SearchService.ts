export const fetchEvents = async (filters: { searchText: string, cityId: string, categoryId: string }) => {
  const params = new URLSearchParams(filters).toString();
  const response = await fetch(`https://localhost:7136/api/Event/filter?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};
