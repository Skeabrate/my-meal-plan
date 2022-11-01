import * as Styled from './MealDetails.styles';
import { useTabs, TabsType } from 'hooks/useTabs';

const MealDetails = ({ tabs }: { tabs: TabsType }) => {
  const { activeDetails, setActiveDetails, selectedTab } = useTabs(tabs);

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

      <Styled.Tab>{selectedTab}</Styled.Tab>
    </Styled.MealDetails>
  );
};

export default MealDetails;
