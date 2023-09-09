import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PageHeader } from '../../components/PageHeader';
import { PagePadding } from '../../components/PagePadding';
import { Bar } from 'react-chartjs-2';
import { Progress, Space } from 'antd';
import { useSurveyForm } from '@services/surveyService';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../../components/Loading';

interface ChartProps {
  data: number[];
  labels: string[];
}

export const Dashboards: FC = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const { getDashboards } = useSurveyForm();

  const DashboardsListQuery = useQuery(['dsh'], () => getDashboards());

  const chartData = {
    labels: [
      'location A',
      'location B',
      'location C',
      'location D',
      'location F',
      'location G',
    ],
    datasets: [
      {
        label: 'Inspections',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

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
          <Bar data={chartData} options={options} />
        </div>
        {DashboardsListQuery?.data?.map?.((dashboards: any) => (
          <div
            key={dashboards?.id}
            className='bg-white p-5 rounded-lg flex items-center justify-center'>
            {/* Content for Column 3 */}
            <div>
              <div className='text-lg pb-4 text-center'>
                {language === 'ar'
                  ? dashboards?.categoryDTO?.nameAr
                  : dashboards?.categoryDTO?.nameEn}
              </div>
              <div className=''>
                <Progress type='circle' percent={dashboards?.percentage} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </PagePadding>
  );
};
