import { FC } from 'react';

import { PagePadding } from '../PagePadding';
import { PageHeader } from '../PageHeader';

import classes from './Loading.module.scss';

export const FullScreenLoading: FC = () => {
  return (
    <div className={classes.container}>
      <span className={classes.loader} />
    </div>
  );
};

export const Loading: FC = () => {
  return (
    <PagePadding className={'flex flex-col flex-1'}>
      <PageHeader title={''} />
      <LoadingComponent />
    </PagePadding>
  );
};
const LoadingComponent: FC = () => {
  return (
    <div className={classes.notFullScreen}>
      <span className={classes.loader} />
    </div>
  );
};
