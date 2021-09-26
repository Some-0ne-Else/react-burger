import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { IModal } from '../../types/data';
import styles from './Modal.module.css';

const modalRoot:HTMLElement = document.getElementById('modal-root')!;
const Modal:FC<IModal> = ({ title, onClose, children }) => {
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
          {title && (
          <p className={`${styles.modal__title} text text_type_main-large`}>
            {title}
          </p>
          )}
          <button
            type="button"
            onClick={onClose}
            className={`${styles.modal__button}`}
          >
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot,
  );
};

export default Modal;

Modal.defaultProps = {
  title: '',
};
