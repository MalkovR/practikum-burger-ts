import React, { useState, useRef } from "react";
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
  const [currentTab, setCurrentTab] = useState("bun");
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

  const refTabs = useRef(null)
  const refBuns = useRef(null)
  const refSauces = useRef(null)
  const refMains = useRef(null)
  const onScroll = () => {
    const tabsBottom = refTabs.current.getBoundingClientRect().bottom
    const bunsTop = refBuns.current.getBoundingClientRect().top
    const saucesTop = refSauces.current.getBoundingClientRect().top
    const mainsTop = refMains.current.getBoundingClientRect().top

    const minDeltaIngredientName = [
      {"name": "bun", "delta": Math.abs(tabsBottom - bunsTop)},
      {"name": "sauce", "delta": Math.abs(tabsBottom - saucesTop)},
      {"name": "main", "delta": Math.abs(tabsBottom - mainsTop)},
    ].sort((a, b) => a.delta - b.delta)[0].name

    setCurrentTab(minDeltaIngredientName)
  }

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
        <div className={style.flex} ref={refTabs}>
          <Tab value="bun" active={currentTab === "bun"} onClick={setCurrentTab}>
            Булки
          </Tab>
          <Tab value="sauce" active={currentTab === "sauce"} onClick={setCurrentTab}>
            Соусы
          </Tab>
          <Tab value="main" active={currentTab === "main"} onClick={setCurrentTab}>
            Начинки
          </Tab>
        </div>
        <div className={style.scrollbar} onScroll={onScroll}>
          <div className={style.title} ref={refBuns}>
            <p className="text_type_main-medium">Булки</p>
          </div>
          {getItemList(buns)}
          <div className={style.title} ref={refSauces}>
            <p className="text_type_main-medium">Соусы</p>
          </div>
          {getItemList(sauces)}
          <div className={style.title} ref={refMains}>
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
