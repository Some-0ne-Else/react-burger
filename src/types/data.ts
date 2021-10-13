import React, { ReactNode } from 'react';

export interface IOrder {
  _id: string;
  createdAt: string;
  number: number;
  name: string;
  status: string;
  ingredients: string[];
}

export interface IIngredient {
  uid?: string;
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  // eslint-disable-next-line camelcase
  image_mobile: string;
  // eslint-disable-next-line camelcase
  image_large: string;
  __v: number;
}

export interface IConstructorIngredient extends IIngredient {
  uid: string;
}

export interface INavigationElement {
  component: any; // ReactNode TS2604
  type: string;
  text: string;
  to: string;
  exact?: boolean;
}

export interface ICloseOverlay {
  onClose: () => void;
}

export interface IModal {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export interface IIngredientListProps {
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

export interface IConstructorSummaryProps {
  data: IConstructorIngredient[];
  openModal: () => void;
}

export interface IConstructorListProps{
  data : IConstructorIngredient[];
}

export interface ILocation {
  [x: string]: any; // bad practice.
  from: {
    pathname: string;
  };
  state?: { main?:string };
}

export interface IAuthParams{
  token?: string;
 email?: string;
 password?: string;
 name?: string;
}

export type TformInitialState = {
  email:string;
  request: boolean,
  failed: boolean,
  errorText: string,
  passwordRequested: boolean,
  }

export type TappInitialState = {
    ingredients: IIngredient[],
    constructorIngredients: IConstructorIngredient[],
    currentIngredient: {},
    order: {
      orderNumber: number,
      orderRequest: boolean,
      orderFailed: boolean,
    },
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
  }
