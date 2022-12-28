/// <reference types="cypress" />

describe('Searchbar', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get(`[aria-label="search"]`).click();
    cy.get('input[placeholder="Search..."]').should('be.focused');
  });

  it('should open when user clicks on search SVG and close when user clicks on background', () => {
    const modalBackground = cy.get(`[aria-label="close a modal"]`);
    modalBackground.click();
    modalBackground.should('not.exist');
    cy.get('input[placeholder="Search..."]').should('not.exist');
  });

  it('should open when user clicks on search SVG and close when user clicks on close button', () => {
    const modalBackground = cy.get(`[aria-label="close searchbar"]`);
    modalBackground.click();
    modalBackground.should('not.exist');
    cy.get('input[placeholder="Search..."]').should('not.exist');
  });

  it('when user types non-existing meal it should display loading state and then error message, after that if user clears input, error message should disapear', () => {
    cy.get('input[placeholder="Search..."]').type('non-existing meal');
    cy.wait(400);
    cy.get('[aria-label="loading spinner"]').should('exist');
    cy.wait(2000);
    cy.get('[aria-label="loading spinner"]').should('not.exist');
    cy.get('p').contains('Meal not found.').should('exist');
    cy.get('input[placeholder="Search..."]').clear();
    cy.wait(400);
    cy.get('[data-testid="search results"]').should('not.exist');
  });

  it('when user types "polskie naleśniki" it should find "Polskie Naleśniki" meal', () => {
    cy.get('input[placeholder="Search..."]').type('polskie naleśniki');
    cy.wait(2000);
    cy.get('li').contains('Polskie Naleśniki (Polish Pancakes)').should('exist');
  });
});
