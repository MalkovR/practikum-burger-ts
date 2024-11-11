import React from "react";
import style from "./profile.module.css";
import ProfileNavigation from "./profile-navigation";
import ProfileForm from "./profile-form";

const Profile = () => {
  return (
    <div className={`${style.profile}`}>
      <div className={style.block_width}>
        <ProfileNavigation />
      </div>
      <div className={style.block_width}>
        <ProfileForm />
      </div>
      <div className={style.block_width}></div>
    </div>
  );
};

export default Profile;
