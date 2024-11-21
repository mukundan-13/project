import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const location = useLocation();
  const { totalAmount, vehicleId } = location.state || {};

  const [paymentOption, setPaymentOption] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const navigate = useNavigate();

  const handleConfirmPayment = async () => {
    if (paymentOption === 'card' && (!cardNumber || !expiryDate || !cvv)) {
      alert('Please fill in all card details.');
      return;
    }

    if (paymentOption === 'upi' && !upiId) {
      alert('Please provide your UPI ID.');
      return;
    }

    try {
      // Simulate payment processing
      alert('Processing Payment... Please wait');

      // After successful payment, create a booking
      const userId = localStorage.getItem('userId');
      const startDate = localStorage.getItem('startDate');
      const endDate = localStorage.getItem('endDate');
      
      const bookingData = {
        vehicle: { id: vehicleId },
        user: { id: userId },
        startDate,
        endDate,
        totalPrice: totalAmount,
        status: 'CONFIRMED',
      };

      const token = localStorage.getItem('token');
    
      const response = await axios.post('http://localhost:8085/api/bookings', bookingData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to create booking');
      }
    
      const booking = response.data; // Retrieve the booking object with the generated ID

      alert(`Payment Successful! Your payment of $${totalAmount} has been processed.`);
      navigate(`/booking-summary/${booking.id}`); // Pass the booking ID to the summary page
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleCancelPayment = () => {
    const confirmCancel = window.confirm('Are you sure you want to cancel the payment?');
    if (confirmCancel) {
      navigate('/');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2>Payment</h2>
      <p>Total Amount: <strong>${totalAmount}</strong></p>

      <div>
        <h3>Select Payment Option</h3>
        <input 
          type="radio" 
          id="card" 
          name="paymentOption" 
          value="card" 
          checked={paymentOption === 'card'} 
          onChange={(e) => setPaymentOption(e.target.value)} 
        />
        <label htmlFor="card">Credit/Debit Card</label>

        <input 
          type="radio" 
          id="upi" 
          name="paymentOption" 
          value="upi" 
          checked={paymentOption === 'upi'} 
          onChange={(e) => setPaymentOption(e.target.value)} 
        />
        <label htmlFor="upi">UPI</label>
      </div>

      {paymentOption === 'card' && (
        <div style={{ marginTop: '20px' }}>
          <input 
            type="text" 
            value={cardNumber} 
            onChange={(e) => setCardNumber(e.target.value)} 
            placeholder="Card Number" 
            maxLength="16" 
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }} 
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              value={expiryDate} 
              onChange={(e) => setExpiryDate(e.target.value)} 
              placeholder="Expiry Date (MM/YY)" 
              style={{ flex: 1, padding: '10px' }} 
            />
            <input 
              type="password" 
              value={cvv} 
              onChange={(e) => setCvv(e.target.value)} 
              placeholder="CVV" 
              maxLength="3" 
              style={{ flex: 1, padding: '10px' }} 
            />
          </div>
        </div>
      )}

      {paymentOption === 'upi' && (
        <div style={{ marginTop: '20px' }}>
          <input 
            type="text" 
            value={upiId} 
            onChange={(e) => setUpiId(e.target.value)} 
            placeholder="UPI ID" 
            style={{ width: '100%', padding: '10px' }} 
          />
        </div>
      )}

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handleCancelPayment} style={{ padding: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>
          Cancel
        </button>
        <button 
          onClick={handleConfirmPayment} 
          style={{ padding: '10px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px' }} 
          disabled={!paymentOption}
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
