import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import ProfileTabLayuot from 'layouts/ProbileTabLayout/ProbileTabLayout';
import useDeleteAcount from 'api/pscale/useDeleteAcount';
import Loading from 'components/Loading/Loading';

const Overview = () => {
  const { data, status } = useSession();
  const { deleteAccount, isLoading, error } = useDeleteAcount();

  const deleteAccountConfirmation = () => {
    if (confirm('Are you sure you want to delete your account?') && data?.user.email) {
      deleteAccount(data?.user.email);
    }
  };

  return (
    <ProfileTabLayuot
      label='Profile Information:'
      isLoading={status === 'loading'}
    >
      {data?.user.image && (
        <Image
          src={data?.user.image}
          alt={data?.user.name || data?.user.email!}
          height='140'
          width='140'
        />
      )}

      <p>{data?.user.name}</p>
      <p>{data?.user.email}</p>

      <button onClick={deleteAccountConfirmation}>
        {isLoading ? <Loading height={40} /> : 'Delete Account'}
      </button>

      {error ? <p>{error}</p> : null}
    </ProfileTabLayuot>
  );
};

export default Overview;

Overview.Layout = ProfileLayout;
