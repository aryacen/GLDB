import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({});
  const navigate = useNavigate();

  const { loading, error, dispatch } = useContext(AuthContext);

  function handleSuccess() {
    navigate("/");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "LOGIN_START" });
    axios
      .post("http://localhost:9000/api/auth/register", registerData)
      .then((response) => {
        localStorage.setItem("user", response.data.details);
        localStorage.setItem("token", response.data.token);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.details,
          token: response.data.token,
        });
        handleSuccess();
      })
      .catch((error) => {
        const status_code = Number(error.response.request.status);
        console.error("Error submitting form:", error);
        if (status_code === 400) {
          dispatch({ type: "LOGIN_FAILURE", payload: 'Email is already registered'});
        } else if (status_code === 404) {
          dispatch({ type: "LOGIN_FAILURE", payload: 'Passwords must be at least 4 characters long, contains at least one uppercase and lowercase character, a symbol and a number' });
        } else if (status_code === 406) {
          dispatch({ type: "LOGIN_FAILURE", payload: 'Username must be between 4 and 50 characters'});
        } else if (status_code === 401) {
          dispatch({ type: "LOGIN_FAILURE", payload: 'Passwords do not match'});
        } else {
          dispatch({ type: "LOGIN_FAILURE", payload: 'Username already taken'});
        }
      });
  };

  const handleChange = (event) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <div className="logo__container_L">
        <img
          src={require("../assets/glLogo_reg.png")}
          alt="Greenlamp Logo"
          width="250"
          height="250"
        />
      </div>
      <h1>Sign up to GLDB</h1>
      <h2 className="h2_text_L">Create an account</h2>
      <div className="register__container">
        <form
          className="register__form--wrapper"
          onSubmit={handleSubmit}
          action=""
        >
          {" "}
          <div className="input-container">
            <h3 className="fp-input-text">Username</h3>
            <input
              className="register__input--bar"
              onChange={handleChange}
              type="text"
              name="username"
              required
            ></input>
            <h3 className="fp-input-text">Email Address</h3>
            <input
              className="register__input--bar"
              onChange={handleChange}
              type="email"
              name="email"
              required
            ></input>
            <h3 className="fp-input-text">Password</h3>
            <input
              className="register__input--bar"
              onChange={handleChange}
              type="password"
              name="password"
              required
            ></input>
            <h3 className="fp-input-text">Confirm Password</h3>
            <input
              className="register__input--bar"
              onChange={handleChange}
              type="password"
              name="confirm_password"
              required
            ></input>
            <button
              disabled={loading}
              className="fp-continue-button"
              onSubmit={handleSubmit}
              type="submit"
              name="submit"
            >
              REGISTER
            </button>
            {error && <p className="error-message">{error}</p>}
            <br />
            <br />
            <p>
              Already have an account?{" "}
              <a href="http://localhost:3000/login" className="register--tag">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
