import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const modalRoot = document.getElementById('modal-root');
function Modal({ title, onClose, children }) {
  const handleClose = React.useCallback(
    (e) => {
      if (e.code !== 'Escape' && e.type === 'keydown') {
        return;
      }
      onClose();
    },
    [onClose],
  );
  React.useEffect(() => {
    document.addEventListener('keydown', handleClose);
    return () => document.removeEventListener('keydown', handleClose);
  }, [handleClose]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={`${styles.modal__container} mr-10 mt-10 ml-10`}>
          <p className={`${styles.modal__title} text text_type_main-large`}>
            {title}
          </p>
          <button
            type="button"
            onClick={onClose}
            className={`${styles.modal__button}`}
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot,
  );
}

export default Modal;

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
Modal.defaultProps = {
  title: '',
};
