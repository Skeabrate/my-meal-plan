import Link from 'next/link';
import Image from 'next/image';
import * as Styled from './Footer.styles';
import LogoSrc from 'assets/logo.png';
import GithubSvg from 'assets/SVG/Github.svg';

const Footer = () => {
  return (
    <Styled.Footer>
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

      <p>&copy; {new Date().getFullYear()} Sebastian Świeczkowski</p>
    </Styled.Footer>
  );
};

export default Footer;
