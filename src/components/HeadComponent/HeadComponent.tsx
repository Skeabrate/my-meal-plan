import Head from 'next/head';

const HeadComponent = () => {
  return (
    <Head>
      <title>My Meal Plan</title>
      <meta
        name='description'
        content='Meal Plan app'
      />
      <link
        rel='icon'
        href='/favicon.ico'
      />
    </Head>
  );
};

export default HeadComponent;
