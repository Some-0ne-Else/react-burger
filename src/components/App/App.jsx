import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
} from '../../pages/index';
import { fetchIngredients, getUserData } from '../../services/actions/index';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(getUserData());
  }, []);
  return (
    <div className={styles.app}>
      <Switch>
        <Route exact path="/">
          <AppHeader />
          <DndProvider backend={HTML5Backend}>
            <Main />
          </DndProvider>
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/register">
          <SignupPage />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <Route exact path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute exact path="/profile">
          <ProfilePage />
        </ProtectedRoute>
      </Switch>
    </div>
  );
}

export default App;
