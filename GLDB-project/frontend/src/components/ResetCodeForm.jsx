import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetCodeForm = () => {
  const [resetCodeData, setResetCodeData] = useState({});
  resetCodeData.email = localStorage.getItem("reset_email");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:9000/api/auth/confirmcode", resetCodeData)
      .then((response) => {
        console.log("Form submitted: ", response.data);
        handleSuccess();
      })
      .catch((error) => {
        console.log("Error submitting form: ", error);
        alert("Incorrect reset code or email does not exist");
      });
  };

  const handleChange = (event) => {
    setResetCodeData({
      ...resetCodeData,
      [event.target.name]: event.target.value,
    });
  };

  function handleSuccess() {
    console.log("redirecting...");
    navigate("/forgotpassword/reset");
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
        Please check your email for a message containing your 5-digit code
      </h2>

      <div className="register__container">
        <form
          className="register__form--wrapper"
          onSubmit={handleSubmit}
          action=""
        >
          {" "}
          <div className="input-container">
            <h3 className="fp-input-text">Reset Code</h3>
            <input
              className="register__input--bar"
              onChange={handleChange}
              type="text"
              name="reset_code"
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
      <p><a href="http://localhost:3000/forgotpassword" className="register--tag">Did not get a code?</a></p>
    </div>
  );
};

export default ResetCodeForm;
