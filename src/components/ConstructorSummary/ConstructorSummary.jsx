import React from 'react';
import styles from './ConstructorSummary.module.css'
import {
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";

function ConstructorSummary() {
    return (
        <div className={`${styles.summary} mr-4`}>
            <div className={`${styles.total} mr-10`}>
                <p className="text text_type_digits-medium">1234</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large">
            Оформить заказ
            </Button>
        </div>
    )
}

export default ConstructorSummary;