import React from 'react';
import PropTypes from 'prop-types';
import styles from './NavigationElement.module.css';

function NavigationElement({ component: Component, type, text, onClick }) {
    return (
        <li className={`${styles.navigation__element} pl-5 pt-2 pb-2 pr-5`} onClick={onClick}>
            <Component type={type} />
            <p className="text text_type_main-default ml-2">{text}</p>
        </li>
    )

}
export default NavigationElement;

NavigationElement.propTypes = {
    component: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}
