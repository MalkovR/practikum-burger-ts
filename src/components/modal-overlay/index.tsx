import style from "./modal-overlay.module.css";

type TModalOverlayProps = {
  onClose: () => void;
};

export const ModalOverlay = ({ onClose }: TModalOverlayProps) => {
  return (
    <div
      className={style.overlay}
      onClick={onClose}
      data-testid={"modal_overlay"}
    ></div>
  );
};
