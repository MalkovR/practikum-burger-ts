import React from 'react'
import { ConstructorElement, DragIcon, CurrencyIcon, Button  } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './burger-constructor.module.css'
import IBurgerIngredients, {IBurgerIngredient} from '../../types/common';

const BurgerConstructor: React.FC<IBurgerIngredients> = ({burgerIngredients}) => {

    const getItemList = (items: IBurgerIngredient[]) => (
        items.map((item) => (
            <div className={style.element} key={item._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image_mobile}
                />
            </div>
        ))
    )

    return (
        <div className={style.burger_constructor_container}>
            <div className={style.content}>
                <div className={style.constructor_list}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={"xxx"}
                    />
                    <div className={style.elements_list}>
                    {getItemList(burgerIngredients)}
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={"xxx"}
                    />
                </div>
                <div className={style.info}>
                    <span style={{display: "flex", alignItems: "center", gap: "16px"}}>
                        <p className='text text_type_main-large'>800</p>
                        <CurrencyIcon type="primary" />
                    </span>
                    <Button 
                        htmlType="button" 
                        type="primary" 
                        size="medium"
                    >
                    Оформить заказ
                </Button>
                </div>
            </div>
        </div>
    );
};

export default BurgerConstructor;