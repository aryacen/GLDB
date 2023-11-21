import React, { useContext} from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const WatchTogetherButton = (userId) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleClick = () => {
    if(user) {
      navigate(`/watchtogether/${userId.userId}`);
    }
    else {
      navigate("/login");
    }
  };

  return (
    <div className="watch-together-fab-container">
      <button className="watch-together-button" onClick={handleClick}>
      <img
          src={require("../../assets/review_icon.png")}
          alt="Request Watch Together"
          className="request-logo"
          title="Add a request"
        />
      </button>
    </div>
  );
};

export default WatchTogetherButton;