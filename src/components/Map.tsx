import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
}

interface GeocodedEvent extends Event {
  coordinates: [number, number];
}

interface MapProps {
  events: Event[]; // Array of events to display on the map
}

// Map component to render a map with markers for each event
const Map: React.FC<MapProps> = ({ events }) => {
  const [geocodedEvents, setGeocodedEvents] = useState<GeocodedEvent[]>([]);
  const defaultCenter: [number, number] = [51.505, -0.09];
  const zoomLevel = 10;

  useEffect(() => {
    const geocodeEvents = async () => {
      const geocodedEventsPromises = events.map(async (event) => {
        const coordinates = await geocodeLocation(event.location);
        return { ...event, coordinates };
      });
      // Wait for all geocoding requests to complete
      const geocodedEvents = await Promise.all(geocodedEventsPromises);
      setGeocodedEvents(geocodedEvents);
    };

    geocodeEvents();
  }, [events]);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={zoomLevel}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geocodedEvents.map((event) => (
        <Marker key={event.id} position={event.coordinates}>
          <Popup>
            <strong>{event.title}</strong>
            <br />
            {event.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

// Function to geocode a location string into coordinates
const geocodeLocation = async (location: string): Promise<[number, number]> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}`
    );
    const data = await response.json();
    // Check if any results are returned
    if (data.length > 0) {
      const { lat, lon } = data[0];

      return [parseFloat(lat), parseFloat(lon)];
    } else {
      return [0, 0]; // Default coordinates in case of no results
    }
  } catch (error) {
    console.error("Error geocoding location:", error);
    return [0, 0]; // Default coordinates in case of an error
  }
};

export default Map;
