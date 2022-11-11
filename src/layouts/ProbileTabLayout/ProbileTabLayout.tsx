import * as Styled from './ProfileTabLayout.styles';
import Loading from 'components/Loading/Loading';

const ProfileTabLayout = ({
  children,
  label,
  isLoading,
}: {
  children: React.ReactNode;
  label: string;
  isLoading?: boolean;
}) => {
  return (
    <Styled.Tab>
      <header>
        <h1>{label}</h1>
      </header>

      {isLoading ? <Loading /> : <article>{children}</article>}
    </Styled.Tab>
  );
};

export default ProfileTabLayout;
