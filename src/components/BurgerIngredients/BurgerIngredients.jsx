import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import IngredientsList from '../IngredientsList/IngredientsList';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { getIngredientDetails, clearIngredientDetails } from '../../services/actions';

function BurgerIngredients() {
  const currentIngredient = useSelector((store) => store.currentIngredient);
  const [currentTab, setCurrentTab] = React.useState('buns');
  const [isModalOpened, setModalOpened] = React.useState(false);
  const dispatch = useDispatch();

  const setTab = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const closeModal = () => {
    dispatch(clearIngredientDetails());
    setModalOpened(false);
  };

  const openModal = (id) => {
    dispatch(getIngredientDetails(id));
    setModalOpened(true);
  };
  return (
    <section className={`${styles.burger__block} mr-10`}>
      <p
        className={`${styles.burger__title}text text_type_main-large mt-10 mb-5`}
      >
        Соберите бургер
      </p>
      <div className={`${styles.burger__switch} mb-10`}>
        <Tab value="buns" active={currentTab === 'buns'} onClick={setTab}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={setTab}>
          Соусы
        </Tab>
        <Tab value="mains" active={currentTab === 'mains'} onClick={setTab}>
          Начинки
        </Tab>
      </div>
      <IngredientsList openModal={openModal} setCurrentTab={setCurrentTab} />

      {isModalOpened && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails
            name={currentIngredient.name}
            image={currentIngredient.image_large}
            calories={currentIngredient.calories}
            proteins={currentIngredient.proteins}
            fat={currentIngredient.fat}
            carbohydrates={currentIngredient.carbohydrates}
          />
        </Modal>
      )}
    </section>
  );
}

export default BurgerIngredients;
