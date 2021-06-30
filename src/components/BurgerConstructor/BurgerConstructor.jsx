import React from "react";
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorList from "../ConstructorList/ConstructorList";
import ConstructorSummary from "../ConstructorSummary/ConstructorSummary";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import BurgerDataContext from "../../contexts/BurgerContext";

function BurgerConstructor() {
  const data = React.useContext(BurgerDataContext);
  const total = React.useMemo(
    () =>
      data.reduce((acc, el) => {
        return el.price + acc;
      }, 0),
    [data]
  );
  const [isModalOpened, setModalOpened] = React.useState(false);
  const [orderId, setOrderId] = React.useState(0);

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
      <ConstructorSummary total={total} openModal={openModal} />
      {isModalOpened && (
        <Modal onClose={closeModal}>
          <OrderDetails orderId={orderId} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
