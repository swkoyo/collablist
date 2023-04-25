import { type ReactElement, type ReactNode } from 'react';
import { type NextPage } from 'next';
import type { AppProps, AppType } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '~/utils/api';
import '../styles/globals.css';

interface AppPageProps {
  session: Session | null;
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<AppPageProps> & {
  Component: NextPageWithLayout;
};

const MyApp: AppType<AppPageProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);

  return <SessionProvider session={session}>{layout}</SessionProvider>;
};

export default api.withTRPC(MyApp);
