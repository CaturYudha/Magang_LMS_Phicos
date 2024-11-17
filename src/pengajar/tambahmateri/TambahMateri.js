import React from 'react';
import './TambahMateri.css';
import { Link } from 'react-router-dom';

const TambahMateri = () => {
  return (
    <div className="tambah-materi">
      <aside className="sidebar">
        {/* Wrap the logo with Link to navigate to /homepage */}
        <Link to="/homepage">
          <div className="logo">Logo</div>
        </Link>

        <nav className="table-of-content">
          <h3>TABLE OF CONTENT</h3>
          <ul>
            <li className="course-item">Course pertama</li>
            <li className="materi-item active">Tambah Materi</li>
            <li className="course-item">Tambah Course</li>
            <li className="exam-item">Exam</li>
          </ul>
          <Link to="/tambahkelas">
            <button className="back-btn">Back</button>
          </Link>
        </nav>
      </aside>

      <main className="main-content">
        <h2>Tambahkan Judul Materi</h2>
        <div className="upload-section">
          <div className="upload-placeholder">
            <span>+ Tambahkan URL Materi</span>
          </div>
        </div>
        <button className="finish-btn">Selesai</button>
      </main>
    </div>
  );
};

export default TambahMateri;
