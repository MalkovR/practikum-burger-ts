import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredients.module.css";
import IBurgerIngredients, { IBurgerIngredient } from "../../types/common";
import IngredientItem from "../ingredient-item";

const BurgerIngredients: React.FC<IBurgerIngredients> = ({
  burgerIngredients,
}) => {
  const [current, setCurrent] = React.useState("bun");

  const buns = burgerIngredients.filter(
    (ingredient) => ingredient.type === "bun",
  );
  const sauces = burgerIngredients.filter(
    (ingredient) => ingredient.type === "sauce",
  );
  const mains = burgerIngredients.filter(
    (ingredient) => ingredient.type === "main",
  );

  const getItemList = (items: IBurgerIngredient[]) => (
    <div className={style.grid_panel}>
      {items.map((item) => (
        <div key={item._id}>
          <IngredientItem burgerIngredient={item} />
        </div>
      ))}
    </div>
  );

  return (
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
  );
};

export default BurgerIngredients;
