import React, { useContext, useState, useEffect } from "react";
import TopSection from "../components/TopSection";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import WatchTogetherCalendar from "../components/watchTogether/WatchTogetherCalendar";

const WatchTogetherPage = () => {
  const { user } = useContext(AuthContext);
  const friendId = useParams();
  console.log(friendId);

  return (
    <>
      <TopSection />
      <div>
        <WatchTogetherCalendar id = {friendId.id}/>
      </div>
    </>
  );
};

export default WatchTogetherPage;
