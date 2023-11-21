import React from "react";

const ProfilePicture = (var1) => {
  return (
    <>
      <img
        src={var1.var1[0]}
        alt="User's profile pic"
        className={var1.var1[1]}
        style={{border: `3px solid ${var1.var1[2]}`}}
        onClick={var1.var1[3]} />
    </>
  )
}

export default ProfilePicture;