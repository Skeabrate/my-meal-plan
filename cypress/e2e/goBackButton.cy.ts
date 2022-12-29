/// <reference types="cypress" />

describe('Go back button', () => {
  it('Should redirect user to previous url', () => {
    cy.visit('/');
    cy.get('a').contains('Favorites').click();
    cy.get('.GoBackButton__StyledGoBackButton-sc-1o2tcb-0').click();
    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('If there is no previous url in history redirect to homepage', () => {
    cy.visit('/favorites');
    cy.get('.GoBackButton__StyledGoBackButton-sc-1o2tcb-0').click();
    cy.url().should('equal', 'http://localhost:3000/');
  });
});
