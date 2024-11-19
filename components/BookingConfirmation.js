import React from "react";

const BookingConfirmation = ({
  vehicle,
  startDate,
  endDate,
  onCancel,
  onProceed,
}) => {
  const calculateTotalAmount = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const numberOfDays = (end - start) / (1000 * 3600 * 24) + 1; // Include end date
    return vehicle.pricePerDay * numberOfDays;
  };

  const totalAmount = calculateTotalAmount();

  return (
    <div className="booking-confirmation">
      <h2>Booking Confirmation</h2>

      {/* Vehicle Details */}
      <div className="vehicle-details">
        <h3>Vehicle Details</h3>
        <p><strong>Company Name:</strong> {vehicle.companyName}</p>
        <p><strong>Model:</strong> {vehicle.model}</p>
        <p><strong>Capacity:</strong> {vehicle.capacity} passengers</p>
        <p><strong>Per Day Price:</strong> ${vehicle.pricePerDay}</p>
      </div>

      {/* Booking Dates */}
      <div className="booking-dates">
        <h3>Booking Dates</h3>
        <p><strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}</p>
      </div>

      {/* Total Amount */}
      <div className="total-amount">
        <h3>Total Amount</h3>
        <p><strong>${totalAmount}</strong></p>
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button onClick={onCancel} className="cancel-btn">Cancel</button>
        <button onClick={() => onProceed(totalAmount)} className="proceed-btn">Proceed to Payment</button>
      </div>
    </div>
  );
};

export default BookingConfirmation;