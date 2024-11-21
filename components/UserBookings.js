import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddReview from './Review'; // Import the modal component

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewedBookings, setReviewedBookings] = useState([]); // Track reviewed booking IDs
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        // Fetch bookings
        const response = await axios.get(`http://localhost:8085/api/bookings/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data);

        // Fetch reviews
        const reviewsResponse = await axios.get(`http://localhost:8085/api/reviews/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const reviewedBookingIds = reviewsResponse.data.map((review) => review.booking.id);
        setReviewedBookings(reviewedBookingIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, []);

  const handleAddReviewClick = (vehicleId, bookingId) => {
    setSelectedVehicleId(vehicleId);
    setSelectedBookingId(bookingId);
    setModalOpen(true);
  };

  const handleModalClose = (success) => {
    setModalOpen(false);
    if (success) {
      const fetchReviews = async () => {
        try {
          const token = localStorage.getItem('token');
          const userId = localStorage.getItem('userId');

          const reviewsResponse = await axios.get(`http://localhost:8085/api/reviews/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const reviewedBookingIds = reviewsResponse.data.map((review) => review.booking.id);
          setReviewedBookings(reviewedBookingIds);
        } catch (error) {
          console.error('Error refreshing reviews:', error);
        }
      };

      fetchReviews();
    }
  };

  const handleCancelBooking = async (bookingId) => {
    // Native confirmation dialog instead of Swal
    const result = window.confirm("Are you sure you want to cancel this booking?");
    if (result) {
      try {
        const token = localStorage.getItem('token');

        // Cancel the booking
        await axios.put(`http://localhost:8085/api/bookings/cancel/${bookingId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Remove the canceled booking from the local state
        setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));

        // Optionally, fetch the updated list of bookings
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8085/api/bookings/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(response.data); // Update the state with the new list of bookings

        // Show a success message
        alert("Your booking has been successfully canceled.");
      } catch (error) {
        console.error('Error cancelling booking:', error);

        // Show an error message in case of failure
        alert("Something went wrong while canceling your booking. Please try again.");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (bookings.length === 0) {
    return <p>No bookings found.</p>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: 'auto', padding: '20px' }}>
      <h2>My Bookings</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {bookings.map((booking) => {
          // Only show the Cancel button for "CONFIRMED" bookings that are at least 1 day away
          const canCancel = booking.status === 'CONFIRMED' &&
            (new Date(booking.startDate) - new Date()) > 86400000;

          return (
            <div key={booking.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '20px',
            }}>
              <img
                src={booking.vehicle.imageUrl}
                alt={booking.vehicle.model}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '16px',
                }}
              />
              <h4>{booking.vehicle.model}</h4>
              <p>{booking.vehicle.manufacturingYear}</p>
              <p><strong>Start Date:</strong> {booking.startDate}</p>
              <p><strong>End Date:</strong> {booking.endDate}</p>
              <p><strong>Total Amount:</strong> ${booking.totalPrice}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <div>
                {canCancel && (
                  <button
                    style={{ backgroundColor: '#e57373', color: 'white', padding: '10px 20px', borderRadius: '5px', marginTop: '10px' }}
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </button>
                )}
                {booking.status === 'COMPLETED' && !reviewedBookings.includes(booking.id) && (
                  <button
                    style={{ backgroundColor: '#7e57c2', color: 'white', padding: '10px 20px', borderRadius: '5px', marginTop: '10px' }}
                    onClick={() => handleAddReviewClick(booking.vehicle.id, booking.id)}
                  >
                    Add Review
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedVehicleId && selectedBookingId && (
        <AddReview
          open={modalOpen}
          onClose={handleModalClose}
          vehicleId={selectedVehicleId}
          bookingId={selectedBookingId} // Pass bookingId to modal
        />
      )}
    </div>
  );
};

export default UserBookings;
