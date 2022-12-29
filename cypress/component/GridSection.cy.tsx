import React from 'react';
import GridSection from './../../src/components/GridSection/GridSection';
import ThemeProvider from './../../src/context/ThemeContext';

const gridSectionItems = [
  {
    id: '0',
    name: 'B-item',
    img: '',
    slug: 'B-item',
  },
  {
    id: '1',
    name: 'A-item',
    img: '',
    slug: 'A-item',
  },
  {
    id: '2',
    name: 'C-item',
    img: '',
    slug: 'C-item',
  },
];

describe('Grid Section', () => {
  it('should sort items ascending and descdenging alphabetically', () => {
    cy.mount(
      <ThemeProvider>
        <GridSection
          data={gridSectionItems}
          label={{ value: 'Test section with one item' }}
          error={{
            value: false,
            fallbackMessage: '',
          }}
          linkUrl={'/'}
          loadingData={false}
        />
      </ThemeProvider>
    );
    const getItemsOrder = (orderedArray: string[]) => {
      cy.get('.GridSectionstyles__GridItem-sc-1eynb7l-2')
        .then(($items) => {
          return $items.map((index, html) => Cypress.$(html).text()).get();
        })
        .should('deep.eq', orderedArray);
    };

    getItemsOrder(['B-item', 'A-item', 'C-item']);

    cy.get('[aria-label="Sort by:"]').click();
    cy.get('button').contains('Name: A - Z').click();
    cy.wait(300);
    getItemsOrder(['A-item', 'B-item', 'C-item']);

    cy.get('[aria-label="Sort by:"]').click();
    cy.get('button').contains('Name: Z - A').click();
    cy.wait(300);
    getItemsOrder(['C-item', 'B-item', 'A-item']);
  });
});
