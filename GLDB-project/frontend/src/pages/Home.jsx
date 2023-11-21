import React, { useContext } from "react";
import Search from "../components/Search";
import TopSection from "../components/TopSection";
import Featured from "../components/Featured";
import FriendsWatching from "../components/FriendsWatching";
import { AuthContext } from "../context/AuthContext";
import Recommendations from "../components/Recommendations";
const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <TopSection />
      <Search />
      <Featured />
      {user ? <FriendsWatching /> : <></>}
      {user ? <Recommendations /> : <></>}
    </>
  );
};

export default Home;
