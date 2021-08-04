import React from 'react';
import {
  Switch, Route, useLocation, useHistory,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './App.module.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import {
  MainPage,
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFoundPage,
  IngredientDetailsPage,
  OrdersPage,
  FeedPage,
} from '../../pages/index';
import {
  fetchIngredients, getUserData, clearIngredientDetails, toggleModal,
} from '../../services/actions/index';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const modalOpen = useSelector((store) => store.modal.modalOpen);
  const main = history.action === 'REPLACE' ? location?.state?.main : null;
  const closeModal = () => {
    dispatch(clearIngredientDetails());
    dispatch(toggleModal());
  };

  React.useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(getUserData());
  }, []);
  return (
    <div className={styles.app}>
      <Switch location={main || location}>
        <Route exact path="/">
          <DndProvider backend={HTML5Backend}>
            <MainPage />
          </DndProvider>
        </Route>
        <Route path="/ingredients/:id">
          <IngredientDetailsPage />
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
        <Route exact path="/profile/orders">
          <OrdersPage />
        </Route>
        <Route exact path="/feed">
          <FeedPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
      {main && modalOpen && (
      <Route path="/ingredients/:id">
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      </Route>
      )}
    </div>
  );
}

export default App;
