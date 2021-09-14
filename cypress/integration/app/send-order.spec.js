describe('order sending after other tests', () => {
  it('should open order popup after button click', () => {
    cy.get('button').contains('Оформить заказ').click();
    cy.contains('идентификатор заказа');
  });
});
