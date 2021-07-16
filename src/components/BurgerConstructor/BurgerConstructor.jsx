import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import ConstructorList from '../ConstructorList/ConstructorList';
import ConstructorSummary from '../ConstructorSummary/ConstructorSummary';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import BurgerDataContext from '../../contexts/BurgerContext';

function BurgerConstructor() {
  const data = React.useContext(BurgerDataContext);
  const someBun = data.find((b) => (b.type === 'bun'));
  const [isModalOpened, setModalOpened] = React.useState(false);
  const [orderId, setOrderId] = React.useState(0);

  // const checkBuns = (arr) => {
  //   if (arr.filter((b) => (b.type === 'bun')) > 1) { arr.find(); }
  // };
  const closeModal = () => {
    setModalOpened(false);
  };

  const openModal = (id) => {
    setOrderId(id);
    setModalOpened(true);
  };
  return (
    <section className={styles.constructor}>
      <div className={`${styles.constructor__wrapper} mt-25 mb-10`}>
        <div className={styles.constructor__item_top}>
          <ConstructorElement
            type="top"
            isLocked
            text={someBun?.name}
            price={someBun?.price}
            thumbnail={someBun?.image}
          />
        </div>
        <ConstructorList data={data} />
        <div className={styles.constructor__item_bottom}>
          <ConstructorElement
            type="bottom"
            isLocked
            text={someBun?.name}
            price={someBun?.price}
            thumbnail={someBun?.image}
          />
        </div>
      </div>
      <ConstructorSummary data={data} openModal={openModal} />
      {isModalOpened && (
        <Modal onClose={closeModal}>
          <OrderDetails orderId={orderId} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
