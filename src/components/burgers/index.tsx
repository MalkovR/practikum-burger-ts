import style from "./burgers.module.css";
import { BurgerIngredients } from "../burger-ingredients";
import { BurgerConstructor } from "../burger-constructor";

export const Burgers = () => {
  return (
    <div className={style.burgers_container}>
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  );
};
