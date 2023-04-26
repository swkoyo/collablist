import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

import { api } from '~/utils/api';
import FullPageLoader from '~/components/FullPageLoader';

const Home: NextPage = () => {
  const router = useRouter();
  const {
    data: session,
    isLoading,
    isFetched,
  } = api.auth.getSession.useQuery();

  if (session?.user) {
    void router.push('/app');
  }

  if (isLoading || (isFetched && session?.user)) {
    return <FullPageLoader />;
  }

  return (
    <main className='flex h-screen flex-col items-center '>
      <div className='container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8'>
        <h1 className='text-5xl font-extrabold tracking-tight sm:text-[5rem]'>
          <span className='text-brand-400'>na</span>todo
        </h1>
        <div className='flex flex-col items-center justify-center gap-4'>
          <button
            className='rounded-full bg-white/10 px-10 py-3 font-semibold  no-underline transition hover:bg-white/20'
            onClick={() => void signIn(undefined, { callbackUrl: '/app' })}
          >
            Sign in to get started
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
