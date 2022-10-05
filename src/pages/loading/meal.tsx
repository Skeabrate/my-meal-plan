import { useEffect } from 'react';
import { NextPage } from 'next';
import router from 'next/router';

const Loading = () => {
  const { id } = router.query;

  useEffect(() => {
    router.replace(`/meal/${id}`);
  });

  return <div>Loading...</div>;
};

export default Loading as NextPage;
