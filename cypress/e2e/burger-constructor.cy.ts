import type {} from "cypress";
import type {} from "../support/cypress";
import {
  constructorBunBottomSelector,
  constructorBunTopSelector,
  constructorMainSelector,
  constructorSauseSelector,
  ingredientBun,
  ingredientMain,
  ingredientSause,
  modalOpenedSelector,
} from "../support/const";

describe("Burger Constructor Ingredients Interactions", () => {
  beforeEach(() => {
    cy.prepareBurgerConstructor();
  });

  it("add bun to the constructor", () => {
    cy.getBySelector(constructorBunTopSelector).should("not.exist");
    cy.getBySelector(constructorBunBottomSelector).should("not.exist");

    cy.moveIngredientsToConstructor([ingredientBun]);

    cy.getBySelector(constructorBunTopSelector)
      .contains(ingredientBun.ingredientName)
      .should("exist");
    cy.getBySelector(constructorBunBottomSelector)
      .contains(ingredientBun.ingredientName)
      .should("exist");
  });

  it("add ingredient to the constructor", () => {
    cy.getBySelector(constructorMainSelector).should("not.exist");
    cy.getBySelector(constructorSauseSelector).should("not.exist");

    cy.moveIngredientsToConstructor([ingredientMain, ingredientSause]);

    cy.getBySelector(constructorMainSelector)
      .contains(ingredientMain.ingredientName)
      .should("exist");

    cy.getBySelector(constructorSauseSelector)
      .contains(ingredientSause.ingredientName)
      .should("exist");
  });

  it("ingredient modal has been opened and closed by button", () => {
    cy.getBySelector(modalOpenedSelector).should("not.exist");

    cy.getBySelector(ingredientMain.ingredientId)
      .contains(ingredientMain.ingredientName)
      .click();
    cy.getBySelector(modalOpenedSelector)
      .should("exist")
      .contains(ingredientMain.ingredientName);

    cy.checkModelClosedByButton();
  });

  it("ingredient modal has been opened and closed by overlay", () => {
    cy.getBySelector(modalOpenedSelector).should("not.exist");

    cy.getBySelector(ingredientMain.ingredientId)
      .contains(ingredientMain.ingredientName)
      .click();
    cy.getBySelector(modalOpenedSelector)
      .should("exist")
      .contains(ingredientMain.ingredientName);

    cy.checkModelClosedByOverlay();
  });
});

describe("Burger Constructor Order Test", () => {
  beforeEach(() => {
    cy.preparePostOrder();
  });

  afterEach(() => {
    cy.clearAllLocalStorage();
  });

  it("order for authorized user", () => {
    cy.setUserTokens("www", "xyz");

    cy.moveIngredientsToConstructor([
      ingredientBun,
      ingredientMain,
      ingredientSause,
    ]);

    cy.checkPostOrder("62011");
    cy.checkModelClosedByButton();
    cy.checkConstructorIsEmpty();
  });

  it("order for non-authorized user", () => {
    cy.moveIngredientsToConstructor([
      ingredientBun,
      ingredientMain,
      ingredientSause,
    ]);

    cy.getBySelector(modalOpenedSelector).should("not.exist");
    cy.getBySelector("order-button").contains("Оформить заказ").click();

    cy.loginUser("test999user@example.com", "123");

    cy.checkPostOrder("62011");
    cy.checkModelClosedByOverlay();
    cy.checkConstructorIsEmpty();
  });
});
