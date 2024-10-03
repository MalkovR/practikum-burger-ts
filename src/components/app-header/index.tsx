import style from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NavMenuItem from "../nav-menu-item";

const AppHeader = () => {
  return (
    <header className={style.app_header}>
      <nav className={style.navbar}>
        <div className={style.block_width}>
          <ul className={style.ul}>
            <li className={style.li_item}>
              <NavMenuItem
                icon={BurgerIcon}
                name="Конструктор"
                isActive={true}
              />
            </li>
            <li className={style.li_item}>
              <NavMenuItem
                icon={ListIcon}
                name="Лента заказов"
                isActive={false}
              />
            </li>
          </ul>
        </div>
        <div className={style.block_width}>
          <Logo />
        </div>
        <div className={style.block_width}>
          <span className={style.personal}>
            <NavMenuItem
              icon={ProfileIcon}
              name="Личный кабинет"
              isActive={false}
            />
          </span>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
