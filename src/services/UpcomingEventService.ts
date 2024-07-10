 export const fetchEvents = async () => {
   const response = await fetch('/api/events');
   if (!response.ok) {
     throw new Error('Failed to fetch events');
   }
   return response.json();
 };
