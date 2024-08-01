export interface PopularEvent {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    categoryId: number;
    availableTickets: number;
    cityId: number;
    attendees: number;
    images: { url: string }[];
  }
  
  export const fetchPopularEvents = async (): Promise<PopularEvent[]> => {
    const response = await fetch('https://localhost:7136/api/Event/popularEvents');
    if (!response.ok) {
      throw new Error('Failed to Load popular events');
    }
    return await response.json();
  };
  