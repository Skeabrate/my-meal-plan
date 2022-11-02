import * as Styled from './MealDetails.styles';
import { useTabs, TabType } from 'hooks/useTabs';

const MealDetails = ({ tabs }: { tabs: TabType[] }) => {
  const { activeDetails, setActiveDetails, selectedTab } = useTabs(tabs);

  return (
    <Styled.MealDetails>
      <Styled.ButtonsBar>
        {tabs.map(({ id, label }) => (
          <h2 key={id}>
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
