import React from 'react';
import MountWithProviders from './../../src/utils/MountWithProviders';
import { useTabs } from './../../src/hooks/useTabs';

type TabExistState = 'exist' | 'not.exist';
type ActiveTabColor = 'rgb(255, 0, 0)' | 'rgb(255, 255, 255)';

const tabs = [
  {
    id: 0,
    label: 'First',
    Component: 'First Tab Component',
  },
  {
    id: 1,
    label: 'Second',
    Component: 'Second Tab Component',
  },
  {
    id: 2,
    label: 'Third',
    Component: 'Third Tab Component',
  },
];

const Tabs = () => {
  const { activeDetails, selectedTab, setActiveDetails } = useTabs(tabs);

  return (
    <main>
      <ul>
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveDetails(id)}
            style={{
              backgroundColor: activeDetails === id ? 'rgb(255, 0, 0)' : 'rgb(255, 255, 255)',
            }}
          >
            {label}
          </button>
        ))}
      </ul>

      <section>{selectedTab}</section>
    </main>
  );
};

describe('Tabs', () => {
  it('switch between tabs and highlight active tab with red background', () => {
    cy.mount(
      <MountWithProviders>
        <Tabs />
      </MountWithProviders>
    );

    const getButtonsColors = (
      firstTabColor: ActiveTabColor,
      secondTabColor: ActiveTabColor,
      thirdTabColor: ActiveTabColor
    ) => {
      cy.get('button')
        .contains(tabs[0].label)
        .should('have.css', 'background-color', firstTabColor);
      cy.get('button')
        .contains(tabs[1].label)
        .should('have.css', 'background-color', secondTabColor);
      cy.get('button')
        .contains(tabs[2].label)
        .should('have.css', 'background-color', thirdTabColor);
    };

    const checkIfTabComponentsExistsInDom = (
      firstTabState: TabExistState,
      secondTabState: TabExistState,
      ThirdTabState: TabExistState
    ) => {
      cy.get('section').contains(tabs[0].Component).should(firstTabState);
      cy.get('section').contains(tabs[1].Component).should(secondTabState);
      cy.get('section').contains(tabs[2].Component).should(ThirdTabState);
    };

    // Initial state - default to first
    getButtonsColors('rgb(255, 0, 0)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)');
    checkIfTabComponentsExistsInDom('exist', 'not.exist', 'not.exist');

    // Second Tab
    cy.get('button').contains(tabs[1].label).click();
    getButtonsColors('rgb(255, 255, 255)', 'rgb(255, 0, 0)', 'rgb(255, 255, 255)');
    checkIfTabComponentsExistsInDom('not.exist', 'exist', 'not.exist');

    // Third Tab
    cy.get('button').contains(tabs[2].label).click();
    getButtonsColors('rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 0, 0)');
    checkIfTabComponentsExistsInDom('not.exist', 'not.exist', 'exist');

    // First Tab - initial tab
    cy.get('button').contains(tabs[0].label).click();
    getButtonsColors('rgb(255, 0, 0)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)');
    checkIfTabComponentsExistsInDom('exist', 'not.exist', 'not.exist');
  });
});
