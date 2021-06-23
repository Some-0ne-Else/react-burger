import React from 'react';
import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import data from '../../utils/data.json';
import BurgerDataContext from '../../contexts/BurgerContext';

function App() {
  console.log(data)
  return (
    <BurgerDataContext.Provider value={data}>
    <div className="App">
      <AppHeader/>
      <Main/>
    </div>
    </BurgerDataContext.Provider>
  );
}

export default App;
