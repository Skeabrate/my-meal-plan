import React from 'react';
import * as Styled from './MealDetails.styles';
import { useTabs } from 'hooks/useTabs';

const MealDetails = <T extends number>({
  tabs,
}: {
  tabs: { id: T; label: string; Component: React.ReactNode }[];
}) => {
  const { activeDetails, setActiveDetails, selectedTab } = useTabs(tabs);

  return (
    <Styled.MealDetails>
      <Styled.ButtonsBar>
        {tabs.map(({ id, label }) => (
          <h2 key={id}>
            <Styled.Button
              onClick={() => setActiveDetails(id)}
              $isActive={activeDetails === id}
            >
              {label}
            </Styled.Button>
          </h2>
        ))}
      </Styled.ButtonsBar>

      <Styled.Tab>{selectedTab}</Styled.Tab>
    </Styled.MealDetails>
  );
};

export default MealDetails;
