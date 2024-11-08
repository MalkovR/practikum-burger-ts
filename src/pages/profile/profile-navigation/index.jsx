import React from "react";
import style from "./profile-navigation.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../services/auth/actions";

const ProfileNavigation = () => {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <nav className="mr-15 ml-15">
      <NavLink to="/profile">
        <p className={`text text_type_main-medium ${style.text}`}>Профиль</p>
      </NavLink>
      <NavLink to="/profile/orders">
        <p
          className={`text text_type_main-medium text_color_inactive ${style.text}`}
        >
          История заказов
        </p>
      </NavLink>
      <div onClick={handleLogout} className="mb-20">
        <p
          className={`text text_type_main-medium text_color_inactive ${style.text}`}
        >
          Выход
        </p>
      </div>
      <p
        className={`text text_type_main-default text_color_inactive ${style.description}`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  );
};

export default ProfileNavigation;
