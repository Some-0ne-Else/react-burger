import React from 'react';
import styles from './BurgerConstructor.module.css'
import {
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorList from '../ConstructorList/ConstructorList';
import ConstructorSummary from '../ConstructorSummary/ConstructorSummary';
import BurgerDataContext from '../../contexts/BurgerContext';

function BurgerConstructor() {
  const data = React.useContext(BurgerDataContext);
  const total = data.reduce((acc, el) => { return el.price + acc }, 0)
  const handleOrder = () => {
    console.log("Order handeled");
  }
  return (
    <section className={styles.constructor}>
      <div className={`${styles.constructor__wrapper} mt-25 mb-10`}>
        <div className={styles.constructor__item_top}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
        <ConstructorList data={data} />
        <div className={styles.constructor__item_bottom}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
      </div>
      <ConstructorSummary total={total} onClick={handleOrder} />
    </section>
  );
}

export default BurgerConstructor;