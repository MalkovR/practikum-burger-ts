import style from "./nav-menu-item.module.css";
import React from "react";

type TNavMenuItemProps = {
  icon: React.ReactElement;
  name: string;
  isActive: boolean;
};

export const NavMenuItem = ({ icon, name, isActive }: TNavMenuItemProps) => {
  return (
    <>
      <div className={style.menu_item}>
        <div className="mr-1">{icon}</div>
        <div className="ml-1">
          <p
            className={
              "text text_type_main-small" +
              (isActive ? "" : " text_color_inactive")
            }
          >
            {name}
          </p>
        </div>
      </div>
    </>
  );
};
