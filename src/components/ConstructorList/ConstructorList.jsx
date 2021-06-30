import React from "react";
import PropTypes from "prop-types";
import styles from "./ConstructorList.module.css";
import ConstructorItem from "../ConstructorItem/ConstructorItem";

function ConstructorList({ data }) {
  return (
    <div className={styles.constructor__list}>
      {data
        .filter((i) => i.type !== "bun")
        .map((el) => (
          <ConstructorItem
            key={el._id}
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
    })
  ).isRequired,
};
