describe('order sending after other tests', () => {
//   before(() => {
//     cy.visit('http://localhost:3000');
//   });

  //   it('should open constructor page by default', () => {
  //     cy.contains('Соберите бургер');
  //   });

  it('should open feed page after button click', () => {
    cy.get('button').contains('Оформить заказ').click();
    cy.contains('идентификатор заказа');
  });
});
