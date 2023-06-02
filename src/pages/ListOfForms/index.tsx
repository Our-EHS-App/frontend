import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { Dayjs } from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';

import { PageHeader } from '../../components/PageHeader';
import { PagePadding } from '../../components/PagePadding';
import { HaseenTable } from '../../components/HaseenTable';
import { WhiteContainer } from '../../components/WhiteContainer';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Tag } from '../../components/Tag';

import { useSurveyForm } from '../../services/surveyService';
import { HandleChangeArgs, PageConfig } from '../../interfaces/ICommon';
import { useQuery } from '@tanstack/react-query';
import { keys } from '../../helpers';
import { dateFormatter } from '../../helpers/dateFormatter';

import classes from './ListOfForms.module.scss';
import React from 'react';

export const getStatusColor = (s: string) => {
  switch (s) {
    case 'DRAFT':
      return 'gold';
    case 'COMPLETED':
      return 'blue';
  }
};
export const ListOfForms: FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const navigate = useNavigate();
  const { getForms } = useSurveyForm();
  const [pageConfig, setPageConfig] = useState<PageConfig>({
    size: 10,
    totalElements: 0,
    totalPages: 0,
    page: 1,
  });

  const FormListQuery = useQuery([keys.formList, pageConfig?.page], () =>
    getForms({
      ...pageConfig,
      page: pageConfig.page - 1,
    })
  );

  const unassignedColumns: ColumnsType<any> = [
    {
      title: `${t('FORM_TABLE.NUMBER')}`,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: `${t('FORM_TABLE.NAME')}`,
      dataIndex: 'titleAr',
      key: 'titleAr',
      ellipsis: true,
      render: (text) => <span title={text}>{text}</span>,
    },
    {
      title: ``,
      dataIndex: 'id',
      key: 'id',
      render: (text) => (
        <Link className={`text-[#0075EF]`} to={`${text}/view`}>
          {t('FORM_TABLE.DETAILS')}
        </Link>
      ),
    },
  ];

  const pageExtra = () => {
    return (
      <PrimaryButton
        id={'create_new_form'}
        text={`${t('ACTION.CREATE_NEW_FORM')}`}
        onClick={() => navigate(`/form-create`)}
        icon={<PlusOutlined />}
      />
    );
  };

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

  return (
    <PagePadding>
      <PageHeader title={``} extra={pageExtra()} />
      <WhiteContainer className={classes.listOfFormsRoundedContainer}>
        <HaseenTable
          dataSource={FormListQuery?.data}
          columns={unassignedColumns}
          loading={FormListQuery?.isLoading}
          pagination={{
            pageSize: pageConfig.size,
            total: FormListQuery?.data?.totalElements ?? 0,
          }}
          onChange={handleTableChange}
        />
      </WhiteContainer>
    </PagePadding>
  );
};
