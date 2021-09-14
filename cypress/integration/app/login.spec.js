describe('app works correctly with routes', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should open constructor page by default', () => {
    cy.contains('Соберите бургер');
  });

  it('should open login page after button click', () => {
    cy.get('a').contains('Личный кабинет').click();
    cy.contains('Вход');
  });

  it('should login user into account with test data', () => {
    cy.get('input').first().type('tester@test.ru');
    cy.get('input').last().type('test123!');
    cy.get('button').contains('Войти').click();
    cy.contains('В этом разделе вы можете изменить свои персональные данные');
  });
});
