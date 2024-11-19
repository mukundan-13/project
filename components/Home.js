import React from 'react';
import image1 from './images/car.jpg'; // Adjust the path as necessary

import './style.css'; // Import your CSS file for styling

function Home() {
  return (
    <div className="home">
      <h1>Welcome to RentWheelZ</h1>
      <div className="image-container">
        <img src={image1} alt="Description 1" />
      </div>
    </div>
  );
}

export default Home;
