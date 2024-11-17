import React from "react";
import "./DeskripsiCourse.css";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import courseImage from "../../component/gambarprograming.jpg";

function DeskripsiCourse() {
  return (
    <div className="course-container">
      <div className="image-section">
        <img src={courseImage} alt="Course" className="course-image" />
      </div>
      <div className="content-section">
        <h1 className="course-title">Learning front end developing with famous professionals</h1>
        <p className="author">by Catur Yudha</p>
        <p className="course-description">
          Di dalam kelas ini kita akan belajar bersama-sama bagaimana cara membuat
          project Toko Online dari 0 sampai online menggunakan Laravel, Vue.js, dan
          Payment Gateway. <strong>Catatan:</strong> Update Laravel 10.
        </p>
        <div className="price-section">
          <span className="price">Rp 199,000</span>
          <Link to="/courses">
            <button className="buy-button">Beli</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DeskripsiCourse;
