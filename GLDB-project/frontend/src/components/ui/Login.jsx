import { React } from "react";
import { Link } from "react-router-dom";

const Login = () => {

  return (
    <>
    <div className="logout__container">
      <Link to="/login">
        <button className="logout__icon">Log in</button>
      </Link>
    </div>
    </>

  );
};

export default Login;
