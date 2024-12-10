import "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      getBySelector(selector: string): Chainable<JQuery<Element>>;
      moveIngredientsToConstructor(ingredients: TIngredientsAndNames): void;
      checkConstructorIsEmpty(): void;
      loginUser(name: string, password: string): void;
      setUserTokens(refreshToken: string, accessToken: string): void;
      checkPostOrder(orderNumber: string): void;
      prepareBurgerConstructor(): void;
      preparePostOrder(): void;
      checkModelClosedByButton(): void;
      checkModelClosedByOverlay(): void;
    }
  }
}

export type TIngredientAndName = {
  ingredientId: string;
  ingredientName: string;
};
export type TIngredientsAndNames = Array<TIngredientAndName>;

export {};
