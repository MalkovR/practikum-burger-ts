import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import {OrderItem} from "../../components/order-item";
import {useDispatch, useSelector} from "../../services/store.ts";
import {WS_URL_BASE} from "../../const.ts";
import {WS_CONNECTION_START, WS_CONNECTION_CLOSED} from "../../services/feed-ws/actions.ts";
import {getWsOrders} from "../../services/feed-ws/selectors.ts";
import {ProfileNavigation} from "../profile/profile-navigation";
import style from "./profile-orders.module.css"


export const ProfileOrders = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const orders = useSelector(getWsOrders);

    const accessToken = localStorage.getItem("accessToken")
    const wsUrl = `${WS_URL_BASE}?token=${accessToken}`


    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: wsUrl });
        return () => {dispatch({ type: WS_CONNECTION_CLOSED })};
    }, [dispatch]);

    if (!orders) {
        return <p>Заказы загружаются</p>
    }

    const sortedOrders = [...orders].sort((a,b) => {
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    });

    return (
        <div className={`${style.profile} mt-15`}>
            <div className={style.block_width_less}>
                <ProfileNavigation/>
            </div>
            <div className={style.block_width_more}>
                <div className={style.scroll}>
                    {sortedOrders.length > 0 &&
                        sortedOrders.map((order, index) => (
                            <Link
                                key={order._id}
                                to={`/profile/orders/${order.number}`}
                                state={{backgroundLocation: location}}
                                className={`${style.link} ${index > 0 && 'pt-4'}`}
                            >
                                <OrderItem order={order} isVisible={true}/>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
};
