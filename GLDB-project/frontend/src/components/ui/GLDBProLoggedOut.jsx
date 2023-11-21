import React, { useState } from "react";
import { Link } from "react-router-dom";

const GLDBProLoggedOut = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsModalOpen(true);
  };

  const handleMouseLeave = () => {
    setIsModalOpen(false);
  };

  function Modal() {
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Upgrade to GLDB Pro to Access Premium Features</h2>
          <p>
            With a GLDB Pro account, you'll get access to exclusive features
            like dark mode, <br />
            customizable profile border, a pro badge, and more to come!
          </p>
          <Link to="/register">
            <button className="modal-button">Register Now</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="logo_modal"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className="GLDB_pro--img"
          src={require("../../assets/GREEN_LAMP_Pro.png")}
          alt="GLDB pro logo"
        />
        {isModalOpen && <Modal />}
      </div>
    </>
  );
};

export default GLDBProLoggedOut;
