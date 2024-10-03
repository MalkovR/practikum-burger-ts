import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ingredient-item.module.css";
import Modal from "../modal";
import IngredientDetails from "../ingredient-details";
import React, { useState, useCallback } from "react";
import { IBurgerIngredient } from "../../types/common";

export interface IBurgerIngredientInfo {
  burgerIngredient: IBurgerIngredient;
}

const IngredientItem: React.FC<IBurgerIngredientInfo> = ({
  burgerIngredient,
}) => {
  const [isIngredientOpen, setIsIngredientOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsIngredientOpen(false);
  };

  return (
    <>
      <div
        className={style.ingredient_item_container}
        onClick={() => {
          setIsIngredientOpen(true);
        }}
      >
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
      {isIngredientOpen && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails burgerIngredient={burgerIngredient} />
        </Modal>
      )}
    </>
  );
};

export default IngredientItem;
