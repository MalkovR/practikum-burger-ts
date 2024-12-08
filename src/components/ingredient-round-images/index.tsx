import style from "./ingredient-round-images.module.css";
import { useSelector } from "../../services/store.ts";
import { getBurgerIngredients } from "../../services/burger-ingredients/selectors.ts";

type TIngredientRoundImages = {
  id?: string;
  counter?: number;
  index?: number;
};

export const IngredientRoundImages = ({
  id,
  index,
  counter = 0,
}: TIngredientRoundImages) => {
  const ingredients = useSelector(getBurgerIngredients);
  const ingredient = ingredients.find((item) => item._id === id);

  return (
    <div
      className={style.ingredient_icon}
      style={{ zIndex: index }}
      title={ingredient?.name}
    >
      <img
        className={style.image}
        src={ingredient?.image}
        alt={ingredient?.name}
      />
      {counter > 0 && <div className={style.shading} />}
      {counter > 0 && (
        <p className={`text text_type_main-default ${style.counter}`}>
          +{counter}
        </p>
      )}
    </div>
  );
};
