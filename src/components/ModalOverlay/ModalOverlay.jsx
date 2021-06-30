import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./ModalOverlay.module.css";

const modalRoot = document.getElementById("modal-root");
function ModalOverlay({ onClose }) {
  return ReactDOM.createPortal(
    <div onClick={(e) => onClose(e)} className={styles.overlay}></div>,
    modalRoot
  );
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
