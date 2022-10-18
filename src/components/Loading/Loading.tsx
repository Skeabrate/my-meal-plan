import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';
import { theme } from 'assets/styles/theme/theme';

export const StyledLoading = styled.p<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = ({ height = 400 }: { height?: number }) => {
  return (
    <StyledLoading $height={height}>
      <ClipLoader color={theme.themeColors.font} />
    </StyledLoading>
  );
};

export default Loading;
