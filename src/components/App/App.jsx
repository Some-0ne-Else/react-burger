import React from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import { ingredientsUrl } from "../../utils/constants";
import BurgerDataContext from "../../contexts/BurgerContext";

function App() {
  const [ingredients, setIngredients] = React.useState([]);
  React.useEffect(() => {
    fetch(ingredientsUrl)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Error ${res.status}`)
      })
      .then((res) => {
        if (res.success) { setIngredients(res.data) }
        else throw new Error("Error in response")
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <BurgerDataContext.Provider value={ingredients}>
      <div className={styles.app}>
        <AppHeader />
        <Main />
      </div>
    </BurgerDataContext.Provider>
  );
}

export default App;
