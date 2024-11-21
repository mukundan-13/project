import React, { useState } from 'react';
import axios from 'axios';

const AddReviewModal = ({ open, onClose, vehicleId, bookingId }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!comment || !rating) {
        setErrorMessage('Both comment and rating are required.');
        return;
      }

      const payload = {
        user: { id: userId }, // Match the backend model
        vehicle: { id: vehicleId }, // Match the backend model
        comment,
        rating: parseInt(rating, 10), // Ensure rating is sent as a number
        booking: { id: bookingId }
      };

      await axios.post(
        `http://localhost:8080/api/reviews`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccessMessage('Your review has been successfully added!');
      onClose(true); // Signal success to parent component
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to submit review. Please try again.');
      console.error('Error submitting review:', error);
      onClose(true);
    }
  };

  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Add Your Review</h2>
        <textarea
          style={styles.textarea}
          placeholder="Write your comment here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <input
          style={styles.input}
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
        {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
        <div style={styles.actions}>
          <button style={styles.button} onClick={() => onClose(false)}>
            Cancel
          </button>
          <button style={styles.button} onClick={handleSubmit}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    fontSize: '14px',
    minHeight: '100px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    fontSize: '14px',
  },
  button: {
    padding: '10px 20px',
    margin: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  successMessage: {
    color: 'green',
    marginTop: '10px',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
  },
};

export default AddReviewModal;
