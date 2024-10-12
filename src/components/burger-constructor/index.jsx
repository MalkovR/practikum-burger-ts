import React from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import Modal from "../modal";
import OrderDetails from "../order-details";
import { useModal } from "../../hooks/use-modal";
import { useDispatch, useSelector } from "react-redux";
import { getBurgerIngredients } from "../../services/burger-ingredients/selectors";
import { getConstructorIngredients } from "../../services/burger-constructor/selectors";
import { removeIngredient } from "../../services/burger-constructor/actions";

const BurgerConstructor= () => {
  const dispatch = useDispatch()
  const { isModalOpen, openModal, closeModal } = useModal();
  const { bun, ingredients } = useSelector(getConstructorIngredients);

  const getIngredientsList = (items) =>
    items.map(
      (item) =>
        <div className={style.element} key={item.uuid}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image_mobile}
            handleClose={() => dispatch(removeIngredient(item.uuid))}
          />
        </div>
    );

  return (
    <>
      <div className={style.burger_constructor_container}>
        <div className={style.content}>
          <div className={style.constructor_list}>
            {bun
            ?
              <ConstructorElement
                type="top"
                isLocked={true}
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image_mobile}
              />
            : 
              <div className={`constructor-element constructor-element_pos_top ${style.align_center}`}>
                <p className="constructor-element__text text text_type_main-medium">Нужна булка</p>
              </div>
            }
            {ingredients.length
            ?
              <div className={style.elements_list}>
                {getIngredientsList(ingredients)}
              </div>
            :
              <div className={`constructor-element ${style.align_center}`}>
                <p className="constructor-element__text text text_type_main-medium">Нужны ингредиенты</p>
              </div>
            }
            {bun
            ?
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image_mobile}
              />
            :
              <div className={`constructor-element constructor-element_pos_bottom ${style.align_center}`}>
                <p className="constructor-element__text text text_type_main-medium">Нужна булка</p>
              </div>
            }
          </div>
          <div className={style.info}>
            <span className={style.summa}>
              <p className="text text_type_main-large">800</p>
              <CurrencyIcon type="primary" />
            </span>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={openModal}
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
