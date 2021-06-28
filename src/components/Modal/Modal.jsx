import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import {
    CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modal-root");
function Modal({ title, isOpen, onClose, children }) {

    return ReactDOM.createPortal((

        <div className={isOpen ? `${styles.modal} ${styles.modal_opened}` : `${styles.modal}`}>
        <div className={`${styles.modal__container} mr-10 mt-10 ml-10`}>
            <p className={`${styles.modal__title} text text_type_main-large`}>{title}</p>
            <button type="button" onClick={(e)=> onClose(e)} className={`${styles.modal__button}`}><CloseIcon type="primary" /></button>
            </div>
            {children}
        </div>

    ), modalRoot)
}

export default Modal;

Modal.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}
Modal.defaultProps = {
    title: "",
}