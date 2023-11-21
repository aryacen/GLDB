import React, { useContext} from "react";
import TopSection from "../components/TopSection";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import MyProfilePage from "../components/MyProfilePage";
import ProfileView from "../components/ProfileView";

const ProfilePage = () => {
  let my_profile = false;
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const id = location.pathname.split("/")[2];
  if (user._id == id) {
    my_profile = true;
  }

  return (
    <>
      <TopSection />
      {my_profile ? <MyProfilePage /> : <ProfileView />}
    </>
  );
};

export default ProfilePage;
