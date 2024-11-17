// Topbar.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'react-bootstrap';
import { faBars, faSearch, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import "../user_admin/Dashboard.css";


function Topbar({ toggleSidebar }) {
  const [count, setCount] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Mengatur nilai awal untuk count dan cartItems
    setCount(0);
    setCartItems([
      { name: "Item 1 memerlukan pemeliharaan", description: "Mohon lakukan pemeliharaan segera mungkin" },
      { name: "Item 2 memerlukan pemeliharaan", description: "Mohon lakukan pemeliharaan segera mungkin" },
      { name: "Item 3 memerlukan pemeliharaan", description: "Mohon lakukan pemeliharaan segera mungkin" }
    ]);
    setCount(3); // Menetapkan count menjadi jumlah item dalam cartItems
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className="topbar">
      <div className="toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="search">
        <label>
          <input type="text" placeholder="Search here" />
          <FontAwesomeIcon className="icon" icon={faSearch} />
        </label>
      </div>
      <div className="user-notification">
        <div className="notification-bell" onClick={handleOpenModal}>
          <svg className="bell-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
            <path d="M12 2C7.03 2 3 6.03 3 11v5.42l-1.71 1.71A.996.996 0 0 0 2 20h20a.996.996 0 0 0 .71-1.71L21 16.42V11c0-4.97-4.03-9-9-9zm-1 19c0 .55.45 1 1 1s1-.45 1-1h-2z" fill="none" stroke="black" strokeWidth="2" />
          </svg>
          {count > 0 && <span className="notification-count">{count}</span>}
        </div>

      </div>
      {showModal && (
        <div className="custom-modal" style={{ right: '0px', top: '60px', paddingTop: '20px' }}>
          <div className="modal-content" style={{ borderRadius: '15px' }}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            {cartItems.map((item, index) => (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', padding: '10px', borderRadius: '20%' }}>
                <div key={index} style={{ display: 'flex', alignItems: 'center', }}>
                  <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '10px', color: 'red', fontSize: '44px' }} />
                  <div>
                    <strong>{item.name}</strong>
                    <br />
                    {item.description}
                  </div>
                </div>
                {index < cartItems.length - 1 && <hr style={{ width: '100%', borderTop: '3px solid #A09E9E', margin: '0px 0' }} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Topbar;