import style from "./burgers.module.css";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/burger-ingredients/actions";
import { getBurgerIngredients } from "../../services/burger-ingredients/selectors";

const Burgers = () => {
  const dispatch = useDispatch();
  const { loading, error, ingredients } = useSelector(getBurgerIngredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  if (ingredients.length === 0) {
    return <p>Нет ингредиентов</p>;
  }

  return (
    <div className={style.burgers_container}>
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  );
};

export default Burgers;
