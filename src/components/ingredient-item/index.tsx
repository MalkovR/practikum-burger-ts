import {Counter, CurrencyIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ingredient-item.module.css";
import {useMemo} from "react";
import {useSelector} from "react-redux";
import {getConstructorIngredients} from "../../services/burger-constructor/selectors";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import {TBurgerIngredient} from "../../types/common.ts";

type TIngredientItemProps = {
  burgerIngredient: TBurgerIngredient;
};

export const IngredientItem = ({ burgerIngredient }: TIngredientItemProps) => {
  const location = useLocation();
  const { bun, ingredients } = useSelector(getConstructorIngredients);

  const counter = useMemo(() => {
    if (burgerIngredient.type === "bun") {
      return bun?._id === burgerIngredient._id ? 2 : 0;
    }
    return ingredients.filter(
      (item: TBurgerIngredient) => item._id === burgerIngredient._id,
    ).length;
  }, [bun, ingredients]);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ingredient",
    item: burgerIngredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Link
      to={`/ingredients/${burgerIngredient._id}`}
      state={{ backgroundLocation: location }}
    >
      <div
        className={`${style.ingredient_item_container} ${isDragging && style.opacity}`}
        ref={drag}
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
        {counter && <Counter count={counter} size="default" extraClass="m-1" />}
      </div>
    </Link>
  );
};