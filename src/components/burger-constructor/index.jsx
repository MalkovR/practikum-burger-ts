import React, {useMemo, useState} from "react";
import {Button, ConstructorElement, CurrencyIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import Modal from "../modal";
import OrderDetails from "../order-details";
import {useDispatch, useSelector} from "react-redux";
import {getConstructorIngredients} from "../../services/burger-constructor/selectors";
import {addBun, addIngredient, resetConstructor,} from "../../services/burger-constructor/actions";
import {getOrderDetails, resetOrder} from "../../services/order/actions";
import {useDrop} from "react-dnd";
import {BurgerConstructorItem} from "../burger-constructor-item/index";
import {getIsUserLoaded} from "../../services/auth/selectors";
import {useNavigate} from "react-router-dom";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { bun, ingredients } = useSelector(getConstructorIngredients);

  const getConstructorIds = useMemo(() => {
    return bun
      ? [bun._id, ...ingredients.map((item) => item._id), bun._id]
      : ingredients.map((item) => item._id);
  }, [bun, ingredients]);

  const totalPrice = useMemo(() => {
    return bun
      ? bun.price * 2 +
          ingredients.reduce((summa, item) => summa + item.price, 0)
      : ingredients.reduce((summa, item) => summa + item.price, 0);
  }, [bun, ingredients]);

  const [, drop] = useDrop(() => ({
    accept: "ingredient",
    drop(item) {
      item.type === "bun"
        ? dispatch(addBun(item))
        : dispatch(addIngredient(item));
    },
  }));

  const userLoaded = useSelector(getIsUserLoaded);

  const handleOrder = () => {
    dispatch(getOrderDetails(getConstructorIds));
    setOpenModal(true);
  };

  return (
    <>
      <div className={style.burger_constructor_container}>
        <div className={style.content}>
          <div className={style.constructor_list} ref={drop}>
            {bun ? (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image_mobile}
              />
            ) : (
              <div
                className={`constructor-element constructor-element_pos_top ${style.align_center}`}
              >
                <p className="constructor-element__text text text_type_main-medium">
                  Нужна булка
                </p>
              </div>
            )}
            {ingredients.length ? (
              <div className={style.elements_list}>
                {ingredients.map((item, index) => (
                  <BurgerConstructorItem
                    key={item.uuid}
                    id={item.uuid}
                    index={index}
                    item={item}
                  />
                ))}
              </div>
            ) : (
              <div className={`constructor-element ${style.align_center}`}>
                <p className="constructor-element__text text text_type_main-medium">
                  Нужны ингредиенты
                </p>
              </div>
            )}
            {bun ? (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image_mobile}
              />
            ) : (
              <div
                className={`constructor-element constructor-element_pos_bottom ${style.align_center}`}
              >
                <p className="constructor-element__text text text_type_main-medium">
                  Нужна булка
                </p>
              </div>
            )}
          </div>
          <div className={style.info}>
            <span className={style.summa}>
              <p className="text text_type_main-large">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </span>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={userLoaded ? handleOrder : () => navigate("/login")}
              disabled={!bun}
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
      {openModal && (
        <Modal
          onClose={() => {
            dispatch(resetOrder());
            setOpenModal(false);
            dispatch(resetConstructor());
          }}
        >
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
