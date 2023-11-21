import React, { useEffect, useState, useContext } from "react";
import TopSection from "../components/TopSection";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import UserReviewList from "../components/UserReviewsList";
const UserReviews = () => {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState();
  const [profilePic, setProfilePic] = useState();
  const [pro, setPro] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const location = useLocation();
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({});

  async function getReviews() {
    axios
      .get(`http://localhost:9000/api/review/getUserAll/${id}`)
      .then((response) => {
        setReviewList(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (String(user._id) == id) {
      setAuthorized(true);
    }

    axios
      .get(`http://localhost:9000/api/users/${id}`)
      .then((response) => {
        setUsername(response.data.username);
        setProfilePic(response.data.profile_picture);
        setPro(response.data.pro_user);
        getReviews();
        setUserInfo({
          userId: id,
          userName: username,
          userPic: profilePic,
          userPro: pro,
          auth: authorized,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <>
      <TopSection />
      <UserReviewList reviews={reviewList} userInfo={userInfo} />
    </>
  );
};

export default UserReviews;
