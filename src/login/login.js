import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const navigate = useNavigate();  // Initialize useNavigate hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle standard login
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Here, you can add authentication logic (e.g., API call for login validation)
    // If the login is successful, navigate to the homepage user
    if (email && password) {
      navigate('/homepageuser');  // Redirect to HomepageUser
    } else {
      alert('Please enter valid credentials!');
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = () => {
    // Logic for Google authentication can go here (e.g., using Firebase, OAuth, etc.)
    // After successful Google sign-in, navigate to the teacher's homepage
    navigate('/homepengajar');  // Redirect to HomePagePengajar
  };

  return (
    <div className="login-container">
      <div className="sidebar">
        <div className="brand-logo">B</div>
        <h2 className="brand-name">NAMA BRAND</h2>
        <p className="welcome-text">Selamat Datang Kembali!</p>
        <p className="signup-text">Belum Memiliki akun? <a href="#signup">Sign Up</a></p>
      </div>

      <div className="form-section">
        <nav className="navbar">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About Us</a>
          <button className="login-button">Log In</button>
        </nav>

        <h2 className="login-title">Log In</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <input type="password" placeholder="Confirm Password" />

          <button type="submit" className="log-in">Log In</button>
        </form>

        <p className="alternative-text">Atau Log In dengan Metode Lain</p>
        <div className="social-login">
          {/* Google Sign In Button */}
          <button className="google-login" onClick={handleGoogleSignIn}>Google Sign In</button>
          <button className="facebook-login">Facebook Log In</button>
        </div>

        <p className="signup-prompt">
          Belum Memiliki Akun? <a href="#signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
