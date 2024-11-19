import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DateSearch = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  // Fetch stored dates from localStorage when the component mounts
  useEffect(() => {
    const storedStartDate = localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("endDate");

    if (storedStartDate) {
      setStartDate(storedStartDate); // Set from localStorage
    }
    if (storedEndDate) {
      setEndDate(storedEndDate); // Set from localStorage
    }
  }, []);

  const handleSearch = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    // Save dates to localStorage as strings in YYYY-MM-DD format
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);

    // Navigate to the cars page
    navigate("/cars");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Search for Available Vehicles</h2>
        <p style={styles.subheading}>
          Select the start and end dates to find vehicles available during your
          specified time.
        </p>

        <div style={styles.form}>
          <label style={styles.label}>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]} // Restrict to today onwards
            style={styles.input}
          />
          <label style={styles.label}>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || new Date().toISOString().split("T")[0]} // Restrict to today or the selected start date
            style={styles.input}
          />

          <button onClick={handleSearch} style={styles.button}>
            Search Available Vehicles
          </button>
        </div>
      </div>
    </div>
  );
};

// Inline styles for the components
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    backgroundColor: "#f0f4f8",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    padding: "40px",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  subheading: {
    textAlign: "center",
    color: "#666",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    transition: "background-color 0.3s ease",
  },
};

export default DateSearch;