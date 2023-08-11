import { PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
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

import classes from './ListOfMyForms.module.scss';
import { handleErrorNotifications } from '../../helpers/errorHandler';
import { notification } from 'antd';

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
  const navigate = useNavigate();
  const { organizationTemplateImport, getMyForms } = useSurveyForm();
  const { mutate } = useMutation(organizationTemplateImport, {
    onError: (error) => {
      handleErrorNotifications(error as any);
    },
    onSuccess: (data) => {
      notification.success({
        message: 'success',
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
    getMyForms({
      ...pageConfig,
      page: pageConfig.page - 1,
    })
  );

  const unassignedColumns: ColumnsType<any> = [
    {
      title: `${t('FORM_TABLE.NUMBER')}`,
      dataIndex: 'id',
      key: 'id',
      width: 30,
    },
    {
      title: `${t('FORM_TABLE.NAME')}`,
      dataIndex: 'titleAr',
      key: 'titleAr',
      width: 50,
      ellipsis: true,
      render: (text) => <span title={text}>{text}</span>,
    },
    // {
    //   title: ``,
    //   dataIndex: 'id',
    //   key: 'id',
    //   width: 30,
    //   render: (id) => (
    //     <div
    //       className={`text-[#0075EF] cursor-pointer`}
    //       onClick={() => {
    //         mutate({
    //           orgId: 1101,
    //           templateId: id,
    //           locationIds: [1201],
    //         });
    //       }}>
    //       {t('FORM_TABLE.IMPORT')}
    //     </div>
    //   ),
    // },
    {
      title: ``,
      dataIndex: 'id',
      key: 'id',
      width: 30,
      render: (text) => (
        <Link className={`text-[#0075EF]`} to={`${text}/view`}>
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

  return (
    <PagePadding>
      <PageHeader title={`${t('TITLE.MY_Templates')}`} />
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
