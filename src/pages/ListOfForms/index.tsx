import { PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { HaseenTable } from '../../components/HaseenTable';
import { PageHeader } from '../../components/PageHeader';
import { PagePadding } from '../../components/PagePadding';
import { PrimaryButton } from '../../components/PrimaryButton';
import { WhiteContainer } from '../../components/WhiteContainer';

import { useQuery } from '@tanstack/react-query';
import { keys } from '../../helpers';
import { HandleChangeArgs, PageConfig } from '../../interfaces/ICommon';
import { useSurveyForm } from '../../services/surveyService';

import classes from './ListOfForms.module.scss';
import { handleErrorNotifications } from '../../helpers/errorHandler';
import { notification } from 'antd';
import { Loading } from '../../components/Loading';

export const getStatusColor = (s: string) => {
  switch (s) {
    case 'DRAFT':
      return 'gold';
    case 'COMPLETED':
      return 'blue';
    default:
      return '';
  }
};

export const ListOfForms: FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { language } = i18n;
  const { organizationTemplateImport, getForms } = useSurveyForm();
  const { mutate } = useMutation(organizationTemplateImport, {
    onError: (error) => {
      handleErrorNotifications(error as any);
    },
    onSuccess: (data) => {
      notification.success({
        message: 'Success',
        duration: 1.5,
      });
    },
  });

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
      width: 150,
    },
    {
      title: `${t('FORM_TABLE.NAME')}`,
      dataIndex: 'titleAr',
      key: 'titleAr',
      width: 200,
      ellipsis: true,
      render: (text) => <span title={text}>{text}</span>,
    },
    {
      title: `${t('FORM_TABLE.CREATED_AT')}`,
      dataIndex: 'CREATED_AT',
      key: 'CREATED_AT',
      width: 150,
      ellipsis: true,
      render: (text) => <span title={text}>{text}</span>,
    },
    {
      title: `${t('FORM_TABLE.Category')}`,
      dataIndex: 'CREATED_AT',
      key: 'CREATED_AT',
      width: 150,
      ellipsis: true,
      render: (text) => <span title={text}>{text}</span>,
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (id) => (
        <div
          className={`text-[#0075EF] cursor-pointer`}
          onClick={() => {
            mutate({
              orgId: 1101,
              templateId: id,
              locationIds: [1201],
            });
          }}>
          {t('FORM_TABLE.IMPORT')}
        </div>
      ),
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (text) => (
        <Link className={`text-[#0075EF]`} to={`/form/${text}`}>
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

    const requestParams: Partial<PageConfig> = {
      page: current,
      size: pageSize,
      sort:
        columnKey && order
          ? `${columnKey},${order.replace('end', '')}`
          : 'lastUpdatedAt,desc',
    };

    setPageConfig((prevPageConfig) => ({
      ...prevPageConfig,
      ...requestParams,
    }));
  };

  if (FormListQuery.isFetching) {
    return <Loading />;
  }

  return (
    <PagePadding>
      <PageHeader title={`${t('TITLE.Templates')}`} extra={pageExtra()} />
      <HaseenTable
        dataSource={FormListQuery?.data ? FormListQuery?.data : []}
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
