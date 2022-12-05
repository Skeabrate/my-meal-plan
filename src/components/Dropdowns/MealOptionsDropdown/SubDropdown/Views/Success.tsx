import Link from 'next/link';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { ROUTES } from 'utils/routes';
import { ViewsContext } from '../SubDropdown';

const StyledSuccess = styled.li`
  text-align: left;
  padding: 10px;

  a {
    text-decoration: underline;
    padding: 0;
    margin-top: 6px;
    width: fit-content;
  }
`;

const Success = () => {
  const { options } = useContext(ViewsContext);

  return (
    <StyledSuccess>
      Meal added to {options.mealPlanName}!
      <Link href={`${ROUTES.profile.mealPlans}/${options.mealPlanName}`}>Go to meal plan</Link>
    </StyledSuccess>
  );
};

export default Success;
