import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import ColumnItems from '../ColumnItems';
import style from './BurgerIngridients.module.css'



const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('one')

    return (
        <div className={style.burgerIngredientsContainer}>
          <div className={style.content}>
            <div className={style.title}><p className="text_type_main-large">Соберите бургер</p></div>
            <div className={style.flex}>
              <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
              </Tab>
              <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
              </Tab>
              <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
              </Tab>
            </div>
            <div className={style.scrollbar}>
              <div className={style.title}><p className="text_type_main-medium">Булки</p></div>
              <ColumnItems />
              <div className={style.title}><p className="text_type_main-medium">Соусы</p></div>
              <ColumnItems />
              <div className={style.title}><p className="text_type_main-medium">Начинки</p></div>
              <ColumnItems />
            </div>
          </div>
        </div>
    );
};

export default BurgerIngredients;