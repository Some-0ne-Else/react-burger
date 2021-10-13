import React, { FC } from 'react';
import {
  Switch, Route, useLocation, useHistory,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './App.module.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import FeedDetails from '../FeedDetails/FeedDetails';
import Modal from '../Modal/Modal';
import AppHeader from '../AppHeader/AppHeader';
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
  FeedDetailsPage,
} from '../../pages/index';
import {
  fetchIngredients, clearIngredientDetails,
} from '../../services/actions/appActions';
import { getUserData } from '../../services/actions/userActions';
import { toggleModal } from '../../services/actions/modalActions';
import { getCookie } from '../../utils/utils';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils/constants';
import { RootState, AppDispatch } from '../../types/index';
import { ILocation } from '../../types/data';

const App:FC = () => {
  const dispatch:AppDispatch = useDispatch();
  const location = useLocation<ILocation>();
  const history = useHistory();
  const modalOpen = useSelector((store:RootState) => store.modal.modalOpen);
  const main = history.action === 'REPLACE' ? location?.state?.main : null;
  console.log(location?.state);
  const closeModal = () => {
    dispatch(clearIngredientDetails());
    dispatch(toggleModal());
  };

  React.useEffect(() => {
    if (!location.pathname.includes('ingredients')) {
      dispatch(fetchIngredients());
    }
    if (getCookie(ACCESS_TOKEN) !== undefined || localStorage.getItem(REFRESH_TOKEN) !== null) {
      dispatch(getUserData());
    }
  }, []);
  return (
    <div className={styles.app}>
      <AppHeader />
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
        <Route exact path="/profile/orders/:id">
          <FeedDetailsPage />
        </Route>
        <Route exact path="/feed">
          <FeedPage />
        </Route>
        <Route exact path="/feed/:id">
          <FeedDetailsPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
      {main && modalOpen && (
      <>
        <Route path="/ingredients/:id">
          <Modal title="Детали ингредиента" onClose={closeModal}>
            <IngredientDetails />
          </Modal>
        </Route>
        <Route exact path="/feed/:id">
          <Modal title="" onClose={closeModal}>
            <FeedDetails />
          </Modal>
        </Route>
        <Route exact path="/profile/orders/:id">
          <Modal title="" onClose={closeModal}>
            <FeedDetails />
          </Modal>
        </Route>
      </>
      )}
    </div>
  );
};

export default App;
