describe('popups working properly', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('should open main page', () => {
    cy.contains('Соберите бургер');
  });

  it('should open popup after button click', () => {
    cy.get('[class^=Ingredient_image]').first().click();
    cy.contains('Детали ингредиента');
  });

  it('should close popup after click', () => {
    cy.get('[class^=Modal_modal__button]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
});
