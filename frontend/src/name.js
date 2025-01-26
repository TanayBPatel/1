import React, { useState, useEffect } from 'react';
import './name.css'
const PostUserDataForm = () => {
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    latitude: '',
    longitude: '',
  });
//   const [a,seta]=useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      (error) => {
        console.error('Error fetching location:', error);
        alert('Failed to get location. Please allow location access.');
      }
    );
  }, []);

  // Update formData when lat or long changes
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      latitude: lat,
      longitude: long,
    }));
  }, [lat, long]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Dynamically update the state based on input name
    });
  };
//   console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await fetch('https://backendkumbh.onrender.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send all form data as JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        alert('Data submitted successfully!');
      } else {
        console.error('Error:', response.statusText);
        alert('Failed to submit data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Submit Your Information</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <p>Latitude: {lat || 'Fetching...'}</p>
        <p>Longitude: {long || 'Fetching...'}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostUserDataForm;
