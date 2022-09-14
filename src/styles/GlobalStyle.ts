import { createGlobalStyle } from 'styled-components';

export const GlobaStyles = createGlobalStyle`
	*, *::after, *::before{
		-webkit-font-smothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	html{
		font-size: 62.5%;
	}

	body {
		padding: 0;
		margin: 0;
		overflow-x: hidden !important;
		font-family: ${({ theme }) => theme.fontFamily.lato};
		font-size: ${({ theme }) => theme.fontSize.paragraph};
	}

	button, a{
		cursor: pointer;
	}
`;
