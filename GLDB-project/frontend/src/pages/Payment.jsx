import React, { useContext } from "react";
import TopSection from "../components/TopSection";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Payment = () => {
  const { user, dispatch } = useContext(AuthContext);
  const handleClick = () => {
    axios
      .put(`http://localhost:9000/api/users/subscribe/${user._id}`)
      .then((response) => {
        dispatch({
          type: "UPDATE_USER",
          payload: response.data,
        })
      })
      .catch((error) => {
        console.error("Error subscribing user", error);
      });
  };
  return (
    <>
      <TopSection></TopSection>
      <div className="payment_container">
        <h1>Start your GLDB Pro membership</h1>

        <form>
          <input
            className="payment__input--bar"
            type="text"
            placeholder="Name on Card"
          ></input>

          <input
            className="payment__input--bar"
            type="text"
            placeholder="Card number"
          ></input>

          <input
            className="payment__input--bar"
            type="text"
            placeholder="Expiration date (MM/YY)"
          ></input>

          <input
            className="payment__input--bar"
            type="password"
            placeholder="CVV"
          ></input>
          <div className="terms-text_container">
            <p>
              By clicking "Agree & Subscribe", you are agreeing to a one time payment of $5.99.
              There will be no refunds for this payment.
            </p>
          </div>
          <Link to="/">
            <button className="pay--button" onClick={handleClick}>
              Agree & Subscribe
            </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Payment;
