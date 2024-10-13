import React from "react";
import style from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { IngredientItemType } from "../../types/types";

const Description = ({ title, count }) => (
  <div className={style.description}>
    <p className="text text_type_main-default text_color_inactive">{title}</p>
    <p className="text text_type_main-default text_color_inactive">{count}</p>
  </div>
);

const IngredientDetails = ({ burgerIngredient }) => {
  return (
    <div className={style.ingridient_container}>
      <div className={style.base}>
        <img src={burgerIngredient.image_large} alt="logo" />
        <p className="text text_type_main-medium pt-4 pb-8">
          {burgerIngredient.name}
        </p>
      </div>
      <div className={style.descriptions}>
        <Description title="Калории,ккал" count={burgerIngredient.calories} />
        <Description title="Белки, г" count={burgerIngredient.proteins} />
        <Description title="Жиры, г" count={burgerIngredient.fat} />
        <Description
          title="Углеводы, г"
          count={burgerIngredient.carbohydrates}
        />
      </div>
    </div>
  );
};

Description.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
};

IngredientDetails.propTypes = {
  burgerIngredient: IngredientItemType.isRequired,
};

export default IngredientDetails;
