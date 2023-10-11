import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PageHeader } from '../../components/PageHeader';
import { PagePadding } from '../../components/PagePadding';
import { Bar } from 'react-chartjs-2';
import { Progress } from 'antd';
import { useSurveyForm } from '@services/surveyService';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../../components/Loading';
import WarehouseChart from '../../components/WarehouseChart';

interface ChartProps {
  data: number[];
  labels: string[];
}

export const Dashboards: FC = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const { getDashboards, getByLocation } = useSurveyForm();
  const LocationListQuery = useQuery(['oihuuei'], () => getByLocation());

  const DashboardsListQuery = useQuery(['dsh'], () => getDashboards());
  const { data, isLoading, isError } = useQuery(
    ['getByLocation'],
    () => getByLocation
  );

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (DashboardsListQuery.isFetching) {
    return <Loading />;
  }

  return (
    <PagePadding>
      <PageHeader title={`${t('TITLE.Dashboards')}`} />
      <div className='grid md:grid-cols-2 gap-4'>
        <div className='bg-white w-full md:w-[500px] p-5 rounded-lg'>
          <WarehouseChart LocationListQuery={LocationListQuery} />
        </div>
        {DashboardsListQuery?.data &&
          DashboardsListQuery?.data?.map?.((dashboards: any) => (
            <div
              key={dashboards?.id}
              className='bg-white p-5 rounded-lg flex items-center justify-center'>
              <div>
                <div className='text-lg pb-4 text-center'>
                  {language === 'ar'
                    ? dashboards?.categoryDTO?.nameAr
                    : dashboards?.categoryDTO?.nameEn}
                </div>
                <div className=''>
                  {dashboards?.percentage === 100.0 ? (
                    <Progress
                      type='circle'
                      percent={100}
                      format={() => '100%'}
                    />
                  ) : (
                    <Progress
                      type='circle'
                      percent={dashboards?.percentage}
                      format={() => `${dashboards?.percentage}%`}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </PagePadding>
  );
};
