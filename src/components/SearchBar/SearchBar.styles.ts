import styled from 'styled-components';

export const SearchBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
`;

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.7;
  z-index: -1;
`;

export const InputWrapper = styled.div``;

export const Results = styled.div`
  width: calc(100% - 40px);
  background: red;
`;
