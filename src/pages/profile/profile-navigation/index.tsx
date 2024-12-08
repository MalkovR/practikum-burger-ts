import { MouseEvent } from "react";
import style from "./profile-navigation.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "../../../services/store";
import { logout } from "../../../services/auth/actions";

export const ProfileNavigation = () => {
  const dispatch = useDispatch();

  const handleLogout = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <nav className={`${style.nav} mr-15 ml-15`}>
      <NavLink
        to="/profile"
        className={(navLink) =>
          navLink.isActive
            ? `text text_type_main-medium`
            : `text text_type_main-medium text_color_inactive`
        }
      >
        Профиль
      </NavLink>
      <NavLink
        to="/profile/orders"
        className={(navLink) =>
          navLink.isActive
            ? `text text_type_main-medium`
            : `text text_type_main-medium text_color_inactive`
        }
      >
        История заказов
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
