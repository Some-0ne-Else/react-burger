import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { removeConstructorIngredient, updateConstructorList } from '../../services/actions/appActions';
import { IIngredient } from '../../types/data';
import styles from './ConstructorItem.module.css';

const ConstructorItem:FC<IIngredient> = ({
  uid, name, price, image,
}) => {
  const dispatch = useDispatch();
  const [{ isDrag }, dragRef] = useDrag({
    type: 'item',
    item: { uid },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),

  });

  const [, dropTarget] = useDrop({
    accept: 'item',
    canDrop: () => false,
    hover({ uid: draggedId }:{uid: string}) {
      if (draggedId !== uid) {
        dispatch(updateConstructorList(draggedId, uid!));
      }
    },
  });
  const handleRemove = () => {
    dispatch(removeConstructorIngredient(uid!));
  };
  return (
    <div ref={(node) => dragRef(dropTarget(node))} className={`${styles.item} ${isDrag && styles.item_dragging}`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        handleClose={handleRemove}
        thumbnail={image}
      />
    </div>
  );
};

export default ConstructorItem;

ConstructorItem.propTypes = {
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};
