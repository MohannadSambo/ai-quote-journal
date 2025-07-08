// === Sign Up Page ===
// This page lets new friends join the club by making an account!

import React, { useState } from 'react';
import axios from 'axios';
import Card from '../Components/Card';

export default function SignUp({ onSwitch }) {
  // These are the boxes where friends type their email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // This happens when you click the Sign Up button
  const handleSignUp = async (e) => {
    e.preventDefault(); // Don't reload the page!
    try {
      // Ask the server to make a new account
      await axios.post('http://localhost:4000/auth/signup', { email, password });
      setMessage('Sign up successful! You can log in now.');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <Card>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
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
        <button className="button-accent" type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
      {/* Button to switch to the login page if you already have an account */}
      <button className="button-accent" onClick={onSwitch} style={{ marginTop: 8 }}>
        Already have an account? Log In
      </button>
    </Card>
  );
}
