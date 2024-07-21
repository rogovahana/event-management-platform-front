// import React, { useEffect, useState } from 'react';
// import { AddToCalendarButton } from 'add-to-calendar-button-react';

// interface Event {
//   title: string;
//   startDate: string;
//   endDate: string;
//   startTime: string;
//   endTime: string;
//   location: string;
//   description: string;
// }

// const AddToCalendarComponent: React.FC = () => {
//   const [event, setEvent] = useState<Event | null>(null);

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const response = await fetch('https://localhost:7136/api/Event');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data: Event = await response.json();
//         setEvent(data);
//       } catch (error) {
//         console.error('Error fetching event:', error);
//       }
//     };

//     fetchEvent();
//   }, []);

//   if (!event) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AddToCalendarButton
//       title={event.title}
//       startDate={event.startDate}
//       endDate={event.endDate}
//       startTime={event.startTime}
//       endTime={event.endTime}
//       location={event.location}
//       description={event.description}
//       options={["Google"]}
//     />
//   );
// };

// export default AddToCalendarComponent;



import { AddToCalendarButton } from 'add-to-calendar-button-react';

const AddToCalendarComponent = () => {
  return (
    <AddToCalendarButton
      name="My Event"
      startDate="2024-08-01"
      endDate="2024-08-01"
      startTime="10:00"
      endTime="12:00"
      location="123 Main St, Anytown, USA"
      description="This is a description of my event."
      options={["Google"]}
    />
  );
};

export default AddToCalendarComponent;
