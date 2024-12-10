import type { TIngredientAndName } from "./cypress";

export const ingredientBun: TIngredientAndName = {
  ingredientId: "ingredient_001",
  ingredientName: "Краторная булка N-200i",
};
export const ingredientMain: TIngredientAndName = {
  ingredientId: "ingredient_002",
  ingredientName: "Биокотлета из марсианской Магнолии",
};
export const ingredientSause: TIngredientAndName = {
  ingredientId: "ingredient_004",
  ingredientName: "Соус Spicy-X",
};
export const constructorMainSelector = `constructor-${ingredientMain.ingredientId}`;
export const constructorSauseSelector = `constructor-${ingredientSause.ingredientId}`;
export const modalOpenedSelector = "modal_opened";
export const modalClosedSelector = "close_modal";
export const modalOverlaySelector = "modal_overlay";
export const constructorBunTopSelector = "constructor-bun-top";
export const constructorBunBottomSelector = "constructor-bun-bottom";
