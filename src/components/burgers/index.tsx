import style from "./burgers.module.css";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";
import { useState, useEffect } from "react";
import { INGREDIENTS_URL } from "../../const";

const Burgers = () => {
  const [state, setState] = useState({
    ingridientsData: [],
    loading: true,
    hasError: false,
  });

  useEffect(() => {
    const getIngredientData = async () => {
      setState({ ...state, loading: true });
      try {
        const res = await fetch(INGREDIENTS_URL);
        const data = await res.json();
        setState({ ...state, ingridientsData: data.data, loading: false });
      } catch (error) {
        setState({ ...state, hasError: true, loading: false });
        console.log(error);
      }
    };
    getIngredientData();
  }, []);

  if (state.hasError) {
    return <span>Error during the fetching ingredients data from server</span>;
  }

  return (
    <div className={style.burgers_container}>
      <BurgerIngredients burgerIngredients={state.ingridientsData} />
      <BurgerConstructor burgerIngredients={state.ingridientsData} />
    </div>
  );
};

export default Burgers;
