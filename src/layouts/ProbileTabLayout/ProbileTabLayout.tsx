import * as Styled from './ProfileTabLayout.styles';

const ProfileTabLayout = ({
  children,
  label,
  noAnimation,
}: {
  children: React.ReactNode;
  label: string;
  noAnimation?: boolean;
}) => {
  return (
    <Styled.Tab $noAnimation={noAnimation}>
      <header>
        <h1>{label}</h1>
      </header>

      <article>{children}</article>
    </Styled.Tab>
  );
};

export default ProfileTabLayout;
