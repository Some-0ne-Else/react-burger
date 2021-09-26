import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { INavigationElement } from '../../types/data';
import styles from './NavigationElement.module.css';

const NavigationElement:FC<INavigationElement> = ({
  component: Component, type, text, to, exact,
}) => (
  <li
    className={styles.navigation__element}
  >
    <NavLink
      exact={exact}
      to={to}
      className={`${styles.navigation__link} pl-5 pt-2 pb-2 pr-5`}
      activeClassName={styles.navigation__link_active}
    >
      <Component type={type} />
      <p className="text text_type_main-default ml-2">{text}</p>
    </NavLink>
  </li>
);
export default NavigationElement;
