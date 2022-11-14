import * as Styled from './ProfileTabLayout.styles';

const ProfileTabLayout = ({ children, label }: { children: React.ReactNode; label: string }) => {
  return (
    <Styled.Tab>
      <header>
        <h1>{label}</h1>
      </header>

      <article>{children}</article>
    </Styled.Tab>
  );
};

export default ProfileTabLayout;
