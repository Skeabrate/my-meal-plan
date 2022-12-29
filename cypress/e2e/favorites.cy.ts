/// <reference types="cypress" />

describe('Favorites', () => {
  it(`display loading state and then error message "You don't have favorite meals yet.", navigation favorites count should be equal to 0.`, () => {
    cy.visit('/favorites');
    cy.get('[aria-label="loading spinner"]').should('exist');
    cy.wait(2000);
    cy.get('p').contains(`You don't have favorite meals yet.`);
    cy.get('[aria-label="loading spinner"]').should('not.exist');
    cy.get('[data-favorite="0"]').should('exist');
  });
});
