import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const GLDBPro = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [isPro, setIsPro] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/users/${user._id}`)
      .then((response) => {
        setIsPro(response.data.pro_user);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const nothing = () => {};

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
          {user ? (
            <Link to="/payment">
              <button className="modal-button">Subscribe Now</button>
            </Link>
          ) : (
            <Link to="/register">
              <button className="modal-button">Register Now</button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {loaded ? (
        <div
          className="logo_modal"
          onMouseEnter={!isPro ? handleMouseEnter : nothing}
          onMouseLeave={!isPro ? handleMouseLeave : nothing}
        >
          <img
            className="GLDB_pro--img"
            src={require("../../assets/GREEN_LAMP_Pro.png")}
            alt="GLDB pro logo"
          />
          {isModalOpen && <Modal />}
        </div>
      ) : (
        <div
        className="logo_modal"
        onMouseEnter={nothing}
        onMouseLeave={nothing}
      >
        <img
          className="GLDB_pro--img"
          src={require("../../assets/GREEN_LAMP_Pro.png")}
          alt="GLDB pro logo"
        />
        {isModalOpen && <Modal />}
      </div>
      )}
    </>
  );
};

export default GLDBPro;
