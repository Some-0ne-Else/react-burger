import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './NavigationElement.module.css';

function NavigationElement({
  component: Component, type, text, to,
}) {
  return (
    <li
      className={styles.navigation__element}
    >
      <NavLink
        exact
        to={to}
        className={`${styles.navigation__link} pl-5 pt-2 pb-2 pr-5`}
        activeClassName={styles.navigation__link_active}
      >
        <Component type={type} />
        <p className="text text_type_main-default ml-2">{text}</p>
      </NavLink>
    </li>
  );
}
export default NavigationElement;

NavigationElement.propTypes = {

  component: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
