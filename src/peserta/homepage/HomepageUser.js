import React from "react";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "./HomepageUser.css";
import courseImage from "../../component/gambarprograming.jpg"; // Going up 2 levels

const HomepageUser = () => {
  const cardData = [
    { title: "Top Class", description: "Learning front end developing with famous professionals", priceBuy: "Rp 199.000", priceRent: "Rp 99.000" },
    { title: "Popular Class", description: "Learning front end developing with famous professionals", priceBuy: "Rp 199.000", priceRent: "Rp 99.000" },
    { title: "Recommended", description: "Learning front end developing with famous professionals", priceBuy: "Rp 199.000", priceRent: "Rp 99.000" },
  ];

  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="header">
        <div className="logo">Logo</div>
        <nav>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About Us</a>
          <a href="#help">Help</a>
        </nav>
        <div className="icons">
          <span className="icon">🔍</span>
          <span className="icon">👤</span>
        </div>
      </header>

      {/* Banner */}
      <div className="banner">
        <div className="banner-text">
          <h1>FLASH SALE</h1>
          <p>Up to 75% Off</p>
          <button>Shop Now</button>
        </div>
      </div>

      {/* Class Sections */}
      <section className="classes-section">
        {cardData.map((card, index) => (
          <Link key={index} to="/deskripsicourse" className="class-card"> {/* Wrap the card in Link */}
            <h2>{card.title}</h2>
            <img src={courseImage} alt={card.title} className="class-image" />
            <div className="class-content">
              <p>{card.description}</p>
              <p className="price">
                Buy: <span className="price-buy">{card.priceBuy}</span> | Rent: {card.priceRent}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default HomepageUser;
