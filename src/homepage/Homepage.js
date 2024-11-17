import React from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import gambarprograming from "../component/gambarprograming.jpg"; // Importing gambarprograming
import mobilepreview from "../component/mobilepreview.png"; // Importing mobilepreview.png

const HomePage = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleLoginClick = () => {
    navigate('/login'); // Programmatically navigate to the login page
  };

 return (
    <div className="homepage">
      <header className="navbar">
        <h1 className="logo">Logo</h1>
        <nav>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About Us</a>
          <a href="#help">Help</a>
          <Link to="/register">
            <button className="register-button">Register</button>
          </Link>
          <button className="login-button" onClick={handleLoginClick}>Log In</button> {/* Button with event handler */}
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h2>Mari Upgrade Diri Dengan Kami</h2>
          <p>Platform ini merupakan platform pembelajaran yang dapat membantu para pengguna untuk memperoleh pengetahuan dan memperkaya diri dengan ilmu.</p>
          <button className="start-button">Mulai Sekarang</button>
        </div>
        <img src={mobilepreview} alt="Mobile Preview" className="hero-image" />
      </section>

      <section className="packages">
        <h3>Paket pembelajaran yang kami sediakan</h3>
        <div className="package-cards">
          {[1, 2, 3].map((index) => (
            <div className="package-card" key={index}>
              <img src={gambarprograming} alt="Package Preview" />
              <h4>Nama Paket Pembelajaran</h4>
              <p>Deskripsi singkat tentang paket pembelajaran yang disediakan. Dapat berupa informasi topik yang diajarkan dan level pembelajaran.</p>
              <button className="details-button">Pilih</button>
            </div>
          ))}
        </div>
        <button className="login-button" onClick={handleLoginClick}>Log In</button> {/* Using the same button with event handler */}
      </section>

      <footer className="footer">
        <div className="stats">
          <div>
            <h4>Jumlah peserta terdaftar</h4>
            <p>XX</p>
          </div>
          <div>
            <h4>Jumlah pengawas terdaftar</h4>
            <p>XX</p>
          </div>
        </div>
        <div className="footer-info">
          <div>
            <h4>Nama Brand</h4>
            <p>Deskripsi singkat tentang brand atau platform ini.</p>
          </div>
          <div>
            <h4>Tentang Kami</h4>
            <p>Informasi tentang perusahaan, visi misi, dan tujuan pembelajaran.</p>
          </div>
          <div>
            <h4>Get in touch</h4>
            <p>Contact details, alamat email, nomor telepon, atau alamat fisik.</p>
          </div>
          <div>
            <h4>Kata Kunci</h4>
            <p>Keyword, tag, atau kata kunci yang relevan dengan platform ini.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
