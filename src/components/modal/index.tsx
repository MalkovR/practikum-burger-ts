import React, { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import style from "./modal.module.css";
import { ModalOverlay } from "../modal-overlay";

type TModalProps = {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ title, onClose, children }: TModalProps) => {
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
      <div
        className={`${style.modal} pt-10 pb-15 pl-10 pr-10`}
        data-testid={"modal_opened"}
      >
        <div className={`${style.title} text text_type_main-large`}>
          <p>{title}</p>
          <button
            className={style.close_button}
            onClick={onClose}
            data-testid={"close_modal"}
          >
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
