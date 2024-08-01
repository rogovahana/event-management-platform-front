const API_BASE_URL = 'https://localhost:7136';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': '-token', // add the tokeen neds
};

export const fetchReviews = async () => {
  const response = await fetch(`${API_BASE_URL}/Review`, {
    method: 'GET',
    headers,
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return await response.json();
};

export const fetchReviewsByEventId = async (eventId: number) => {
  const response = await fetch(`${API_BASE_URL}/Review?eventId=${eventId}`, {
    method: 'GET',
    headers,
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return await response.json();
};

export const postReview = async (review: { userId: number, eventId: number, rating: number, comment: string }) => {
  const response = await fetch(`${API_BASE_URL}/Review`, {
    method: 'POST',
    headers,
    body: JSON.stringify(review),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return await response.json();
};

export const updateReview = async (id: number, review: { rating: number, comment: string }) => {
  const response = await fetch(`${API_BASE_URL}/Review?id=${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(review),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return await response.json();
};

export const deleteReview = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/Review?id=${id}`, {
    method: 'DELETE',
    headers,
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return await response.json();
};

export const fetchReviewById = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/Review/${id}`, {
    method: 'GET',
    headers,
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return await response.json();
};
