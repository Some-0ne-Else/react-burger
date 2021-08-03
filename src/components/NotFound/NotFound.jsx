import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <main className={styles.main}>
      <p className="text text_type_main-large">
        404
      </p>
      <p className="text text_type_main-large">
        Страница не найдена
      </p>
      <Link to="/" className={`${styles.link} text text_type_main-large`}>
        Перейти на главную
      </Link>

    </main>
  );
}

export default NotFound;
