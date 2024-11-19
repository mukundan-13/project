import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingSummary = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/bookings/${bookingId}`);
        setBooking(response.data);

        // Fetch vehicle details using the vehicle ID from booking
        const vehicleResponse = await axios.get(`http://localhost:8085/api/vehicles/${response.data.vehicle.id}`);
        setVehicle(vehicleResponse.data);
      } catch (error) {
        console.error('Error fetching booking or vehicle details:', error);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (!booking || !vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-summary">
      <h2>Booking Summary</h2>

      {/* Vehicle Details */}
      <div className="vehicle-details">
        <img
          src={vehicle.imageUrl || '/placeholder.jpg'}
          alt={vehicle.model || 'Vehicle Image'}
          className="vehicle-image"
        />
        <div className="vehicle-info">
          <h3>{vehicle.model}</h3>
          <p><strong>Manufacture Year:</strong> {vehicle.manufacturingYear}</p>
          <p><strong>Company Name:</strong> {vehicle.companyName}</p>
        </div>
      </div>

      {/* Booking Dates */}
      <div className="booking-dates">
        <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
        <p><strong>Total Amount:</strong> ${booking.totalPrice}</p>
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button onClick={() => navigate('/myBookings')} className="my-bookings-btn">Go to My Bookings</button>
      </div>
    </div>
  );
};

export default BookingSummary;