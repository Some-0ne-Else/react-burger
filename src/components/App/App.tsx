import React from 'react';
import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import data from '../../utils/data.json';
function App() {
  console.log(data)
  return (
    <div className="App">
      <AppHeader/>
      <Main/>
    </div>
  );
}

export default App;
