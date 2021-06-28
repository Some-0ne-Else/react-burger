import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import data from '../../utils/data.json';
import BurgerDataContext from '../../contexts/BurgerContext';

function App() {
  return (
    <BurgerDataContext.Provider value={data}>
    <div className={styles.app}>
      <AppHeader/>
      <Main/>
    </div>
    </BurgerDataContext.Provider>
  );
}

export default App;
