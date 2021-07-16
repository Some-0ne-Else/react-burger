import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ConstructorItem.module.css';
import { removeConstructorIngredient } from '../../services/actions';

function ConstructorItem({
  uid, name, price, image,
}) {
  const dispatch = useDispatch();
  const [{ isDrag }, dragRef] = useDrag({
    type: 'item',
    item: { uid },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const handleRemove = () => {
    dispatch(removeConstructorIngredient(uid));
  };
  return (
    <div ref={dragRef} className={`${styles.item} ${isDrag && styles.item_dragging}`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        handleClose={handleRemove}
        thumbnail={image}
      />
    </div>
  );
}

export default ConstructorItem;

ConstructorItem.propTypes = {
  uid: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};
