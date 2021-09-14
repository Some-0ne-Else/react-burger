describe('app works correctly with routes', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('should open constructor page by default', () => {
    cy.contains('Соберите бургер');
  });

  it('should open feed page after button click', () => {
    cy.get('a').contains('Лента заказов').click();
    cy.contains('Выполнено за все время:');
  });
});
