import React, { useEffect, useState } from 'react';
import './map.css'
const LocationsList = () => {
  // State to store the list of locations
  const [locations, setLocations] = useState([]);

  // Fetch data from the backend on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:4000'); // Adjust with your backend URL
        if (response.ok) {
          const data = await response.json(); // Parse JSON response
          setLocations(data); // Store the data in the state
        } else {
          console.error('Failed to fetch locations');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchLocations();
  }, []); // Empty array ensures the effect runs only once on mount

  const handleLocationClick = (latitude, longitude) => {
    // Create the Google Maps URL using latitude and longitude
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    // Redirect the user to Google Maps
    window.open(url, '_blank'); // Opens in a new tab
  };

  return (
    <div>
      <h1>Locations List</h1>
      <ul>
        {locations.length === 0 ? (
          <li>Loading...</li>
        ) : (
          locations.map((location, index) => (
            <li key={index}>
              <button onClick={() => handleLocationClick(location.latitude, location.longitude)}>
                {location.name} (Lat: {location.latitude}, Lng: {location.longitude})
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default LocationsList;
