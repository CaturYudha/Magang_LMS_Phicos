import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faChartBar, faThLarge, faBox, faClipboardList, faCogs, faSignOutAlt, faBook, faExclamationTriangle, faClipboardQuestion, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import "./sidebar.css";

const Slidebar = () => {
    const [isOpen, setIsOpen] = useState(true); // Track sidebar open/close
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen); // Toggle the sidebar state
    };
  const role = localStorage.getItem('role');

  const logoutHandler = async () => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.post('http://localhost:8000/api/auth/logout');
      localStorage.removeItem('token');
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <div className={`navigation ${isOpen ? '' : 'closed'}`}>
        <ul>
          <li>
            <a href="#" onClick={toggleSidebar}>
              <span className="title">(ceritanya Logo)</span>
            </a>
          </li>

          <li>
            <a href="/dashboard">
              <span className="icon">
                <FontAwesomeIcon icon={faHome} />
              </span>
              <span className="title">Dashboard</span>
            </a>
          </li>

          {role === 'admin' && (
            <>
              <li>
                <a href="/datapengguna">
                  <span className="icon">
                    <FontAwesomeIcon icon={faUsers} />
                  </span>
                  <span className="title">Data Pengguna</span>
                </a>
              </li>
              <li>
                <a href="/datajurusan">
                  <span className="icon">
                    <FontAwesomeIcon icon={faBook} />
                  </span>
                  <span className="title">Data Total Kelas</span>
                </a>
              </li>
              <li>
                <a href="/dataruangan">
                  <span className="icon">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                  </span>
                  <span className="title">Data Total Quizes</span>
                </a>
              </li>
            </>
          )}

          <li>
            <a href="/databarang">
              <span className="icon">
                <FontAwesomeIcon icon={faClipboardList} />
              </span>
              <span className="title">Data Total Courses</span>
            </a>
          </li>

          <li>
            <a href="/datapeminjaman">
              <span className="icon">
                <FontAwesomeIcon icon={faClipboardQuestion} />
              </span>
              <span className="title">Data Soal Ujian</span>
            </a>
          </li>

          {role !== 'siswa' && role !== 'guru' && (
            <li>
              <a href="/laporan/barang">
                <span className="icon">
                  <FontAwesomeIcon icon={faClipboardCheck} />
                </span>
                <span className="title">Total Materi</span>
              </a>
            </li>
          )}

          <li>
            <a href="/pengaturan">
              <span className="icon">
                <FontAwesomeIcon icon={faCogs} />
              </span>
              <span className="title">Pengaturan Profile</span>
            </a>
          </li>

          <li>
            <a href="#" onClick={logoutHandler}>
              <span className="icon">
                <FontAwesomeIcon icon={faSignOutAlt} />
              </span>
              <span className="title">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Slidebar;
