import React from "react";
import styles from './BurgerIngredients.module.css';
import {
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from '../IngredientsList/IngredientsList';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import Modal from '../Modal/Modal';
import BurgerDataContext from '../../contexts/BurgerContext';

function BurgerIngredients( ) {
  const data = React.useContext(BurgerDataContext);
  const [current, setCurrent] = React.useState('one')
  const [isModalOpened, setModalOpened] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState({});

  const closeModal = (e) => {
    if (e.code !== "Escape" && e.type === "keydown") { return }
    setModalOpened(false);
    document.removeEventListener('keydown', closeModal);
  }

  const openModal = (id) => {
    const ingredient = data.find((el) => el._id === id);
    setCurrentIngredient(ingredient);
    setModalOpened(true)
    document.addEventListener('keydown', closeModal);
  }
  return (
    <section className={`${styles.burger__block} mr-10`}>
      <p className={`${styles.burger__title}text text_type_main-large mt-10 mb-5`}>Соберите бургер</p>
      <div className={`${styles.burger__switch} mb-10`}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <IngredientsList openModal={openModal} />

      <Modal title={"Детали ингредиента"} isOpen={isModalOpened} onClose={closeModal}>
        <IngredientDetails
          name={currentIngredient.name}
          image={currentIngredient.image_large}
          calories={currentIngredient.calories}
          proteins={currentIngredient.proteins}
          fat={currentIngredient.fat}
          carbohydrates={currentIngredient.carbohydrates}
        />
      </Modal>
      {isModalOpened && <ModalOverlay onClose={closeModal} />}
    </section>
  )
}

export default BurgerIngredients;