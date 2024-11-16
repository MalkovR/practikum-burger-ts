import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./order-details.module.css";
import {useSelector} from "react-redux";
import {getOrderDetails} from "../../services/order/selectors";

const OrderDetails = () => {
  const { order, loading, error } = useSelector(getOrderDetails);

  if (loading) {
    return <p>Отправка данных для оформления заказа. Ожидайте.</p>;
  }

  if (error) {
    return <p>Возникла ошибка с оформлением заказа: {error}</p>;
  }

  return (
    <div className={`${style.order_container}`}>
      <div className="text text_type_digits-large">{order.number}</div>
      <div className="text text_type_main-medium pt-8">
        идентификатор заказа
      </div>
      <div className={`pb-15 pt-15 ${style.radial_gradient_01}`}>
        <CheckMarkIcon type="primary" />
      </div>
      <div className="text text_type_main-small pt-2">
        Ваш заказ начали готовить
      </div>
      <div className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
};

export default OrderDetails;
