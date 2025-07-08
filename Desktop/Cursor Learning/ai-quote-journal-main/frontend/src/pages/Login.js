// === Login Page ===
// This page lets friends enter the club with their secret password!

import React, { useState } from 'react';
import axios from 'axios';
import Card from '../Components/Card';

export default function Login({ onLogin, onSwitch }) {
  // These are the boxes where friends type their email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // This happens when you click the Log In button
  const handleLogin = async (e) => {
    e.preventDefault(); // Don't reload the page!
    try {
      // Ask the server if the email and password are correct
      const res = await axios.post('http://localhost:4000/auth/login', { email, password });
      localStorage.setItem('token', res.data.token); // Save the secret ticket
      setMessage('Login successful!');
      onLogin(); // Go to the dashboard
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <Card>
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="button-accent" type="submit">Log In</button>
      </form>
      <p>{message}</p>
      {/* Button to switch to the sign up page if you need an account */}
      <button className="button-accent" onClick={onSwitch} style={{ marginTop: 8 }}>
        Need an account? Sign Up
      </button>
    </Card>
  );
}
