import styled from 'styled-components';

const StyledInstruction = styled.article`
  line-height: 1.5;
`;

const Instruction = ({ instruction }: { instruction: string }) => {
  return <StyledInstruction>{instruction}</StyledInstruction>;
};

export default Instruction;
