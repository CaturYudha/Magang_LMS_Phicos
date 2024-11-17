import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Register.css';

function Register() {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    email: '',
    password: ''
  });

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Fungsi untuk menangani pengiriman formulir
  const handleSubmit = (e) => {
    e.preventDefault();
    // Anda bisa menambahkan validasi di sini sebelum navigasi
    // Misalnya, cek apakah semua field sudah diisi

    // Navigasi ke halaman /homepage setelah pengisian formulir berhasil
    navigate('/homepage');
  };

  return (
    <div className="register-container">
      <div className="sidebar">
        <div className="brand-logo">B</div>
        <h2 className="brand-name">NAMA BRAND</h2>
        <p className="optional-text">Opsional</p>
      </div>

      <div className="form-section">
        <nav className="navbar">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About Us</a>
          <button className="register-button">Register</button>
        </nav>

        <h2 className="signup-title">Sign up</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Nama"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Nomor Telepon"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            placeholder="Alamat"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="button" className="change-method">Change Method</button>
          <button type="submit" className="create-account">Create Account</button>
        </form>

        <p className="login-text">
          Sudah Memiliki Akun? <a href="#login">Log In</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
