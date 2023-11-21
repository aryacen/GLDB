import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [forgotPasswordData, setForgotPasswordData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:9000/api/auth/forgotpassword", forgotPasswordData)
      .then((response) => {
        handleSuccess();
        console.log("Form submitted successfully: ", response.data);

        localStorage.setItem("reset_email", response.data);
      })
      .catch((error) => {
        console.log("Error submitting form: ", error);
      });
  };

  const handleChange = (event) => {
    setForgotPasswordData({
      ...forgotPasswordData,
      [event.target.name]: event.target.value,
    });
  };

  function handleSuccess() {
    console.log("redirecting...");
    navigate("/forgotpassword/code");
  }

  return (
    <div>
      <div className="logo__container_F">
        <img
          src={require("../assets/glLogo_reg.png")}
          alt="Greenlamp Logo"
          width="250"
          height="250"
        />
      </div>

      <h2 className="h2_text">
        Enter the email address associated with your account and we'll send you
        a 5-digit code
      </h2>
      <div className="register__container">
        <form
          className="register__form--wrapper"
          onSubmit={handleSubmit}
          action=""
        >
          {" "}
          <div className="input-container">
            <h3 className="fp-input-text">Email</h3>
            <input
              className="register__input--bar"
              onChange={handleChange}
              type="email"
              name="email"
              required
            ></input>
            <button
              className="fp-continue-button"
              onSubmit={handleSubmit}
              type="submit"
              name="submit"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
      <p>
        Don't have an account?{" "}
        <a href="http://localhost:3000/register" className="register--tag">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
