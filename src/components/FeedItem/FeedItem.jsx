import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './FeedItem.module.css';

function FeedItem() {
  return (
    <div className={`${styles.feed_item} mb-4`}>
      <div className={`${styles.number_wrapper} mt-6`}>
        <p className="text text_type_digits-default ml-6">#034535</p>
        <p className="text text_type_main-default text_color_inactive mr-6">Сегодня, 16:20 i-GMT+3</p>
      </div>
      <p className="text text_type_main-medium mt-6 ml-6">Death Star Starship Main бургер</p>
      <div className={`${styles.components} mt-6 mr-6 ml-6 mb-6`}>
        <div className={styles.components_wrapper}>
          <div className={styles.image_container}><img className={styles.image} src="https://code.s3.yandex.net/react/code/bun-02.png" alt="" /></div>
          <div className={styles.image_container}><img className={styles.image} src="https://code.s3.yandex.net/react/code/sauce-02.png" alt="" /></div>
          <div className={styles.image_container}><img className={styles.image} src="https://code.s3.yandex.net/react/code/sauce-01.png" alt="" /></div>
        </div>
        <div className={`${styles.total_wrapper} ml-6`}>
          <p className="text text_type_digits-default">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
export default FeedItem;
