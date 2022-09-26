import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import LogoSrc from 'assets/logo.png';
import GithubSvg from 'assets/SVG/Github.svg';

const StyledFooter = styled.footer`
  padding: 8rem 0 4rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;

  a {
    padding-bottom: 1rem;
  }

  p {
    font-size: 1.4rem;
  }

  img {
    filter: grayscale(1);
  }

  svg {
    path {
      transition: fill 0.2s ease-in-out;
    }

    &:hover path {
      fill: ${({ theme }) => theme.colors.orange};
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Link
        href='/'
        aria-label='navigate to homepage'
      >
        <a>
          <Image
            src={LogoSrc}
            alt='My Meal Plan'
            priority
            height='80'
            width='128'
          />
        </a>
      </Link>

      <Link href='https://github.com/Skeabrate/my-meal-plan'>
        <a
          title='Github'
          target='_blank'
          rel='noopener noreferrer'
        >
          <GithubSvg />
        </a>
      </Link>

      <p>
        &copy; {new Date().getFullYear()} Sebastian Świeczkowski
        <span style={{ display: 'block' }}>All rights reserved</span>
      </p>
    </StyledFooter>
  );
};

export default Footer;
