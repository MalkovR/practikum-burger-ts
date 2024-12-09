export type TBurgerIngredients = {
  burgerIngredients: Array<TBurgerIngredient>;
};

export type TBurgerIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TBurgerIngredientWithUuid = TBurgerIngredient & { uuid: string };

export type TUser = {
  email: string;
  name: string;
  password?: string;
};

export type TWSOrder = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TWSOrders = {
  success: boolean;
  orders: Array<TWSOrder>;
  total: 0;
  totalToday: 0;
};
