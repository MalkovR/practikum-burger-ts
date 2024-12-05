import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import style from "./order-info.module.css";
import { useParams } from "react-router-dom";
import { getBurgerIngredients } from "../../services/burger-ingredients/selectors.ts";
import { useSelector } from "../../services/store.ts";
import { TBurgerIngredient, TWSOrder } from "../../types/common.ts";
import { getFeedOrder } from "../../utils/burger-api.ts";
import { getWsOrders } from "../../services/feed-ws/selectors.ts";
import { IngredientRoundImages } from "../ingredient-round-images";

export const OrderInfo = () => {
  const { id } = useParams();
  const allIngredients = useSelector(getBurgerIngredients);
  const orders = useSelector(getWsOrders);
  const [selectedOrder, setSelectedOrder] = useState<TWSOrder | null>(null);

  if (!id) {
    return <p>Загрузка</p>;
  }
  if (!orders) {
    return <p>Заказы загружаются</p>;
  }

  const getOrderStateTranslated = (state: string) => {
    if (state == "done") {
      return "Выполнен";
    }
    if (state == "pending") {
      return "В процессе";
    }
    if (state == "created") {
      return "Создан";
    }
    return "Неизвестен";
  };

  const currentOrder = orders?.find((order) => String(order.number) === id);
  useEffect(() => {
    if (currentOrder) {
      setSelectedOrder(currentOrder);
    } else {
      getFeedOrder(id)
        .then((res) => {
          if (res) {
            setSelectedOrder(res.orders[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  if (!selectedOrder) {
    return <p>Заказ не найден</p>;
  }

  const uniqueOrderIngredients: { [key: string]: number } = {};
  for (const id of selectedOrder.ingredients) {
    uniqueOrderIngredients[id] = (uniqueOrderIngredients[id] ?? 0) + 1;
  }

  const totalOrder = selectedOrder.ingredients.reduce((sum, id) => {
    return (
      sum +
      (allIngredients.find((item: TBurgerIngredient) => id === item._id)
        ?.price ?? 0)
    );
  }, 0);

  return (
    <div className={style.order_info_container}>
      <div className={`${style.order_number} mb-10`}>
        <p className={`text text_type_digits-default`}>
          #{selectedOrder?.number}
        </p>
      </div>
      <div className={style.order_name}>
        <p className={`text text_type_main-medium`}>{selectedOrder?.name}</p>
        <p
          className={`text text_type_main-default ${selectedOrder?.status === "done" ? style.order_done : ""}`}
        >
          {getOrderStateTranslated(selectedOrder?.status)}
        </p>
      </div>
      <div className={`${style.order_info} mt-15`}>
        <p className={`${style.order_name} text text_type_main-medium pb-6`}>
          Состав:
        </p>
        <div className={style.order_ingredients}>
          {Object.keys(uniqueOrderIngredients)?.map((id) => {
            const ingredient = allIngredients.find((item) => item._id === id);
            return (
              <div className={style.order_ingredient} key={ingredient?._id}>
                <div className={style.left_part}>
                  <IngredientRoundImages id={ingredient?._id} />
                  <p
                    className={`${style.ingredient_name} text text_type_main-default ml-4`}
                  >
                    {ingredient?.name}
                  </p>
                </div>
                <div className={`${style.order_ingredient_price}`}>
                  <p className="text text_type_digits-default">{`${uniqueOrderIngredients[id]} × ${ingredient?.price}`}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`${style.price} mt-10`}>
        <p
          className={`${style.timestamp} text text_type_main-default text_color_inactive`}
        >
          {selectedOrder?.createdAt && (
            <FormattedDate date={new Date(selectedOrder?.createdAt)} />
          )}
        </p>
        <div className={`${style.order_price}`}>
          <p className={`text text_type_digits-default`}>{totalOrder}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
