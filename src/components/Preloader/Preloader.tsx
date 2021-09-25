import React, { FC } from 'react';
import preloaderImg from '../../images/loading.png';
import styles from './Preloader.module.css';

const Preloader:FC = () => (
  <main className={styles.main}>
    <img className={styles.preloader__circle} src={preloaderImg} alt="Preloader" />
  </main>
);

export default Preloader;
