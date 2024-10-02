import { Counter, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Ingredient.module.css';

const IngridientItem = (props: any) => {
  return (
    <div className={style.ingridientItemContainer}>
      <img src={props.image} alt={props.name} />
      <span className={`${style.price} mt-1 mb-1`}>
        <p className="text text_type_digits-medium mr-2">{props.price}</p>
        <CurrencyIcon type="primary"/>
      </span>
      <span className={`${style.description} text text_type_main-small`}>{props.name}</span>
      <Counter count={1} size="default" extraClass="m-1" />
    </div>
  );
};

export default IngridientItem;