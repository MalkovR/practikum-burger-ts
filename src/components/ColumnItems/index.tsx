import IngridientItem from '../IngredientItem';
import style from './ColumnItem.module.css'

const ColumnItems = (props: any) => {
  return (
    <div className={style.gridPanel}>
      <div>
        <IngridientItem name="Краторная булка N-200i" price="938" image="https://code.s3.yandex.net/react/code/bun-02.png"/>
      </div>
      <div>
        <IngridientItem name="Краторная булка N-222i" price="93" image="https://code.s3.yandex.net/react/code/bun-01.png"/>
      </div>
    </div>
  );
};

export default ColumnItems;