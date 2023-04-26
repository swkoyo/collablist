import { type ReactElement } from 'react';

import Layout from '~/components/Layout';
import { type NextPageWithLayout } from '../_app';

const LabelsPage: NextPageWithLayout = () => {
  return <div>HI</div>;
};

export default LabelsPage;

LabelsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
