import style from "./modal-overlay.module.css";

interface IModalOverlay {
  onClose: () => void;
}

const ModalOverlay = ({ onClose }: IModalOverlay) => {
  return <div className={style.overlay} onClick={onClose}></div>;
};

export default ModalOverlay;
