import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Nav = () => {
  const { user } = useContext(AuthContext)
  const wishlistLink = `/wishlist/${user._id}`;
  return (
    <div className="nav__container">
      <ul className="nav__list">
        <li className="nav__link">
          <Link to="/forums">
            <h3>Forums</h3>
          </Link>
        </li>
        <li className="nav__divider">
          <hr className="solid"></hr>
        </li>
        <li className="nav__link">
          <Link to="/friends">
            <h3>Friends</h3>
          </Link>
        </li>
        <li className="nav__divider">
          <hr className="solid"></hr>
        </li>
        <li className="nav__link">
          <Link to={wishlistLink}>
            <h3>Wishlist</h3>
          </Link>
        </li>
        <li className="nav__divider">
          <hr className="solid"></hr>
        </li>
        <li className="nav__link">
          <Link to="/">
            <h3>Messages</h3>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
