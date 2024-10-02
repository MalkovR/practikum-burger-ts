import style from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import NavMenuItem from '../NavMenuItem/index'


const AppHeader = () => {
  return (
    <nav className={style.navbar}>
      <div className={style.blockWidth}>
        <ul className={style.ul}>
          <li className={style.liItem}><NavMenuItem icon={BurgerIcon} name="Конструктор" isActive={true} /></li>
          <li className={style.liItem}><NavMenuItem icon={ListIcon} name="Лента заказов" isActive={false} /></li>
        </ul>
      </div>
      <div className={style.blockWidth}><Logo /></div>
      <div className={style.blockWidth}><span className={style.personal}><NavMenuItem icon={ProfileIcon} name="Личный кабинет" isActive={false}/></span></div>
    </nav>
  );
};

export default AppHeader;