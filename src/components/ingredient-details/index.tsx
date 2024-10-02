import React from 'react'

import { IBurgerIngredient } from '../../types/common';
import style from './ingredient-details.module.css'

export interface IIngredientDetails {
    burgerIngredient: IBurgerIngredient
}

export interface IDescription {
    title: string
    count: number
}

const Description: React.FC<IDescription> = ({title, count}) =>  (
    <div className={style.description}>
        <p className='text text_type_main-default text_color_inactive'>{title}</p>
        <p className='text text_type_main-default text_color_inactive'>{count}</p>
    </div>
  )


const IngredientDetails:React.FC<IIngredientDetails> = ({burgerIngredient}) => {

    return (
        <div className={style.ingridient_container}>
            <div className={style.base}>
                <img src={burgerIngredient.image_large} alt="logo" />
                <p className='text text_type_main-medium'>{burgerIngredient.name}</p>
            </div>
            <div className={style.descriptions}>
                <Description title='Калории,ккал' count={burgerIngredient.calories} />
                <Description title='Белки, г' count={burgerIngredient.proteins} />
                <Description title='Жиры, г' count={burgerIngredient.fat} />
                <Description title='Углеводы, г' count={burgerIngredient.carbohydrates} />
            </div>       
        </div>
    )
}

export default IngredientDetails;