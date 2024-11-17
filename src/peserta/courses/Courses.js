import React, { useState, useRef, useEffect } from 'react';
import './Courses.css';
import { Link } from 'react-router-dom';

function Courses() {
  const [openCourses, setOpenCourses] = useState({});
  const [isPopupVisible, setPopupVisible] = useState(false);
  const popupRef = useRef(null);

  const toggleCourse = (course) => {
    setOpenCourses((prevOpenCourses) => ({
      ...prevOpenCourses,
      [course]: !prevOpenCourses[course],
    }));
  };

  const showPopup = () => {
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
  };

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        hidePopup();
      }
    };

    if (isPopupVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupVisible]);

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="sticky-header">
        <Link to="/homepage">
          <div className="logo">Logo</div>
        </Link>
          <h2 className="table-of-content-title">TABLE OF CONTENT</h2>
          <nav className="course-list">
            <ul>
              <li onClick={() => toggleCourse('Course pertama')}>
                Course pertama
                {openCourses['Course pertama'] && (
                  <ul className="dropdown">
                    <li className="material-item">Learning front end developing with famous professionals</li>
                    <li className="material-item">Duration: 04:42 min</li>
                    <li className="material-item">Completed</li>
                  </ul>
                )}
              </li>
              <li onClick={() => toggleCourse('Course Kedua')}>
                Course Kedua
                {openCourses['Course Kedua'] && (
                  <ul className="dropdown">
                    <li className="material-item">Course details for Course Kedua</li>
                    <li className="material-item">Duration: 05:00 min</li>
                  </ul>
                )}
              </li>
              <li onClick={() => toggleCourse('Course Ketiga')}>
                Course Ketiga
                {openCourses['Course Ketiga'] && (
                  <ul className="dropdown">
                    <li className="material-item">Course details for Course Ketiga</li>
                    <li className="material-item">Duration: 06:00 min</li>
                  </ul>
                )}
              </li>
              <li onClick={() => toggleCourse('Exam')}>Exam</li>
              <li onClick={() => toggleCourse('Finish Course')}>Finish Course</li>
            </ul>
          </nav>
        </div>
        <div className="bottom-buttons">
          <button className="claim-button" onClick={(e) => { e.stopPropagation(); showPopup(); }}>Claim Certificate</button>
          <Link to="/deskripsicourse">
            <button className="back-button">Back</button>
          </Link>
        </div>
      </aside>

      <main className="content">
        <button className="back-icon">←</button>
        <div className="video-section">
          <h1>Learning front end developing with famous professionals</h1>
          <div className="video-wrapper">
            <iframe 
              src="https://www.youtube.com/embed/qzMPvbL3GRQ" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </main>

      {isPopupVisible && (
        <div className="popup-container">
          <div className="popup" ref={popupRef}>
            <p>Selamat</p>
            <p>Kamu telah menyelesaikan seluruh</p>
            <p>ujian yang telah tersedia.</p>
            <p>Silahkan kembali ke menu kelas untuk</p>
            <p>mencetak sertifikat</p>
          </div>
        </div>
      )}
    </div>
  );
}



export default Courses;
