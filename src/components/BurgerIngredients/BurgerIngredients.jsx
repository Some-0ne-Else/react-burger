import React from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from "../IngredientsList/IngredientsList";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import BurgerDataContext from "../../contexts/BurgerContext";

function BurgerIngredients() {
  const data = React.useContext(BurgerDataContext);
  const [current, setCurrent] = React.useState("buns");
  const [isModalOpened, setModalOpened] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState({});

  const setTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const openModal = (id) => {
    const ingredient = data.find((el) => el._id === id);
    setCurrentIngredient(ingredient);
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
        <Tab value="buns" active={current === "buns"} onClick={setTab}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={setTab}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === "mains"} onClick={setTab}>
          Начинки
        </Tab>
      </div>
      <IngredientsList openModal={openModal} />

      {isModalOpened && (
        <Modal title={"Детали ингредиента"} onClose={closeModal}>
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
