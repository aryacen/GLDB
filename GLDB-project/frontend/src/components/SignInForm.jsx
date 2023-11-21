import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const SignInForm = () => {
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "LOGIN_START" });
    axios
      .post("http://localhost:9000/api/auth/login", loginData)
      .then((response) => {
        console.log("Login Successfull:", response.data);
        navigate("/");
        localStorage.setItem("user", response.data.details);
        localStorage.setItem("token", response.data.token);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.details,
          token: response.data.token,
        });
        // window.location.reload()
      })
      .catch((error) => {
        const status_code = Number(error.response.request.status);
        if (status_code === 400) {
          dispatch({ type: "LOGIN_FAILURE", payload: 'Incorrect username or password' });
        } else {
          dispatch({ type: "LOGIN_FAILURE", payload: 'Email is not registered' });
        }
        
        console.error("Error logging in:", error);
      });
  };

  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = () => {
    navigate("/");
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
      <h1>Welcome</h1>
      <h2 className="h2_text_L">Sign in to continue</h2>
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

            <h3 className="fp-input-text">Password</h3>
            <input
              className="register__input--bar"
              onChange={handleChange}
              type="password"
              name="password"
              required
            ></input>

            <button
              disabled={loading}
              className="fp-continue-button"
              onSubmit={handleSubmit}
              type="submit"
              name="submit"
            >
              Log in
            </button>
            {error && (
              <span>
                <br />
                <br />
                <p className="error-message">{error}</p>
              </span>
            )}
            <p className="p-text">OR</p>
            <button
              disabled={loading}
              className="fp-continue-button"
              onClick={handleClick}
              type="submit"
              name="submit"
            >
              Log in as Guest
            </button>
          </div>
        </form>
      </div>

      <a href="http://localhost:3000/forgotpassword" className="register--tag">
        Forgot your password?
      </a>
      <br />
      <br />
      <p>
        Don't have an account?{" "}
        <a href="http://localhost:3000/register" className="register--tag">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default SignInForm;
