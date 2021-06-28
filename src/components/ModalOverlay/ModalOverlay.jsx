import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';

const modalRoot = document.getElementById("modal-root");
function ModalOverlay() {
    return ReactDOM.createPortal((
        <div className={styles.overlay}></div>
    ), modalRoot)
        
}

export default ModalOverlay;