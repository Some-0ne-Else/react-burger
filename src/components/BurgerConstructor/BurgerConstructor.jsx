import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import ConstructorList from '../ConstructorList/ConstructorList';
import ConstructorSummary from '../ConstructorSummary/ConstructorSummary';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import { addConstructorIngredient } from '../../services/actions';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.constructorIngredients);
  const bun = data.find((b) => (b.type === 'bun'));
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(itemId) {
      dispatch(addConstructorIngredient(itemId.id));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const [isModalOpened, setModalOpened] = React.useState(false);
  const closeModal = () => {
    setModalOpened(false);
  };

  const openModal = () => {
    setModalOpened(true);
  };
  return (
    <section className={styles.constructor}>
      <div ref={dropTarget} className={`${styles.constructor__wrapper} mt-25 mb-10 ${isHover && styles.constructor__wrapper_hint}`}>
        <div className={styles.constructor__item_top}>
          <ConstructorElement
            type="top"
            isLocked
            text={bun?.name}
            price={bun?.price}
            thumbnail={bun?.image}
          />
        </div>
        <ConstructorList data={data} />
        <div className={styles.constructor__item_bottom}>
          <ConstructorElement
            type="bottom"
            isLocked
            text={bun?.name}
            price={bun?.price}
            thumbnail={bun?.image}
          />
        </div>
      </div>
      <ConstructorSummary data={data} openModal={openModal} />
      {isModalOpened && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
