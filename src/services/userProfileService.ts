export interface Ticket {
  UserId: number;
  Type: string;
  TotalPrice: number;
  Quantity: number;
  CreatedAt: string;
}
  
export interface Event {
  Id: number;
  Title: string;
  StartDate: string;
  Attendees: number;
  AvailableTickets: number;
  Tickets: Ticket[];
}
  
export interface UserProfile {
  username: string;
  email: string;
  phoneNumber: string;
  events: Event[];
}
  
const API_BASE_URL = 'https://localhost:7136';
  
export const fetchUserProfile = async (): Promise<UserProfile> => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/userProfile`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();

};
  
export const updateUserProfile = async (formData: {
  username: string;
  email: string;
  phoneNumber: string;
}): Promise<UserProfile> => {
  const token = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/api/User`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

  