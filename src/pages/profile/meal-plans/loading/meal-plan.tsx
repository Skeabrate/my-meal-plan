import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ProfileLayout from 'layouts/ProfileLayout/ProfileLayout';
import ProfileTabLayout from 'layouts/ProbileTabLayout/ProbileTabLayout';

const Loading = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/profile/meal-plans/${router.query.id}`);
  });

  return (
    <ProfileTabLayout label=''>
      <div>Loading...</div>
    </ProfileTabLayout>
  );
};

export default Loading as NextPage;

Loading.Layout = ProfileLayout;
