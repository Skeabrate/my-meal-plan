import { useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import * as Styled from 'styles/profile/overview.styles';
import { useMutation } from 'hooks/useMutation';
import { useFetchMealPlansWithAllDetails } from 'api/pscale/useFetchMealPlansWithAllDetails';
import ProfileSvg from 'assets/SVG/Profile';
import EmailSvg from 'assets/SVG/Email';
import DeleteSvg from 'assets/SVG/Delete';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import ProfileTabLayuot from 'layouts/ProbileTabLayout/ProbileTabLayout';
import Loading from 'components/Loading/Loading';
import { useAlertModal } from 'components/AlertModal/AlertModal';

const Overview = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    mealPlansWithAllDetails,
    isLoading: isLoadingFetching,
    isRefetching,
    isError: isErrorFetching,
    error: errorFetching,
  } = useFetchMealPlansWithAllDetails();

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

  useAlertModal(actionErrors);

  const getCount = useMemo(
    () =>
      mealPlansWithAllDetails?.reduce(
        ({ mealsSectionsCount, mealsCount }, { days }) => {
          days.forEach(({ mealsSections }) => {
            mealsSectionsCount += mealsSections.length;

            mealsSections.forEach(({ meals }) => {
              mealsCount += meals.length;
            });
          });

          return { mealsSectionsCount, mealsCount };
        },
        {
          mealsSectionsCount: 0,
          mealsCount: 0,
        }
      ),
    [mealPlansWithAllDetails]
  );

  const stats = [
    {
      label: 'Meal plans:',
      count: mealPlansWithAllDetails?.length,
    },
    {
      label: 'Meals sections:',
      count: getCount?.mealsSectionsCount,
    },
    {
      label: 'Meals:',
      count: getCount?.mealsCount,
    },
  ];

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
        {stats.map(({ label, count }) => (
          <div key={label}>
            <h2>{label}</h2>
            {isLoadingFetching || isRefetching ? <Loading height={48} /> : <p>{count}</p>}
          </div>
        ))}
      </Styled.Stats>
    </ProfileTabLayuot>
  );
};

export default Overview;

Overview.Layout = ProfileLayout;
Overview.requireAuth = true;
