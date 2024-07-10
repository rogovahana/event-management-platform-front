export const fetchEvents = async (eventType: string, location: string, dateTime: string) => {
    const response = await fetch(`/api/events?eventType=${eventType}&location=${location}&dateTime=${dateTime}`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  };
  