import React from 'react';
import FeedItem from '../FeedItem/FeedItem';
import styles from './Feed.module.css';

function Feed() {
  return (
    <main className={`${styles.main} mt-10`}>
      <p className={`${styles.header} text text_type_main-large mb-5`}>
        Лента заказов
      </p>
      <div className={styles.container}>
        <div className={styles.feed_block}>

          <div className={styles.feed_container}>
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
          </div>
        </div>
        <div className={`${styles.orders_block} ml-15`}>
          <div className={`${styles.orders} mb-15`}>
            <p className="text text_type_main-medium mb-6">Готовы:</p>
            <p className="text text_type_main-medium mb-6 ml-9">В работе:</p>
            <div className={styles.orders_list}>
              <p className="text text_type_digits-default mb-2">034525</p>
              <p className="text text_type_digits-default mb-2">034525</p>
              <p className="text text_type_digits-default mb-2">034525</p>
              <p className="text text_type_digits-default mb-2">034525</p>
              <p className="text text_type_digits-default mb-2">034525</p>
            </div>
            <div className={`${styles.orders_list} ml-9`}>
              <p className="text text_type_digits-default text_color_inactive mb-2">034538</p>
              <p className="text text_type_digits-default text_color_inactive mb-2">034538</p>
              <p className="text text_type_digits-default text_color_inactive mb-2">034538</p>
              <p className="text text_type_digits-default text_color_inactive mb-2">034538</p>
              <p className="text text_type_digits-default text_color_inactive mb-2">034538</p>
            </div>
          </div>
          <div className={`${styles.orders_total} mb-15`}>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className={`${styles.glow} text text_type_digits-large`}>28 752</p>
          </div>
          <div className={styles.orders_today}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className={`${styles.glow} text text_type_digits-large`}>138</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Feed;
