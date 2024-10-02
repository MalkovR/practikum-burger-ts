import React, { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import style from "./modal.module.css";
import ModalOverlay from "../modal-overlay";

export interface IModal {
  header?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<IModal> = ({ onClose, children }) => {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return createPortal(
    <>
      <div className={`${style.modal} pt-10 pb-15 pl-10 pr-10`}>
        <div className={`${style.title} text text_type_main-large`}>
          <p>Детали ингредиента</p>
          <button className={style.close_button} onClick={onClose}>
            <CloseIcon onClick={onClose} type="primary" />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    document.getElementById("react-modals") as HTMLDivElement,
  );
};

export default Modal;
