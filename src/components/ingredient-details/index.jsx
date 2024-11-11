import React, { useEffect } from "react";
import style from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { IngredientItemType } from "../../types/types";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBurgerIngredients } from "../../services/burger-ingredients/selectors";
import { getSelectedIngredient } from "../../services/selected-ingredient/selectors";
import { getIngredientsDetails } from "../../services/selected-ingredient/actions";

const Description = ({ title, count }) => (
  <div className={style.description}>
    <p className="text text_type_main-default text_color_inactive">{title}</p>
    <p className="text text_type_main-default text_color_inactive">{count}</p>
  </div>
);

const IngredientDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const ingredients = useSelector(getBurgerIngredients);
  const selectedIngredient = useSelector(getSelectedIngredient);
  const currentIngredient = ingredients.find(
    (ingredient) => ingredient._id === id,
  );

  useEffect(() => {
    if (currentIngredient) {
      dispatch(getIngredientsDetails(currentIngredient));
    }
  }, [dispatch, currentIngredient]);

  return (
    <>
      {selectedIngredient && (
        <div className={style.ingridient_container}>
          <div className={style.base}>
            <img src={selectedIngredient.image_large} alt="logo" />
            <p className="text text_type_main-medium pt-4 pb-8">
              {selectedIngredient.name}
            </p>
          </div>
          <div className={style.descriptions}>
            <Description
              title="Калории,ккал"
              count={selectedIngredient.calories}
            />
            <Description title="Белки, г" count={selectedIngredient.proteins} />
            <Description title="Жиры, г" count={selectedIngredient.fat} />
            <Description
              title="Углеводы, г"
              count={selectedIngredient.carbohydrates}
            />
          </div>
        </div>
      )}
    </>
  );
};

Description.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
};

export default IngredientDetails;
