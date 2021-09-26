import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { ICloseOverlay } from '../../types/data';
import styles from './ModalOverlay.module.css';

const ModalOverlay:FC<ICloseOverlay> = ({ onClose }) => <div onClick={onClose} className={styles.overlay} />;

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
