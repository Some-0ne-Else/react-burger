import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from '../ConstructorList/ConstructorList';
import ConstructorSummary from '../ConstructorSummary/ConstructorSummary';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import { addConstructorIngredient } from '../../services/actions/appActions';
import { IConstructorIngredient } from '../../types/data';
import { RootState } from '../../types/index';
import styles from './BurgerConstructor.module.css';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const data: IConstructorIngredient[] = useSelector((store: RootState) => store.app.constructorIngredients);
  const bun = data.find((b:IConstructorIngredient) => (b.type === 'bun'));
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(itemId:{_id:string}) {
      dispatch(addConstructorIngredient(itemId._id));
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
    <section className={styles['burger-constructor']}>
      <div
        ref={dropTarget}
        data-test-id="dropTarget"
        className={`${styles.constructor__wrapper} mt-25 mb-10 ${isHover && styles.constructor__wrapper_hint}`}
      >
        {bun && (
        <div className={styles.constructor__item_top}>
          <ConstructorElement
            type="top"
            isLocked
            text={`${bun?.name} (верх)`}
            price={bun?.price}
            thumbnail={bun?.image}
          />
        </div>
        )}
        <ConstructorList data={data} />
        {bun && (
        <div className={styles.constructor__item_bottom}>
          <ConstructorElement
            type="bottom"
            isLocked
            text={`${bun?.name} (низ)`}
            price={bun?.price}
            thumbnail={bun?.image}
          />
        </div>
        )}
      </div>
      <ConstructorSummary data={data} openModal={openModal} />
      {isModalOpened && (
        <Modal title="" onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
