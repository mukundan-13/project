import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState('');  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [role] = useState('CUSTOMER'); 
    const [error, setError] = useState('');

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            await axios.post('http://localhost:8085/api/auth/register', { 
                firstName, 
                lastName,  
                email,
                password,
                phoneNumber,
                address,
                role,
            });

            // Success message using window.alert()
            alert('Signed up successfully!');
            
            setTimeout(() => navigate('/login'), 100); 

            // Reset the form fields
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setPhoneNumber('');
            setAddress('');
            setError('');
        } catch (error) {
            console.error(error);

            // Error message using window.alert()
            alert('Error signing up! ' + (error.response?.data || 'Unknown error'));
        }
    };

    return (
        <div className="signup-container" style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
            <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: '600' }}>SIGN UP</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        type="text" 
                        id="firstName" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} 
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text" 
                        id="lastName" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)} 
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input 
                        type="text" 
                        id="phoneNumber" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="address">Address</label>
                    <input 
                        type="text" 
                        id="address" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)} 
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="form-group">
                    <button 
                        type="submit" 
                        style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                        Sign Up
                    </button>
                </div>
            </form>

            <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <p>Already a user? <a href="/login" style={{ color: '#007BFF', textDecoration: 'underline' }}>Login here</a>.</p>
            </div>
        </div>
    );
};

export default Signup;