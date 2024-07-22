import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  location: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
}

interface MapProps {
  events: Event[];
}

const Map: React.FC<MapProps> = ({ events }) => {
  const defaultCenter: [number, number] = [51.505, -0.09];
  const zoomLevel = 10;

  return (
    <MapContainer
      center={defaultCenter}
      zoom={zoomLevel}
      style={{ height: '300px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {events.map(event => (
        <Marker
          key={event.id}
          position={[event.latitude, event.longitude]}
        >
          <Popup>
            <strong>{event.title}</strong><br />
            {event.date} at {event.time}<br />
            {event.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;