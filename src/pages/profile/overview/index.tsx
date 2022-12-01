import { useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import * as Styled from 'styles/profile/overview.styles';
import { useMutation } from 'hooks/useMutation';
import { useFetchMealPlans } from 'api/pscale/useFetchMealPlans';
import ProfileSvg from 'assets/SVG/Profile.svg';
import EmailSvg from 'assets/SVG/Email.svg';
import DeleteSvg from 'assets/SVG/Delete.svg';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import ProfileTabLayuot from 'layouts/ProbileTabLayout/ProbileTabLayout';
import Loading from 'components/Loading/Loading';
import { useInfoModal } from 'components/InfoModal/InfoModal';
import ImageLoading from 'components/ImageLoading/ImageLoading';

const Overview = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    mealPlans,
    isLoading: isLoadingFetching,
    isError: isErrorFetching,
    error: errorFetching,
  } = useFetchMealPlans();

  const {
    mutation: deleteAccount,
    isLoading: isLoadingDeleteAccount,
    isError: isErrorDeleteAccount,
    error: errorDeleteAccount,
  } = useMutation('/api/deleteAccount', () => {
    router.push('/api/auth/signin');
  });

  const deleteAccountConfirmation = () => {
    if (confirm('Are you sure you want to delete your account?') && session?.user.id) {
      deleteAccount({ userId: session?.user.id });
    }
  };

  const actionErrors = useMemo(
    () => [
      { isError: isErrorFetching, error: errorFetching },
      { isError: isErrorDeleteAccount, error: errorDeleteAccount },
    ],
    [isErrorFetching, errorFetching, isErrorDeleteAccount, errorDeleteAccount]
  );

  useInfoModal(actionErrors);

  return (
    <ProfileTabLayuot label='Profile Information:'>
      <div>
        <Styled.ProfileInformations>
          <Styled.ProfileImage>
            {session?.user.image && (
              <Image
                src={session?.user.image}
                alt={session?.user.name || session?.user.email!}
                height='140'
                width='140'
              />
            )}
          </Styled.ProfileImage>

          <Styled.ProfileDetails>
            <div>
              {session?.user.name && (
                <p>
                  <ProfileSvg /> {session?.user.name}
                </p>
              )}
              {session?.user.email && (
                <p>
                  <EmailSvg /> {session?.user.email}
                </p>
              )}
            </div>

            <button onClick={deleteAccountConfirmation}>
              {isLoadingDeleteAccount ? <Loading height={20} /> : <DeleteSvg />}
              Delete Account
            </button>
          </Styled.ProfileDetails>
        </Styled.ProfileInformations>
      </div>

      <Styled.Stats>
        <div>
          <h2>Meal plans:</h2>
          <p>0</p>
        </div>

        <div>
          <h2>Meals sections:</h2>
          <p>0</p>
        </div>

        <div>
          <h2>Meals:</h2>
          <p>0</p>
        </div>
      </Styled.Stats>
    </ProfileTabLayuot>
  );
};

export default Overview;

Overview.Layout = ProfileLayout;
Overview.requireAuth = true;
