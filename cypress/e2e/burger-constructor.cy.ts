import type {} from "cypress";

describe("Burger Constructor Ingredients Interactions", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/ingredients", {
      fixture: "ingredients.json",
    });
    cy.visit("http://localhost:5173/");
    cy.viewport(1500, 1000);
  });

  it("add bun to the constructor", () => {
    cy.get("[data-testid=ingredient_001]")
      .contains("Краторная булка N-200i")
      .should("exist")
      .as("picked_bun");
    cy.get("[data-testid=constructor_list]").should("exist").as("constructor");

    cy.get("[data-testid=constructor-bun-top]").should("not.exist");
    cy.get("[data-testid=constructor-bun-bottom]").should("not.exist");

    cy.get("@picked_bun").trigger("dragstart");
    cy.get("@constructor").trigger("drop");

    cy.get("[data-testid=constructor-bun-top]")
      .contains("Краторная булка N-200i")
      .should("exist");
    cy.get("[data-testid=constructor-bun-bottom]")
      .contains("Краторная булка N-200i")
      .should("exist");
  });

  it("add ingredient to the constructor", () => {
    cy.get("[data-testid=ingredient_002]")
      .contains("Биокотлета из марсианской Магнолии")
      .should("exist")
      .as("picked_main");
    cy.get("[data-testid=ingredient_004]")
      .contains("Соус Spicy-X")
      .should("exist")
      .as("picked_sauce");
    cy.get("[data-testid=constructor_list]").should("exist").as("constructor");

    cy.get("[data-testid=constructor-ingredient_002]").should("not.exist");
    cy.get("[data-testid=constructor-ingredient_004]").should("not.exist");

    cy.get("@picked_main").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("[data-testid=constructor-ingredient_002]")
      .contains("Биокотлета из марсианской Магнолии")
      .should("exist");

    cy.get("@picked_sauce").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("[data-testid=constructor-ingredient_004]")
      .contains("Соус Spicy-X")
      .should("exist");
  });

  it("ingredient modal has been opened and closed by button", () => {
    cy.get("[data-testid=modal_opened]").should("not.exist");
    cy.get("[data-testid=ingredient_002]")
      .contains("Биокотлета из марсианской Магнолии")
      .click();
    cy.get("[data-testid=modal_opened]")
      .should("exist")
      .contains("Биокотлета из марсианской Магнолии");
    cy.get("[data-testid=close_modal]").click();
    cy.get("[data-testid=modal_opened]").should("not.exist");
  });

  it("ingredient modal has been opened and closed by overlay", () => {
    cy.get("[data-testid=modal_opened]").should("not.exist");
    cy.get("[data-testid=ingredient_002]")
      .contains("Биокотлета из марсианской Магнолии")
      .click();
    cy.get("[data-testid=modal_opened]")
      .should("exist")
      .contains("Биокотлета из марсианской Магнолии");
    cy.get("[data-testid=modal_overlay]").click("right");
    cy.get("[data-testid=modal_opened]").should("not.exist");
  });
});

describe("Burger Constructor Order Test", () => {
  beforeEach(() => {
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
    cy.visit("http://localhost:5173/");
    cy.viewport(1500, 1000);
  });

  afterEach(() => {
    cy.clearAllLocalStorage();
  });

  it("order for authorized user", () => {
    cy.window().then((win) =>
      win.localStorage.setItem(
        "refreshToken",
        JSON.stringify(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTFjZmU0ZTM2N2RlMDAxZGFmNmU3NyIsImlhdCI6MTczMzc0MDEzNywiZXhwIjoxNzMzNzQxMzM3fQ.Y9kJD8QsTjkpHgg50f9uRKk5jz36KLHgERO5N_K2hRA",
        ),
      ),
    );
    cy.window().then((win) =>
      win.localStorage.setItem(
        "accessToken",
        JSON.stringify(
          "050daf39d83ef2bd0bf3d2562415eaf5aad93aeab079c3bbfca4a1e1caed41c19b267d5b745307fa",
        ),
      ),
    );
    cy.get("[data-testid=ingredient_001]")
      .contains("Краторная булка N-200i")
      .should("exist")
      .as("picked_bun");
    cy.get("[data-testid=ingredient_002]")
      .contains("Биокотлета из марсианской Магнолии")
      .should("exist")
      .as("picked_main");
    cy.get("[data-testid=ingredient_004]")
      .contains("Соус Spicy-X")
      .should("exist")
      .as("picked_sauce");
    cy.get("[data-testid=constructor_list]").should("exist").as("constructor");

    // move ingredients
    cy.get("@picked_bun").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@picked_main").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@picked_sauce").trigger("dragstart");
    cy.get("@constructor").trigger("drop");

    // check order number on modal
    cy.get("[data-testid=modal_opened]").should("not.exist");
    cy.get("[data-testid=order-button]").contains("Оформить заказ").click();
    cy.get("[data-testid=modal_opened]").should("exist").contains("62011");
    cy.get("[data-testid=close_modal]").click();
    cy.get("[data-testid=modal_opened]").should("not.exist");

    // Constructor has been reset
    cy.get("[data-testid=constructor-bun-top-empty]").contains("Нужна булка");
    cy.get("[data-testid=constructor-bun-bottom-empty]").contains(
      "Нужна булка",
    );
    cy.get("[data-testid=constructor-ingredient-empty]").contains(
      "Нужны ингредиенты",
    );
  });

  it("order for non-authorized user", () => {
    cy.get("[data-testid=ingredient_001]")
      .contains("Краторная булка N-200i")
      .should("exist")
      .as("picked_bun");
    cy.get("[data-testid=ingredient_002]")
      .contains("Биокотлета из марсианской Магнолии")
      .should("exist")
      .as("picked_main");
    cy.get("[data-testid=ingredient_004]")
      .contains("Соус Spicy-X")
      .should("exist")
      .as("picked_sauce");
    cy.get("[data-testid=constructor_list]").should("exist").as("constructor");

    // move ingredients
    cy.get("@picked_bun").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@picked_main").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@picked_sauce").trigger("dragstart");
    cy.get("@constructor").trigger("drop");

    // check order on login
    cy.get("[data-testid=modal_opened]").should("not.exist");
    cy.get("[data-testid=order-button]").contains("Оформить заказ").click();

    cy.get("input[name=email]").type("test999user@example.com");
    cy.get("input[name=password]").type("123");
    cy.get("[data-testid=submit-login]").contains("Войти").click();

    cy.get("[data-testid=order-button]").contains("Оформить заказ").click();
    cy.get("[data-testid=modal_opened]").should("exist").contains("62011");
    cy.get("[data-testid=close_modal]").click("left");
    cy.get("[data-testid=modal_opened]").should("not.exist");

    // Constructor has been reset
    cy.get("[data-testid=constructor-bun-top-empty]").contains("Нужна булка");
    cy.get("[data-testid=constructor-bun-bottom-empty]").contains(
      "Нужна булка",
    );
    cy.get("[data-testid=constructor-ingredient-empty]").contains(
      "Нужны ингредиенты",
    );
  });
});
