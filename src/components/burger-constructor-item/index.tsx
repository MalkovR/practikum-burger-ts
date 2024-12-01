import {useRef} from "react";
import {ConstructorElement, DragIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import {useDrag, useDrop, XYCoord} from "react-dnd";
import {useDispatch} from "../../services/store.ts";
import {moveIngredient, removeIngredient,} from "../../services/burger-constructor/actions";
import {TBurgerIngredientWithUuid} from "../../types/common.ts";

type TBurgerConstructorItemProps = {
  id: string;
  index: number;
  item: TBurgerIngredientWithUuid;
};

type TDropItem = {
  index: number;
  type: string;
  id: string;
};

export const BurgerConstructorItem = ({
  id,
  index,
  item,
}: TBurgerConstructorItemProps) => {
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop<
    TDropItem,
    unknown,
    { handlerId: string | symbol | null }
  >({
    accept: "constructor",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveIngredient(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructor",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  return (
    <div
      className={`${style.element} ${isDragging && style.opacity}`}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={() => dispatch(removeIngredient(item))}
      />
    </div>
  );
};
