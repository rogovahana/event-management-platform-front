export interface RecommendedEvent {
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
    images: {
        url: string;
    }[];
}

export const fetchRecommendedEvents = async (): Promise<RecommendedEvent[]> => {
    try {
        const response = await fetch('https://localhost:7136/api/Recommendation');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: RecommendedEvent[] = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch recommended events:', error);
        throw error;
    }
};
