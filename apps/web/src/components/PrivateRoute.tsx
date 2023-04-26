import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { api } from '~/utils/api';
import FullPageLoader from './FullPageLoader';

const PrivateRoute: React.FC<{
  protectedRoutes: string[];
  children: React.ReactNode;
}> = ({ protectedRoutes, children }) => {
  const router = useRouter();
  const { data, isLoading } = api.auth.getSession.useQuery();

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    if (!isLoading && !data?.user && pathIsProtected) {
      void router.push('/');
    }
  }, [isLoading, router, data, pathIsProtected]);

  if ((isLoading || !data?.user) && pathIsProtected) {
    return <FullPageLoader />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
