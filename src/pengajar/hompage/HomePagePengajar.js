import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './HomePagePengajar.css';

const HomePagePengajar = () => {
  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">Logo</div>
        <div className="search-bar">
          <input type="text" placeholder="Telusuri course/kelas" />
          <button>🔍</button>
        </div>
        <div className="profile-icon">👤</div>
      </header>

      <section className="section">
        <h2>Kelas Anda</h2>
        <div className="course-container">
          {/* Use Link for navigation */}
          <Link to="/tambahkelas" className="add-card">
            <span className="plus-icon">+</span>
            <span>Tambah Kelas Baru</span>
          </Link>
          <div className="course-card">Learning front end development...</div>
          <div className="course-card">Learning front end development...</div>
          <div className="course-card">Learning front end development...</div>
          <div className="course-card">Learning front end development...</div>
          <div className="course-card">Learning front end development...</div>
          <div className="course-card">Learning front end development...</div>
          <div className="more-card">➔</div>
        </div>
      </section>

      <section className="section">
        <h2>Bundle Course Anda</h2>
        <div className="course-container">
          <div className="add-card">
            <span className="plus-icon">+</span>
            <span>Tambah Bundle Course Baru</span>
          </div>
          <div className="course-card">Learning front end development...</div>
          <div className="course-card">Learning front end development...</div>
          <div className="course-card">Learning front end development...</div>
          <div className="course-card">Learning front end development...</div>
          <div className="course-card">Learning front end development...</div>
          <div className="course-card">Learning front end development...</div>
          <div className="more-card">➔</div>
        </div>
      </section>
    </div>
  );
};

export default HomePagePengajar;
