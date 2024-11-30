import {IngredientItem} from "../ingredient-item";
import {useDispatch} from "../../services/store";
import {getIngredientsDetails} from "../../services/selected-ingredient/actions";
import style from "./burger-ingredients-list.module.css";
import {TBurgerIngredient} from "../../types/common.ts";

type TBurgerIngredientsListProps = {
  items: Array<TBurgerIngredient>;
};

export const BurgerIngredientsList = ({
  items,
}: TBurgerIngredientsListProps) => {
  const dispatch = useDispatch();

  return (
    <div className={style.grid_panel}>
      {items.map((item) => (
        <div
          key={item._id}
          // @ts-ignore
          onClick={() => dispatch(getIngredientsDetails(item))}
        >
          <IngredientItem burgerIngredient={item} />
        </div>
      ))}
    </div>
  );
};
