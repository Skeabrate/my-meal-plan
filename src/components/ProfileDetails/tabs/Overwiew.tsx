import { useSession } from 'next-auth/react';
import Image from 'next/image';
import useDeleteAcount from 'api/pscale/useDeleteAcount';
import Loading from 'components/Loading/Loading';

const Overwiew = () => {
  const { data, status } = useSession();
  const { deleteAccount, isLoading, error } = useDeleteAcount();

  const deleteAccountConfirmation = () => {
    if (confirm('Are you sure you want to delete your account?') && data?.user.email) {
      deleteAccount(data?.user.email);
    }
  };

  return status === 'loading' ? (
    <Loading />
  ) : (
    <section>
      <header>
        <h1>Profile Information:</h1>
      </header>

      <article>
        {data?.user.image && (
          <Image
            src={data?.user.image}
            alt={data?.user.name || data?.user.email!}
            height='200'
            width='200'
          />
        )}

        <p>{data?.user.name}</p>
        <p>{data?.user.email}</p>

        <button onClick={deleteAccountConfirmation}>
          {isLoading ? <Loading height={40} /> : 'Delete Account'}
        </button>

        {error ? <p>{error}</p> : null}
      </article>
    </section>
  );
};

export default Overwiew;
