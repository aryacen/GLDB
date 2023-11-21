import React, { useContext } from "react";
import BannedUserContainer from "./BannedUserContainer";
import { AuthContext } from "../context/AuthContext";

const BannedList = ({ bannedUsers }) => {
  const { dark } = useContext(AuthContext);
  console.log(bannedUsers.BannedList);
  if (bannedUsers.length !== 0) {
    return (
      <div className={dark ? 'banned-list-dark' : 'banned-list'}>
        <h2>Banned Users</h2>
        {bannedUsers.map((bannedUser) => (
          <BannedUserContainer key={bannedUser} bannedUserId={bannedUser} />
        ))}
      </div>
    );
  }
  else {
    return (
      <h1>No banned users</h1>
    )
  }
};

export default BannedList;
