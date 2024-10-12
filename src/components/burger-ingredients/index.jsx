import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredients.module.css";
import IngredientItem from "../ingredient-item";
import { useDispatch, useSelector } from "react-redux";
import { getBurgerIngredients } from "../../services/burger-ingredients/selectors";
import { getSelectedIngredient } from "../../services/selected-ingredient/selectors";
import { getIngredientsDetails, resetIngredientsDetails } from "../../services/selected-ingredient/actions";
import Modal from "../modal";
import IngredientDetails from "../ingredient-details";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const [current, setCurrent] = React.useState("bun");
  const { ingredients } = useSelector(getBurgerIngredients);
  const { selectedIngredient}  = useSelector(getSelectedIngredient);

  const buns = ingredients.filter(
    (ingredient) => ingredient.type === "bun",
  );
  const sauces = ingredients.filter(
    (ingredient) => ingredient.type === "sauce",
  );
  const mains = ingredients.filter(
    (ingredient) => ingredient.type === "main",
  );

  const getItemList = (items) => (
    <div className={style.grid_panel}>
      {items.map((item) => (
        <div
        key={item._id}
        onClick={() => dispatch(getIngredientsDetails(item))}>
          <IngredientItem burgerIngredient={item} />
        </div>
      ))}
    </div>
  );

  return (
    <>
    <div className={style.burger_ingredients_container}>
      <div className={style.content}>
        <div className={style.title}>
          <p className="text_type_main-large">Соберите бургер</p>
        </div>
        <div className={style.flex}>
          <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={current === "main"} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={style.scrollbar}>
          <div className={style.title}>
            <p className="text_type_main-medium">Булки</p>
          </div>
          {getItemList(buns)}
          <div className={style.title}>
            <p className="text_type_main-medium">Соусы</p>
          </div>
          {getItemList(sauces)}
          <div className={style.title}>
            <p className="text_type_main-medium">Начинки</p>
          </div>
          {getItemList(mains)}
        </div>
      </div>
    </div>
    {selectedIngredient && (
        <Modal
          title="Детали ингредиента"
          onClose={() => dispatch(resetIngredientsDetails())}>
          <IngredientDetails burgerIngredient={selectedIngredient} />
        </Modal>
    )}
  </>
  );
};

export default BurgerIngredients;
