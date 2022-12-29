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

  it('add meal to favorites and save it in local storage', () => {
    const mealId = '52874';

    // Add meal to favorites
    cy.visit('/category/Beef');
    cy.get(`[data-testid="${mealId}"`).find('[aria-label="open meal options"]').click();
    cy.get('div').contains('Add to Favorites').click();

    // visit reloads the page - check if local storage works
    cy.visit('/favorites');
    cy.wait(1000);
    cy.get(`[data-testid="${mealId}"`).should('exist');
    cy.get('[data-favorite="1"]').should('exist');
    cy.get(`[data-testid="${mealId}"`).find('[aria-label="open meal options"]').click();
    cy.get('div').contains('Remove from Favorites').click();
    cy.get(`[data-testid="${mealId}"`).should('not.exist');
    cy.get('p').contains(`You don't have favorite meals yet.`).should('exist');
    cy.get('[data-favorite="0"]').should('exist');

    // Check if meal was removed from local storage
    cy.reload();
    cy.wait(1000);
    cy.get(`[data-testid="${mealId}"`).should('not.exist');
    cy.get('p').contains(`You don't have favorite meals yet.`).should('exist');
    cy.get('[data-favorite="0"]').should('exist');
  });
});
