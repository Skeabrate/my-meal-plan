import { StepType } from 'hooks/useGetMealDetails';
import styled from 'styled-components';

const StyledSteps = styled.article`
  details {
    summary {
      font-family: ${({ theme }) => theme.fontFamily.abril};
      font-size: 2rem;
      cursor: pointer;
      padding: 20px;
      border-bottom: 1px solid ${({ theme }) => theme.themeColors.secondBackground};

      &:hover {
        text-decoration: underline;
      }
    }

    p {
      background-color: ${({ theme }) => theme.themeColors.secondBackground};
      padding: 19px 20px 20px;
    }
  }
`;

const Steps = ({ steps }: { steps: StepType[] }) => {
  return (
    <StyledSteps>
      {steps.map(({ id, step, description }) => (
        <details
          open
          key={id}
        >
          <summary>{step}</summary>
          <p>{description}</p>
        </details>
      ))}
    </StyledSteps>
  );
};

export default Steps;
