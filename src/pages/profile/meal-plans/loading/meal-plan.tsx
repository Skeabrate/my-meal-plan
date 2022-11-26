import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as Styled from 'styles/profile/meal-plans/loading-meal-plans.styles';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import { Tab } from 'layouts/ProbileTabLayout/ProfileTabLayout.styles';
import LoadingComponent from 'components/Loading/Loading';

const Loading = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/profile/meal-plans/${router.query.mealPlanName}`);
  });

  return (
    <Tab>
      <Styled.Header>
        <h1></h1>
      </Styled.Header>

      <Styled.Content>
        <h2></h2>
        <button></button>

        <Styled.Days>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </Styled.Days>

        <button></button>
      </Styled.Content>

      <LoadingComponent height={155} />
    </Tab>
  );
};

export default Loading as NextPage;

Loading.Layout = ProfileLayout;
