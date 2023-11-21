import React, { useContext } from "react";
import Nav from "./ui/Nav";
import Login from "./ui/Login";
import Logout from "./ui/Logout";
import MainLogo from "./ui/MainLogo";
import GLDBPro from "./ui/GLDBPro";
import { AuthContext } from "../context/AuthContext";
import NavLoggedOut from "./ui/NavLoggedOut";
import GLDBProLoggedOut from "./ui/GLDBProLoggedOut";

const TopSection = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="row">
      <div className="top__container">
        <MainLogo />
        {user ? <Nav /> : <NavLoggedOut />}
        {user ? <GLDBPro /> : <GLDBProLoggedOut />}
        {user ? <Logout /> : <Login />}
      </div>
    </div>
  );
};

export default TopSection;
