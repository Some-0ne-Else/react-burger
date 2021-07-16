import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import styles from './ConstructorList.module.css';
import ConstructorItem from '../ConstructorItem/ConstructorItem';

function ConstructorList({ data }) {
  const dispatch = useDispatch();
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'item',
    drop(itemId) {
      console.log(dispatch, itemId);
    //  dispatch(addConstructorIngredient(itemId.id));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  return (
    <div ref={dropTarget} className={`${styles.constructor__list} ${isHover && styles.constructor__list_hint}`}>
      {data
        .filter((i) => i.type !== 'bun')
        .map((el) => (
          <ConstructorItem
            key={el.uid}
            uid={el.uid}
            name={el.name}
            price={el.price}
            image={el.image}
          />
        ))}
    </div>
  );
}

export default ConstructorList;

ConstructorList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
