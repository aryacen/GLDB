import React, { useEffect, useState, useContext } from "react";
import TopSection from "../components/TopSection";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BannedUserContainer from "../components/BannedUserContainer";

const BannedUsers = () => {
  const { dark } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [bannedList, setBannedList] = useState([]);
  const { id } = useParams();
  let authorized = false;

  if (String(user._id) == id) {
    authorized = true;
  }
  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/users/${id}`)
      .then((response) => {
        setBannedList(response.data.banned_list);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (authorized) {
    if (bannedList.length !== 0) {
      return (
        <>
          <TopSection />
          <div className={dark ? "banned-list-dark" : "banned-list"}>
            <h2>Banned Users</h2>
            {bannedList.map((bannedUser) => (
              <BannedUserContainer key={bannedUser} bannedUserId={bannedUser} />
            ))}
          </div>
        </>
      );
    } else {
      return (<><TopSection /><h1>No banned users</h1></>);
    }
  } else {
    return (
      <>
        <TopSection />
        <h1>You are not Authorized {`${id}${user._id}`}</h1>
      </>
    );
  }
};

export default BannedUsers;
