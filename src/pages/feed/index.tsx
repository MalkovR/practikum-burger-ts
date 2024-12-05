import { useEffect } from 'react';
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/feed-ws/actions.ts";
import style from './feed.module.css';
import {useDispatch} from "../../services/store.ts";
import {WS_URL_BASE} from "../../const.ts";
import {Orders} from "../../components/orders/orders.tsx";
import {OrdersInfo} from "../../components/orders-info";


export const Feed = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: `${WS_URL_BASE}/all` });
        return () => {dispatch({ type: WS_CONNECTION_CLOSED })};
    }, [dispatch]);

    return (
        <section className={style.section}>
            <h2 className="text text_type_main-large mb-4">Лента заказов</h2>
            <div className={style.table}>
                <Orders />
                <OrdersInfo />
            </div>
        </section>
    );
};
