import React, { useContext, useState, useEffect } from "react";
import TopSection from "../components/TopSection";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

import SingleCalendar from "../components/watchTogether/Calendar";

const UserCalendarPage = () => {
  const { user } = useContext(AuthContext);
  const userId = useParams();

  if (user) {
      return (
    <>
      <TopSection />
      <div>
        <SingleCalendar id={userId.id} />
      </div>
    </>
  );
  }
  else{
    return(
      <h1>Please Login</h1>
    )
    }
};

export default UserCalendarPage;
