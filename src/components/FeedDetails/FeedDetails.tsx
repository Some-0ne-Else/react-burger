import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { WS_CONNECTION_START_ORDERS_ALL } from '../../services/actions/wsActions';
import {
  prepareDate, parseStatus, getUniqValues, countById,
} from '../../utils/utils';
import Preloader from '../Preloader/Preloader';
import { RootState, AppDispatch } from '../../types/index';
import { IOrder, IIngredient } from '../../types/data';
import styles from './FeedDetails.module.css';

const FeedDetails:FC = () => {
  const { id } = useParams<{id: string}>();
  const dispatch:AppDispatch = useDispatch();
  const wsConnected = useSelector((store:RootState) => store.ws.wsConnected);
  const messageCounter = useSelector((store:RootState) => store.ws.messages.length);
  const {
    createdAt, number, name, ingredients, status,
  } = useSelector(
    (store:RootState) => store.ws.messages[store.ws.messages.length - 1]?.orders.find((order:IOrder) => order._id === id)
      || store.ws.messages,
  );

  const ingredientsList = useSelector((store:RootState) => store.app.ingredients);
  const renderedIngredients = ingredientsList.length ? ingredients?.map(
    (orderIngredientId:string) => ingredientsList.find((ingredient:IIngredient) => ingredient._id === orderIngredientId),
  ) : [];
  const total = React.useMemo(
    () => renderedIngredients?.reduce((acc:number, ingredient:IIngredient) => acc + ingredient.price, 0), [renderedIngredients],
  );
  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_ORDERS_ALL });
  }, []);

  return wsConnected && messageCounter && renderedIngredients.length ? (
    <div className={`${styles.feed_item} mb-4`}>
      <div className={`${styles.number_wrapper} mt-6`}>
        <p className="text text_type_digits-default">{`#${number}`}</p>
      </div>
      <p className="text text_type_main-medium mt-6">{name}</p>
      <p className={`${styles.status} text text_type_main-default text_color_inactive mt-2`}>{parseStatus(status)}</p>
      <p className="text text_type_main-medium mt-15">Состав:</p>
      <div className={`${styles.components} mt-6 mb-6`}>

        {getUniqValues(renderedIngredients).map((ingredient, index) => (
          <div key={index.toString()} className={`${styles.component} mb-4`}>
            <div className={styles.wrapper}>
              <div className={styles.image_container}>
                <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
              </div>
              <p className={`${styles['ingredient-text']} text text_type_main-default ml-4`}>{ingredient.name}</p>
            </div>
            <div className={`${styles.wrapper} mr-6`}>
              <p className="text text_type_main-default mr-2">
                {`${countById(renderedIngredients, ingredient._id)} x ${ingredient.price} `}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}

      </div>
      <div className={`${styles.summary} mb-10`}>
        <p className="text text_type_main-default text_color_inactive mr-6">{prepareDate(createdAt)}</p>
        <div className={styles['total-wrapper']}>
          <p className="text text_type_digits-default mr-2">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  ) : <Preloader />;
};

export default FeedDetails;
