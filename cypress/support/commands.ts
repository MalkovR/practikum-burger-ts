/// <reference types="cypress" />
import type {} from "cypress";
import { TIngredientsAndNames } from "./cypress";
import {
  modalClosedSelector,
  modalOpenedSelector,
  modalOverlaySelector,
} from "./const";

Cypress.Commands.add("getBySelector", (selector) => {
  return cy.get(`[data-testid=${selector}]`);
});

Cypress.Commands.add(
  "moveIngredientsToConstructor",
  (ingredients: TIngredientsAndNames) => {
    ingredients.forEach(
      (ingredient: { ingredientId: string; ingredientName: string }) => {
        cy.getBySelector(ingredient.ingredientId)
          .contains(ingredient.ingredientName)
          .should("exist")
          .as("picked_ingredient");
        cy.get("@picked_ingredient").trigger("dragstart");
        cy.getBySelector("constructor_list").trigger("drop");
      },
    );
  },
);

Cypress.Commands.add("checkConstructorIsEmpty", () => {
  cy.getBySelector("constructor-bun-top-empty").contains("Нужна булка");
  cy.getBySelector("constructor-bun-bottom-empty").contains("Нужна булка");
  cy.getBySelector("constructor-ingredient-empty").contains(
    "Нужны ингредиенты",
  );
});

Cypress.Commands.add("loginUser", (name: string, password: string) => {
  cy.get("input[name=email]").type(name);
  cy.get("input[name=password]").type(password);
  cy.getBySelector("submit-login").contains("Войти").click();
});

Cypress.Commands.add(
  "setUserTokens",
  (refreshToken: string, accessToken: string) => {
    cy.window().then((win) =>
      win.localStorage.setItem("refreshToken", JSON.stringify(refreshToken)),
    );
    cy.window().then((win) =>
      win.localStorage.setItem("accessToken", JSON.stringify(accessToken)),
    );
  },
);

Cypress.Commands.add("checkPostOrder", (orderNumber: string) => {
  cy.getBySelector(modalOpenedSelector).should("not.exist");
  cy.getBySelector("order-button").contains("Оформить заказ").click();
  cy.getBySelector(modalOpenedSelector).should("exist").contains(orderNumber);
});

Cypress.Commands.add("prepareBurgerConstructor", () => {
  cy.intercept("GET", "api/ingredients", {
    fixture: "ingredients.json",
  });
  cy.visit("/");
});

Cypress.Commands.add("preparePostOrder", () => {
  cy.intercept("GET", "api/ingredients", {
    fixture: "ingredients.json",
  });
  cy.intercept("POST", "api/auth/login", {
    fixture: "login.json",
  });
  cy.intercept("GET", "api/auth/user", {
    fixture: "login.json",
  });
  cy.intercept("POST", "api/orders", {
    fixture: "order.json",
  });
  cy.visit("/");
});

Cypress.Commands.add("checkModelClosedByButton", () => {
  cy.getBySelector(modalClosedSelector).click();
  cy.getBySelector(modalOpenedSelector).should("not.exist");
});

Cypress.Commands.add("checkModelClosedByOverlay", () => {
  cy.getBySelector(modalOverlaySelector).click("left");
  cy.getBySelector(modalOpenedSelector).should("not.exist");
});
