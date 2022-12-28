import { useContext } from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';
import { themeVariants } from 'styles/theme/theme';
import { ThemeContext } from 'context/ThemeContext';

export const StyledLoading = styled.p<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = ({ height = 400 }: { height?: number }) => {
  const { themeStyle } = useContext(ThemeContext);

  return (
    <StyledLoading
      aria-label='loading spinner'
      $height={height}
    >
      <ClipLoader color={themeVariants[themeStyle].themeColors.font} />
    </StyledLoading>
  );
};

export default Loading;
