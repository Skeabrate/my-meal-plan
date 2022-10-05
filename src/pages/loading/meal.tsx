import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as Styled from 'assets/styles/loading-meal.styles';
import MainWrapper from 'templates/MainWrapper';

const Loading = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/meal/${router.query.id}`);
  });

  return (
    <MainWrapper disableAnimation>
      <Styled.Wrapper>
        <Styled.Header>
          <p></p>
          <p></p>
        </Styled.Header>

        <Styled.Content>
          <Styled.Gallery>
            <p></p>
            <p></p>
          </Styled.Gallery>

          <Styled.Tabs>
            <div>
              <p></p>
              <p></p>
              <p></p>
            </div>

            <div>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </Styled.Tabs>
        </Styled.Content>
      </Styled.Wrapper>
    </MainWrapper>
  );
};

export default Loading as NextPage;
