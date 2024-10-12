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

const BurgerConstructor= () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { ingredients } = useSelector(getBurgerIngredients);

  const lockedBuns = ingredients.filter(
    (item) => item.type === "bun",
  );

  const getIngredientsList = (items) =>
    items.map(
      (item) =>
        item.type !== "bun" && (
          <div className={style.element} key={item._id}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
            />
          </div>
        ),
    );

  return (
    <>
      <div className={style.burger_constructor_container}>
        <div className={style.content}>
          <div className={style.constructor_list}>
            {lockedBuns.length && (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={lockedBuns[0].name}
                price={lockedBuns[0].price}
                thumbnail={lockedBuns[0].image_mobile}
              />
            )}
            <div className={style.elements_list}>
              {getIngredientsList(ingredients)}
            </div>
            {lockedBuns.length && (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={lockedBuns[0].name}
                price={lockedBuns[0].price}
                thumbnail={lockedBuns[0].image_mobile}
              />
            )}
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
