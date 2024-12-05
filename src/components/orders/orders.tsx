import style from './orders.module.css';
import { Link, useLocation } from 'react-router-dom';
import {OrderItem} from '../order-item';
import {useSelector} from "../../services/store.ts";
import {getWsOrders} from "../../services/feed-ws/selectors.ts";

export const Orders = () => {
    const location = useLocation();
    const orders = useSelector(getWsOrders);

    if (!orders) {
        return <p>Ждем заказов</p>;
    }

    return (
        <section className={style.scroll}>
            {orders.length > 0 &&
                orders.map((order, index) => (
                    <Link
                        key={order._id}
                        to={`/feed/${order.number}`}
                        state={{ backgroundLocation: location }}
                        className={`${style.link} ${index > 0 && 'pt-4'}`}
                    >
                        <OrderItem order={order} isVisible={false} />
                    </Link>
                ))}
        </section>
    );
};
