*Profile* 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    // Function to fetch user profile
    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8085/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data);
        } catch (err) {
            setErrorMessage('Failed to fetch user profile');
        } finally {
            setLoading(false);
        }
    };

    // Function to update user profile
    const updateUserProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:8085/user/profile', user, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuccessMessage('Your profile has been updated successfully.');
        } catch (err) {
            setErrorMessage('Failed to update user profile');
        }
    };

    // Function to delete user profile
    const deleteUserProfile = async () => {
        const confirmDelete = window.confirm('Are you sure? This action cannot be undone!');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete('http://localhost:8085/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSuccessMessage('Your profile has been deleted successfully.');
                localStorage.removeItem('token');
                window.dispatchEvent(new Event('storage'));
                navigate("/");
            } catch (err) {
                setErrorMessage('Failed to delete user profile');
            }
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (errorMessage) return <p>{errorMessage}</p>;

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            
            {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
            {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
            
            <form onSubmit={updateUserProfile} className="profile-form">
                <div>
                    <label>First Name</label>
                    <input 
                        type="text" 
                        value={user.firstName}
                        onChange={(e) => setUser({ ...user, firstName: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input 
                        type="text" 
                        value={user.lastName}
                        onChange={(e) => setUser({ ...user, lastName: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={user.email}
                        disabled 
                    />
                </div>
                <div>
                    <label>Address</label>
                    <input 
                        type="text" 
                        value={user.address}
                        onChange={(e) => setUser({ ...user, address: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Phone Number</label>
                    <input 
                        type="text" 
                        value={user.phoneNumber}
                        onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} 
                    />
                </div>

                <div>
                    <button type="submit">Update Profile</button>
                </div>
            </form>

            <div>
                <button onClick={deleteUserProfile} style={{ backgroundColor: 'red', color: 'white' }}>
                    Delete Profile
                </button>
            </div>
        </div>
    );
};

export default UserProfile;