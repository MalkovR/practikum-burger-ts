import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ingredient-item.module.css";
import React from "react";

const IngredientItem= ({
  burgerIngredient,
}) => {

  return (
    <div className={style.ingredient_item_container} >
      <img src={burgerIngredient.image} alt={burgerIngredient.name} />
      <span className={`${style.price} mt-1 mb-1`}>
        <p className="text text_type_digits-medium mr-2">
          {burgerIngredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </span>
      <span className={`${style.description} text text_type_main-small`}>
        {burgerIngredient.name}
      </span>
      <Counter count={1} size="default" extraClass="m-1" />
    </div>
  );
};

export default IngredientItem;
