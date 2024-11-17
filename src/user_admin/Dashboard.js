import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUsers, faExclamationTriangle, faClipboardList, faBook, faClipboardCheck, faClipboardQuestion } from '@fortawesome/free-solid-svg-icons'; 
import { Link } from 'react-router-dom';
import "./Dashboard.css";
import Slidebar from '../component/Slidebar';
import Topbar from '../component/topbar';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [totals, setTotals] = useState({
    users: 0,
    jurusans: 0,
    ruangans: 0,
    barangs: 0,
    barangbaik: 0,
    barangrusak: 0,
    peminjaman: 0,
    belumkembali: 0,
    dikembalikan: 0
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Simulate fetching user role and totals without database connection
    const simulatedUserRole = "Admin"; // Replace with desired role
    const simulatedTotals = {
      users: 10,
      jurusans: 5,
      ruangans: 3,
      barangs: 20,
      barangbaik: 15,
      barangrusak: 5,
      peminjaman: 8,
      belumkembali: 2,
      dikembalikan: 6
    };

    setUserRole(simulatedUserRole);
    setTotals(simulatedTotals);
  }, []);

  return (
    <div className="container">
      <Slidebar isOpen={isSidebarOpen} />
      <div className={`main ${isSidebarOpen ? 'shifted' : ''}`}>
        <Topbar toggleSidebar={toggleSidebar} />
        <div className="welcome">
          <h3>Hallo {userRole}</h3>
          <p>Selamat Datang Kembali di (Nama web)</p>
        </div>
        <div className="cardBox">
          <Link to="/databarang" className="box" style={{ textDecoration: 'none' }}>
            <div>
              <div className="numbers">{"235"}</div>
              <div className="cardName">Total Pengguna</div>
            </div>
            <div className="iconBx">
              <FontAwesomeIcon icon={faUsers} />
            </div>
          </Link>

          <div className="box">
            <div>
              <div className="numbers">{"132"}</div>
              <div className="cardName">Total Kelas</div>
            </div>

            <div className="iconBx">
              <FontAwesomeIcon icon={faBook} />
            </div>
          </div>

          <div className="box">
            <div>
              <div className="numbers">{"200"}</div>
              <div className="cardName">Total Quizes</div>
            </div>

            <div className="iconBx">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
          </div>

          <Link to="/datapeminjaman" className="box" style={{ textDecoration: 'none' }}>
            <div>
              <div className="numbers">{"200"}</div>
              <div className="cardName">Total Courses</div>
            </div>
            <div className="iconBx">
              <FontAwesomeIcon icon={faClipboardList} />
            </div>
          </Link>

          <div className="box">
            <div>
              <div className="numbers">{"100"}</div>
              <div className="cardName">Total Soal Ujian</div>
            </div>

            <div className="iconBx">
              <FontAwesomeIcon icon={faClipboardQuestion} />
            </div>
          </div>

          <div className="box">
            <div>
              <div className="numbers">{600}</div>
              <div className="cardName">Total Materi</div>
            </div>

            <div className="iconBx">
              <FontAwesomeIcon icon={faClipboardCheck} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
