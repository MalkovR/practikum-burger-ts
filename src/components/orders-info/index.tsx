import style from './orders-info.module.css';
import {useSelector} from "../../services/store.ts";
import {getWsOrders, getWsOrdersTotal, getWsOrdersTotalToday} from "../../services/feed-ws/selectors.ts";

export const OrdersInfo = () => {
    const orders = useSelector(getWsOrders);
    const ordersTotal = useSelector(getWsOrdersTotal);
    const ordersTotalToday = useSelector(getWsOrdersTotalToday);

    if (!orders) {
        return <p>Ждем заказов</p>;
    }

    const ordersReady = orders.filter((item) => item.status === 'done').reverse();
    const ordersNotReady = orders.filter((item) => item.status !== 'done').reverse();

    return (
        <section className={style.orders_info_container}>
            <div className={style.info_table}>
                <section className={style.table_section}>
                <span className="text text_type_main-medium pb-6">Готовы:</span>
                <div className={`${style.table_content} ${style.orders_done}`}>
                    {ordersReady.map((order, index) => (
                        <span key={index} className="text text_type_digits-default">
                      {order.number}
                    </span>
                    ))}
                </div>
                </section>
                <section className={style.table_section}>
                <span className="text text_type_main-medium pb-6">В работе:</span>
                <div className={style.table_content}>
                    {ordersNotReady.map((order, index) => (
                        <span key={index} className="text text_type_digits-default">
                        {order.number}
                   </span>
                    ))}
                </div>
                </section>
            </div>
            <div className={style.total}>
                <span className="text text_type_main-medium">
                  Выполнено за всё время:
                </span>
                <span className="text text_type_digits-large">
                  {ordersTotal}
                </span>
            </div>
            <div className={style.total}>
                <span className="text text_type_main-medium">
                  Выполнено за сегодня:
                </span>
                <span className="text text_type_digits-large">
                  {ordersTotalToday}
                </span>
            </div>
        </section>
    );
};
