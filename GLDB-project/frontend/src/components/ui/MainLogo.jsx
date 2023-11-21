import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

const MainLogo = () => {
  return (
    <>
      <Link to="/" style={{ pointerEvents: "pointer" }}>
      <div className="logo__container">
        <img
          src={require("../../assets/glLogo_reg.png")}
          alt="Greenlamp Logo"
          className="gl_logo"
        />
      </div>
      </Link>
    </>
  );
};

export default MainLogo;
