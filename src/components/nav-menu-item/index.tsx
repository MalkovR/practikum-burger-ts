import style from './nav-menu-item.module.css'

const NavMenuItem = (props: any) => {
  return (
    <>
      <div className={style.menu_item}>
        <div className='mr-1'>
          <props.icon type={props.isActive ? "primary": "secondary"} />
        </div>
        <div className='ml-1'>
          <a href="#" className={'text text_type_main-small' + (props.isActive ? '': ' text_color_inactive')}>{props.name}</a>
        </div>
      </div>
    </>
  );
};

export default NavMenuItem;