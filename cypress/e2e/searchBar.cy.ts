/// <reference types="cypress" />

describe('Searchbar', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get(`[aria-label="search"]`).click();
  });

  it('searchbar should close when user clicks on background', () => {
    const modalBackground = cy.get(`[aria-label="close a modal"]`);
    modalBackground.click();
    modalBackground.should('not.exist');
    cy.get('input[placeholder="Search..."]').should('not.exist');
  });

  it('searchbar should close when user clicks on close button', () => {
    const modalBackground = cy.get(`[aria-label="close searchbar"]`);
    modalBackground.click();
    modalBackground.should('not.exist');
    cy.get('input[placeholder="Search..."]').should('not.exist');
  });

  // it('passes', () => {
  //   cy.visit('/');
  //   cy.get(`[aria-label="search"]`)
  //     .click()
  //     .then(() => {
  //       cy.focused().type('non-existing-meal');
  //       cy.get(`Meal not found.`);
  //     });
  // });
});
