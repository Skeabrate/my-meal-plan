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

		h1, h2, h3,	h4, h5, h6{
			font-family: ${({ theme }) => theme.fontFamily.abril};
		}

		h1, h2 {
			font-size: ${({ theme }) => theme.fontSize.headingMobile};
			margin-bottom: 3rem;
			position: relative;
			width: fit-content;

			&:after{
				content: '';
				position: absolute;
				width: 80%;
				height: 4px;
				background-color: ${({ theme }) => theme.colors.lightOrange};
				left: 0;
				bottom: -2px;
				z-index: -1;
				border-radius: 1rem;
			}
		}
		
		h3, h4, h5, h6 {
			font-size: 2.2rem;
			font-weight: 400;
		}

		${({ theme }) => theme.mq.tablet} {
			h1, h2{
				font-size: ${({ theme }) => theme.fontSize.headingDesktop};
				margin-bottom: 6rem;

				&:after{
					height: 10px;
					left: -10px;
					bottom: -6px;
				}
			}
		}
	}

	button, a{
		cursor: pointer;
	}
`;
