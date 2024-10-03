import React, { useState } from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import IBurgerIngredients, { IBurgerIngredient } from "../../types/common";
import Modal from "../modal";
import OrderDetails from "../order-details";

const BurgerConstructor: React.FC<IBurgerIngredients> = ({
  burgerIngredients,
}) => {
  const [isOrderOpen, setIsOrderOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsOrderOpen(false);
  };

  const getItemList = (items: IBurgerIngredient[]) =>
    items.map((item) => (
      <div className={style.element} key={item._id}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image_mobile}
        />
      </div>
    ));

  return (
    <>
      <div className={style.burger_constructor_container}>
        <div className={style.content}>
          <div className={style.constructor_list}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={200}
              thumbnail={
                "https://code.s3.yandex.net/react/code/bun-02-mobile.png"
              }
            />
            <div className={style.elements_list}>
              {getItemList(burgerIngredients)}
            </div>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={
                "https://code.s3.yandex.net/react/code/bun-02-mobile.png"
              }
            />
          </div>
          <div className={style.info}>
            <span
              style={{ display: "flex", alignItems: "center", gap: "16px" }}
            >
              <p className="text text_type_main-large">800</p>
              <CurrencyIcon type="primary" />
            </span>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={() => {
                setIsOrderOpen(true);
              }}
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
      {isOrderOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
