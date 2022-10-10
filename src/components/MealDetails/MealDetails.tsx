import { useMemo, useState, ReactNode } from 'react';
import * as Styled from './MealDetails.styles';

type MealDetailsType = {
  tabs: {
    label: string;
    Component: ReactNode;
  }[];
};

const MealDetails = ({ tabs = [] }: MealDetailsType) => {
  const [activeDetails, setActiveDetails] = useState(tabs[0]?.label);
  const selectedTab = useMemo(
    () => tabs.find((tab) => tab.label === activeDetails)?.Component,
    [tabs, activeDetails]
  );

  return (
    <Styled.MealDetails>
      <Styled.ButtonsBar>
        {tabs.map(({ label }) => (
          <h2 key={label}>
            <Styled.Button
              onClick={() => setActiveDetails(label)}
              $isActive={activeDetails === label}
            >
              {label}
            </Styled.Button>
          </h2>
        ))}
      </Styled.ButtonsBar>

      <Styled.DetailsWrapper>{selectedTab}</Styled.DetailsWrapper>
    </Styled.MealDetails>
  );
};

export default MealDetails;
