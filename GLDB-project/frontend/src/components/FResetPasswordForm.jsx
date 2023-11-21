import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FResetPasswordForm = () => {
  const [fResetPasswordData, setFResetPasswordData] = useState({});
  fResetPasswordData.email = localStorage.getItem("reset_email");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:9000/api/auth/resetpassword", fResetPasswordData)
      .then((response) => {
        console.log("Form submitted: ", response.data);
        handleSuccess();
      })
      .catch((error) => {
        console.log("Error submitting form: ", error);
        alert("Passwords do not match");
      });
  };

  const handleChange = (event) => {
    setFResetPasswordData({
      ...fResetPasswordData,
      [event.target.name]: event.target.value,
    });
  };

  function handleSuccess() {
    console.log("Successfully reset password");
    navigate("/");
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
      <h2 className="h2_text">Enter your new password</h2>
      <div className="register__container">
        <form
          className="register__form--wrapper"
          onSubmit={handleSubmit}
          action=""
        >
          {" "}
          <div className="input-container">
            <h3 className="fp-input-text">New password</h3>
            <input
              className="register__input--bar"
              onChange={handleChange}
              type="password"
              name="new_password"
              required
            ></input>
            <h3 className="fp-input-text">Confirm password</h3>
            <input
              className="register__input--bar"
              onChange={handleChange}
              type="password"
              name="new_confirm_password"
              required
            ></input>
            <button
              className="fp-continue-button"
              onSubmit={handleSubmit}
              type="submit"
              name="submit"
            >
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FResetPasswordForm;
