import React from 'react';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import styles from './Main.module.css';
import Modal from '../Modal/Modal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

function Main() {
    const [showOverlay, setShowOverlay] = React.useState(false);
    const [isModalOpened, setModalOpened] = React.useState(false);

    const closeModal = (e) => {
        console.log(e)
        if (e.code !== "Escape" && e.type === "keydown") { return }
        setModalOpened(false);
        setShowOverlay(false);
        document.removeEventListener('keydown', closeModal);
    }

    const openModal = (id) => {
        console.log(id)
        setShowOverlay(true)
        setModalOpened(true)
        document.addEventListener('keydown', closeModal);
    }
    return (
        <main className={styles.main}>
            <BurgerIngredients openModal={openModal} />
            <BurgerConstructor />
            <Modal title={"Детали ингредиента"} isOpen={isModalOpened} onClose={closeModal} />
            {showOverlay && <ModalOverlay />}
        </main>
    )
}

export default Main;