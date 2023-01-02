import { useContext, useMemo } from 'react';
import { useRouter } from 'next/router';
import * as Styled from 'styles/profile/overview.styles';
import { useMutation } from 'hooks/useMutation';
import { useSessionHelper } from 'hooks/useSessionHelper';
import { useFetchMealPlansWithAllDetails } from 'api/pscale/useFetchMealPlansWithAllDetails';
import { TEST_USER } from 'utils/testUser';
import { ROUTES } from 'utils/routes';
import { AlertModalContext } from 'context/AlertModalContext';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import ProfileTabLayuot from 'layouts/ProbileTabLayout/ProbileTabLayout';
import ProfileSvg from 'assets/SVG/Profile';
import EmailSvg from 'assets/SVG/Email';
import DeleteSvg from 'assets/SVG/Delete';
import Loading from 'components/Loading/Loading';
import { useAlertModal } from 'components/AlertModal/AlertModal';

const Overview = () => {
  const { data: session } = useSessionHelper();
  const { openAlertModal } = useContext(AlertModalContext);
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
    router.push(ROUTES.profile.logIn).then(() => {
      openAlertModal('success', 'Account deleted successfully');
    });
  });

  const deleteAccountConfirmation = () => {
    if (confirm('Are you sure you want to delete your account?')) {
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
              <img
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
