
describe('React Router test', () => {

  it('can click on a anchor element go to page without reload', () => {
    cy.visit('/');

    cy.contains('a', 'Page 1').click();

    cy.contains("Page1");
    cy.contains("It Works!");
  });

  it('can click Link and go to page without reloading', () => {
    cy.visit('/');

    cy.contains('a', 'Page 2').click();

    cy.contains("Page2");
    cy.contains("It Works!");
  })
});