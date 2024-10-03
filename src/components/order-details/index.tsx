import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./order-details.module.css";

const OrderDetails = () => {
  return (
    <div className={`${style.order_container}`}>
      <div className="text text_type_digits-large">034536</div>
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
        Дождитесь готовности на орбитальнос станции
      </div>
    </div>
  );
};

export default OrderDetails;
