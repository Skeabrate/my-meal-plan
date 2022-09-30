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
				box-shadow: 0 0 0 1px white, 0 0 0 2px ${({ theme }) => theme.colors.lightOrange};
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
					height: 5px;
					left: 0;
					bottom: 0;
				}
			}
		}
	}

	input[type="color"],
	input[type="date"],
	input[type="datetime"],
	input[type="datetime-local"],
	input[type="email"],
	input[type="month"],
	input[type="number"],
	input[type="password"],
	input[type="search"],
	input[type="tel"],
	input[type="text"],
	input[type="time"],
	input[type="url"],
	input[type="week"],
	select:focus,
	textarea {
		font-size: 16px;
	}

	button, a{
		cursor: pointer;
	}
`;
