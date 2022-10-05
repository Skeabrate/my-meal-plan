import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Loading = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/meal/${router.query.id}`);
  });

  return <div>Loading...</div>;
};

export default Loading as NextPage;
