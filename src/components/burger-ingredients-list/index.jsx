import React from "react";
import IngredientItem from "../ingredient-item";
import { useDispatch } from "react-redux";
import { getIngredientsDetails } from "../../services/selected-ingredient/actions";
import style from "./burger-ingredients-list.module.css";
import { IngredientItemType } from "../../types/types";
import PropTypes from "prop-types";

const BurgerIngredientsList = ({ items }) => {
  const dispatch = useDispatch();

  return (
    <div className={style.grid_panel}>
      {items.map((item) => (
        <div
          key={item._id}
          onClick={() => dispatch(getIngredientsDetails(item))}
        >
          <IngredientItem burgerIngredient={item} />
        </div>
      ))}
    </div>
  );
};

export default BurgerIngredientsList;

BurgerIngredientsList.propTypes = {
  items: PropTypes.arrayOf(IngredientItemType).isRequired,
};
