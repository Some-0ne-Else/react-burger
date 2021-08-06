import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Feed.module.css';

function Feed() {
  return (
    <main className={styles.main}>
      <p className="text text_type_main-large">
        Лента заказов
      </p>
      <p className="text text_type_main-large">
        Для реализации в 4 спринте
      </p>
      <Link to="/" className={`${styles.link} text text_type_main-large`}>
        Перейти на главную
      </Link>
    </main>
  );
}

export default Feed;
