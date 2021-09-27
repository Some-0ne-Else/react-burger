import React, { FC } from 'react';
import styles from './ConstructorList.module.css';
import ConstructorItem from '../ConstructorItem/ConstructorItem';
import { IConstructorListProps } from '../../types/data';

const ConstructorList:FC<IConstructorListProps> = ({ data }) => (
  <div className={`${styles.constructor__list} `}>
    {data
      .filter((i) => i.type !== 'bun')
      .map((el) => (
        <ConstructorItem
          key={el.uid}
          _id={el._id}
          uid={el.uid}
          name={el.name}
          price={el.price}
          image={el.image}
          type={el.type}
          proteins={el.proteins}
          fat={el.proteins}
          carbohydrates={el.carbohydrates}
          calories={el.calories}
          image_mobile={el.image_mobile}
          image_large={el.image_large}
          __v={el.__v}
        />
      ))}
  </div>
);

export default ConstructorList;
