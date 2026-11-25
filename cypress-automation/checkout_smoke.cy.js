describe('SauceDemo E-Commerce Smoke & Regression Suite', () => {
  beforeEach(() => {
    cy.visit('https://saucedemo.com');
  });

  it('TC-01: Should log in successfully with standard user credentials', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
  });

  it('TC-02: Should display an error message for a locked-out user', () => {
    cy.get('[data-test="username"]').type('locked_out_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out.');
  });

  it('TC-07: Should complete an end-to-end product purchase flow', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Add item to cart and verify badge
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');

    // Navigate to cart and checkout
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    // Fill checkout information
    cy.get('[data-test="firstName"]').type('Alondra');
    cy.get('[data-test="lastName"]').type('Valdez');
    cy.get('[data-test="postalCode"]').type('11373');
    cy.get('[data-test="continue"]').click();

    // Complete order and verify confirmation
    cy.get('[data-test="finish"]').click();
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
  });
});
