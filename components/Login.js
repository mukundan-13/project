import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    const handleSubmit = async (e) => {
        e.preventDefault();

       /* try {
            const response = await axios.post('http://localhost:8080/api/login', {
                email,
                password,
            });
            console.log(response.data);

            // Store the token in localStorage
            localStorage.setItem('token', response.data);
            window.dispatchEvent(new Event('storage'));

            const token = localStorage.getItem('token');
            console.log(token);

            const res = await axios.get('http://localhost:8085/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(res);

            // Store userId in localStorage
            localStorage.setItem('userId', res.data.id);

            // Trigger a custom storage event to notify other components of the change
            window.dispatchEvent(new Event('storage'));

            // Show success alert (using simple alert instead of Swal)
            alert('Login successful!');

            // Redirect to the dashboard
            navigate('/dashboard');

            // Clear input fields
            setEmail('');
            setPassword('');
        } catch (error) {
            // Handle error
            navigate('/profile');
            alert('Error logging in. Invalid email or password. Please try again.');
        }
    };
    */
   const token="dummy-token";
   localStorage.setItem('token',token);
   window.dispatchEvent(new Event('storage'));
   console.log("Login Successfull");
   console.log("Token",token);
   navigate('/profile');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
            <h1 style={{ textAlign: 'center', fontWeight: '600' }}>LOGIN</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                </div>
                <button type="submit" style={{ padding: '10px', borderRadius: '4px', backgroundColor: '#3f51b5', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Login
                </button>
                <Link to="/reset-link" style={{ textAlign: 'center', color: '#1e88e5', marginTop: '10px' }}>
                    Forgot Password?
                </Link>
            </form>
        </div>
    );
};

export default Login;