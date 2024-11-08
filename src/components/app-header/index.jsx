import style from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NavMenuItem from "../nav-menu-item";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={style.app_header}>
      <nav className={style.navbar}>
        <div className={style.block_width}>
          <ul className={style.ul}>
            <NavLink to="/">
              {({ isActive }) => (
                <li className={style.li_item}>
                  <NavMenuItem
                    icon={BurgerIcon}
                    name="Конструктор"
                    isActive={isActive}
                  />
                </li>
              )}
            </NavLink>
            <NavLink to="/lenta">
              {({ isActive }) => (
                <li className={style.li_item}>
                  <NavMenuItem
                    icon={ListIcon}
                    name="Лента заказов"
                    // temporary
                    isActive={false}
                  />
                </li>
              )}
            </NavLink>
          </ul>
        </div>
        <div className={style.block_width}>
          <Logo />
        </div>
        <div className={style.block_width}>
          <span className={style.personal}>
            <NavLink to="/profile">
              {({ isActive }) => (
                <NavMenuItem
                  icon={ProfileIcon}
                  name="Личный кабинет"
                  isActive={isActive}
                />
              )}
            </NavLink>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
