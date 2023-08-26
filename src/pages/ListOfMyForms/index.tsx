import { ColumnsType } from 'antd/es/table';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { HaseenTable } from '../../components/HaseenTable';
import { PageHeader } from '../../components/PageHeader';
import { PagePadding } from '../../components/PagePadding';
import { WhiteContainer } from '../../components/WhiteContainer';

import { useQuery } from '@tanstack/react-query';
import { HandleChangeArgs, PageConfig } from '../../interfaces/ICommon';
import { useSurveyForm } from '../../services/surveyService';

import { Loading } from '../../components/Loading';
import classes from './ListOfMyForms.module.scss';

export const getStatusColor = (s: string) => {
  switch (s) {
    case 'DRAFT':
      return 'gold';
    case 'COMPLETED':
      return 'blue';
  }
};
export const ListOfMyForms: FC = () => {
  const { t } = useTranslation();
  const { getMyForms } = useSurveyForm();

  const [pageConfig, setPageConfig] = useState<PageConfig>({
    size: 10,
    totalElements: 0,
    totalPages: 0,
    page: 1,
  });

  const FormListQuery = useQuery(
    ['FormListQuery-mytmplt', pageConfig?.page],
    () =>
      getMyForms({
        ...pageConfig,
        page: pageConfig.page - 1,
      })
  );

  const unassignedColumns: ColumnsType<any> = [
    {
      title: `${t('FORM_TABLE.NUMBER')}`,
      dataIndex: ['templateDTO', 'id'],
      key: 'id',
      width: 30,
    },
    {
      title: `${t('FORM_TABLE.NAME')}`,
      dataIndex: ['templateDTO', 'titleAr'],
      key: 'titleAr',
      width: 50,
      ellipsis: true,
      render: (text) => <span title={text}>{text}</span>,
    },
    {
      title: ``,
      dataIndex: ['templateDTO', 'id'],
      key: 'id',
      width: 30,
      render: (text) => (
        <Link className={`text-[#0075EF]`} to={`/form/${text}`}>
          {t('FORM_TABLE.DETAILS')}
        </Link>
      ),
    },
  ];

  const handleTableChange: HandleChangeArgs<any> = async (
    pagination,
    sorter
  ) => {
    const { current = 1, pageSize = 10 } = pagination;
    const { columnKey, order }: any = sorter;

    let requestPrams: Partial<PageConfig> = {};
    requestPrams = {
      page: current,
      size: pageSize,
      sort:
        columnKey && order
          ? `${columnKey},${order.replace('end', '')}`
          : 'lastUpdatedAt,desc',
    };
    setPageConfig((p) => ({ ...p, ...requestPrams }));
  };

  if (FormListQuery.isFetching) {
    return <Loading />;
  }

  return (
    <PagePadding>
      <PageHeader title={`${t('TITLE.MY_Templates')}`} />
      <HaseenTable
        dataSource={FormListQuery?.data?.templateLocationsDTOS}
        columns={unassignedColumns}
        loading={FormListQuery?.isLoading}
        pagination={{
          pageSize: pageConfig.size,
          total: FormListQuery?.data?.totalElements ?? 0,
        }}
        onChange={handleTableChange}
      />
    </PagePadding>
  );
};
