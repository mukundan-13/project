import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingConfirmation from './BookingConfirmation';

const VehicleCard = ({ vehicle }) => {
  const [isConfirming, setIsConfirming] = useState(false); // State for showing booking confirmation
  const [startDate, setStartDate] = useState(null); // Track start date
  const [endDate, setEndDate] = useState(null); // Track end date
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') !== null);
  const navigate = useNavigate();

  const handleBooking = () => {
    if (!isAuthenticated) {
     
      const proceed = window.confirm('You are not logged in. Would you like to log in now?');
      if (proceed) {
        navigate('/login'); // Redirect to login page
      }
    } else {
      // Simulating date selection for demo purposes
      const defaultStartDate = new Date().toISOString().split('T')[0];
      const defaultEndDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      setStartDate(defaultStartDate);
      setEndDate(defaultEndDate);
      setIsConfirming(true); // Open Booking Confirmation
    }
  };

  const handleCancelConfirmation = () => {
    setIsConfirming(false); // Close Booking Confirmation
  };

  const handleProceedToPayment = (totalAmount) => {
    setIsConfirming(false); // Close Booking Confirmation
    navigate('/payment', { state: { totalAmount, vehicleId: vehicle.id } }); // Pass totalAmount and vehicleId to PaymentPage
  };

  return (
    <>
      <div className="m-4 flex flex-col" style={{ border: '1px solid #ddd', borderRadius: '8px', boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.1)' }}>
        <img
          src={vehicle.imageUrl}
          alt={`${vehicle.companyName} ${vehicle.model}`}
          style={{
            width: '100%',
            height: '60%',
            objectFit: 'cover',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}
        />
        <div className="w-full h-[40%] p-4">
          <h5>{vehicle.companyName}</h5>
          <h6>{vehicle.model}</h6>
          <p>Manufacturing Year: {vehicle.manufacturingYear}</p>
          <p>Number Plate: {vehicle.numberPlate}</p>
          <p>Capacity: {vehicle.capacity}</p>
          <p>Price/Day: ${vehicle.pricePerDay}</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginRight: '8px' }}>Rating:</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span>{vehicle.rating}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={handleBooking}
          >
            Book
          </button>
        </div>
      </div>

      {/* Render Booking Confirmation Dialog */}
      {isConfirming && (
        <BookingConfirmation
          vehicle={vehicle}
          startDate={startDate}
          endDate={endDate}
          onCancel={handleCancelConfirmation}
          onProceed={handleProceedToPayment}
        />
      )}
    </>
  );
};

export default VehicleCard;