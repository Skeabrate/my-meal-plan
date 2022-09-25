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
		font-family: ${({ theme }) => theme.fontFamily.lato};
		font-size: ${({ theme }) => theme.fontSize.paragraph};

		h1, h2 {
			font-family: ${({ theme }) => theme.fontFamily.abril};
		}

		h1{
			font-size: ${({ theme }) => theme.fontSize.h1Mobile};
		}

		${({ theme }) => theme.mq.tablet} {
			h1{
			font-size: ${({ theme }) => theme.fontSize.h1Desktop};
		}
		}
	}

	button, a{
		cursor: pointer;
	}
`;
