describe('constructor dragtest', () => {
  it('should drag ingredients to constructor', () => {
    // cy.visit('http://localhost:3000');
    cy.get('a').contains('Конструктор').click();
    cy.contains('Соберите бургер');
    cy.get('div').contains('Краторная булка N-200i').drag('[data-test-id="dropTarget"]');
    cy.get('div').contains('Соус традиционный галактический').drag('[data-test-id="dropTarget"]');
    cy.get('div').contains('Мясо бессмертных моллюсков Protostomia').drag('[data-test-id="dropTarget"]');
    cy.get('.constructor-element__text').contains('Краторная булка N-200i');
    cy.get('.constructor-element__text').contains('Соус традиционный галактический');
    cy.get('.constructor-element__text').contains('Мясо бессмертных моллюсков Protostomia');
  });

  it('should sort constructor elements', () => {
    cy.get('[class^=ConstructorItem]')
      .contains('Мясо бессмертных моллюсков Protostomia')
      .trigger('dragstart').trigger('dragleave');
    cy.get('[class^=ConstructorItem]')
      .contains('Соус традиционный галактический')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend');
    cy.get('[class^=ConstructorItem]').first()
      .contains('Мясо бессмертных моллюсков Protostomia');
  });
});
