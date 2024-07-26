const API_BASE_URL = 'https://localhost:7136';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhDR2FTdVhWanlONkVVUUo2MFR2QSJ9.eyJodHRwczovL2V2ZW50bWFuYWdlbWVudC5jb20vcm9sZXMiOlsiT3JnYW5pemVyIl0sImlzcyI6Imh0dHBzOi8vZGV2LTBoM3U3am9vcnQzZ2YybGIudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY2OWQwN2QzZDBiMDNhMTVhOTg3NTcyMCIsImF1ZCI6WyJodHRwczovL2Rldi0waDN1N2pvb3J0M2dmMmxiLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kZXYtMGgzdTdqb29ydDNnZjJsYi51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzIxOTQ1NDAxLCJleHAiOjE3MjE5NTI2MDEsInNjb3BlIjoib3BlbmlkIiwiYXpwIjoiMnhqYm5SdXpGbWxrMlJVQmVHODlMVlNWYVdraE9vN0EifQ.iL7uyRnpFgXi4jVazao4I0PD7DY1BeU158FufFOxWXJzGyWlNHWhtokIDhso6VQI25XBZ6mMv3HgOLMaiAdIdseOmYCGLKIL0wqS6rlyUEbeZQ062MJYOzzXlzUXL96t1BEgaz98UE3Ufep-RCfxTt1_7_Z1Nj7WJjyv3iXoHRaZjENftpkb7_gFWCvs3tqqLyWj3FUnlX0-vDvWkY4-ZSeoUHAWKiMMsw3_SzvnvdFRoKrk6QmX4ulyiPVxVukbh1AOy-6KjzIUTO8qgsBMKQ9bAmDIrUyXphugJDPIeDr34152fElw-L0DFSgCGxhwjAyQYqvReKYBBZmjNICRmw', // replace 'your-jwt-token' with the actual token
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
