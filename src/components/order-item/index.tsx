import {
    CurrencyIcon,
    FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './order-item.module.css';
import {TBurgerIngredient, TWSOrder} from "../../types/common.ts";
import {useSelector} from "../../services/store.ts";
import {getBurgerIngredients} from "../../services/burger-ingredients/selectors.ts";
import {IngredientRoundImages} from "../ingredient-round-images";

type TOrderItem = {
    order: TWSOrder;
    isVisible: boolean;
}

export const OrderItem = ({ order, isVisible }: TOrderItem) => {
    const ingredients = useSelector(getBurgerIngredients);
    const counter = order.ingredients.length - 5;
    const totalOrder = order.ingredients.reduce((sum, id) => {
        const ingredient = ingredients.find((item: TBurgerIngredient) => id === item._id);
        if (ingredient === undefined) {
            return sum;
        }
        return sum + ingredient.price;
    }, 0);

    const getOrderStateTranslated = (state: string) => {
        if (state == 'done') {
            return 'Выполнен'
        }
        if (state == 'pending') {
            return 'В процессе'
        }
        if (state == 'created') {
            return 'Создан'
        }
        return 'Неизвестен'
    }

    return (
        <div className={style.order_item_container}>
            <div className={`${style.title} pt-6`}>
                <span className="text text_type_digits-default">{order.number}</span>
                <FormattedDate
                    className="text text_type_main-default text_color_inactive"
                    date={new Date(order.createdAt)}
                />
            </div>
            <h3 className={`${style.text_left} text text_type_main-medium`}>{order.name}</h3>
            {isVisible && (
                <p className={`text text_type_main-default ${order.status === 'done' ? style.order_done : style.text_left}`}>
                    {getOrderStateTranslated(order.status)}
                </p>
            )}
            <div className={`${style.total} pb-6`}>
                <div className={style.ingredients_image}>
                    {order.ingredients.slice(0, 6).map((id, index) => (
                        <IngredientRoundImages
                            key={index}
                            id={id}
                            index={index}
                            counter={index <= 4 ? 0 : counter}
                        />
                    ))}
                </div>

                <div className={style.price}>
                    <span className="text text_type_digits-default">{totalOrder}</span>
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </div>
    );
};
