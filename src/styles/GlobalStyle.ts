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
			line-height: 1.2;

			&:after{
				content: '';
				position: absolute;
				width: 60%;
				height: 4px;
				background-color: ${({ theme }) => theme.colors.orange};
				left: 0;
				bottom: -6px;
				${({ theme }) => theme.boxShadow(theme.colors.orange)};
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
				}
			}
		}
	}

	* {
		::-webkit-scrollbar-track {
			background-color: white;
		}
		::-webkit-scrollbar {
			width: 14px;
			height: 8px;
		}
		::-webkit-scrollbar-thumb {
			background: ${({ theme }) => theme.colors.grey};
			border-radius: 100px;
			border: 3px solid white;
			background-clip: padding-box;

			&:hover {
				background-color: #c0c0c0;
			}

			&:active {
				background-color: ${({ theme }) => theme.colors.blue};
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
