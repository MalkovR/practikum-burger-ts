import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConstructorElement, DragIcon, CurrencyIcon, Button  } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructor.module.css'


const BurgerConstructor = () => {

    return (
        <div className={style.burgerConstructorContainer}>
            <div className={style.content}>
                <div className={style.constructorList}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={"xxx"}
                    />
                    <div className={style.elementsList}>
                        <div className={style.element}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={"xxx"}
                        />
                        </div>
                        <div className={style.element}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={"xxx"}
                        />
                        </div>
                        <div className={style.element}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={"xxx"}
                        />
                        </div>
                        <div className={style.element}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={"xxx"}
                        />
                        </div>
                        <div className={style.element}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={"xxx"}
                        />
                        </div>
                        <div className={style.element}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={"xxx"}
                        />
                        </div>
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