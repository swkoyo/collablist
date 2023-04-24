import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

import { api } from '~/utils/api';

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session } = api.auth.getSession.useQuery();

  if (session?.user) {
    void router.push('/dashboard');
  }

  return (
    <>
      <Head>
        <title>natodo | another todo app</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center bg-black text-white">
        <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-pink-400">na</span>todo
          </h1>
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={() =>
                void signIn(undefined, { callbackUrl: '/dashboard' })
              }
            >
              Sign in to get started
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
