import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PageHeader } from '../../components/PageHeader';
import { PagePadding } from '../../components/PagePadding';
import { Bar } from 'react-chartjs-2';
import { Progress, Space } from 'antd';

interface ChartProps {
  data: number[];
  labels: string[];
}

export const Dashboards: FC = () => {
  const { t } = useTranslation();
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
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
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

  return (
    <PagePadding>
      <PageHeader title={`${t('TITLE.Dashboards')}`} />
      <div className='flex gap-4'>
        <div className='w-[500px] h-[300px] bg-white p-5 rounded-lg'>
          <Bar data={chartData} options={options} />
        </div>
        <div className='w-[500px] h-[300px] bg-white p-5 rounded-lg flex items-center justify-center'>
          <div>
            <div className='text-lg pb-4 text-center'>{`${t(
              'GENERAL.Inspections_Completed'
            )}`}</div>
            <div className=''>
              <Progress type='circle' percent={75} />
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-4 mt-4'>
        <div className='w-[500px] h-[300px] bg-white p-5 rounded-lg flex items-center justify-center'>
          <div>
            <div className='text-lg pb-4 text-center'>{`${t(
              'GENERAL.Safety_compliance'
            )}`}</div>
            <div className=''>
              <Progress type='circle' percent={90} />
            </div>
          </div>
        </div>
        <div className='w-[500px] h-[300px] bg-white p-5 rounded-lg flex items-center justify-center'>
          <div>
            <div className='text-lg pb-4 text-center'>{`${t(
              'GENERAL.ISO_compliance'
            )}`}</div>
            <div className=''>
              <Progress type='circle' percent={30} />
            </div>
          </div>
        </div>
      </div>
    </PagePadding>
  );
};
