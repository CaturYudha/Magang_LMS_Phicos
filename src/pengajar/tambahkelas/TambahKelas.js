import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './TambahKelas.css';

const TambahKelas = () => {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleSubmit = () => {
    // Redirect to /tambahmateri when the button is clicked
    navigate('/tambahmateri');
  };

  return (
    <div className="tambah-kelas">
      <header className="header">
        <div className="logo">Logo</div>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/">Products</a>
          <a href="/">About Us</a>
          <a href="/">Help</a>
        </nav>
        <div className="profile-icon">👤</div>
      </header>

      <div className="main-content">
        <div className="upload-section">
          <div className="upload-placeholder">
            <span>+ Tambahkan URL Video</span>
          </div>
        </div>

        <div className="form-section">
          <div className="input-group">
            <label>Tambahkan Judul Kelas</label>
            <input type="text" placeholder="Tambahkan Deskripsi Kelas" />
            <button className="category-btn">Kategori</button>
          </div>

          <div className="price-section">
            <label>Inputkan Harga</label>
            <input type="text" placeholder="Harga" />
          </div>

          <div className="input-group">
            <label>Tambahkan Penjelasan Kelas</label>
            <textarea placeholder="Tambahkan Deskripsi Penjelasan Kelas"></textarea>
          </div>

          <div className="input-group">
            <label>Materi Yang Disediakan</label>
            <textarea placeholder="Materi yang disediakan"></textarea>
          </div>

          {/* Use onClick to trigger navigation */}
          <button className="submit-btn" onClick={handleSubmit}>Buat Materi</button>
        </div>
      </div>
    </div>
  );
};

export default TambahKelas;
