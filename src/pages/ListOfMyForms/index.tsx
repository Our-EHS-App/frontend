import { ColumnsType } from 'antd/es/table';
import { FC, ReactNode, useState } from 'react';
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
import { dateFormatter } from '../../helpers/dateFormatter';
import { Input } from 'antd';
import { OutlineButton } from '../../components/OutlineButton';
import { PrimaryButton } from '../../components/PrimaryButton';

export const getStatusColor = (s: string) => {
  switch (s) {
    case 'DRAFT':
      return 'gold';
    case 'COMPLETED':
      return 'blue';
  }
};
export const ListOfMyForms: FC = () => {
  const { t, i18n } = useTranslation();
  const [nameSearch, setNameSearch] = useState<string | undefined>(undefined);
  const { language } = i18n;
  const { getMyForms } = useSurveyForm();

  const [pageConfig, setPageConfig] = useState<PageConfig>({
    size: 10,
    totalElements: 0,
    totalPages: 0,
    page: 1,
  });

  const handleNameSearch = (name?: string) => {
    if (name) {
      setPageConfig((p) => ({ ...p, name }));
    }
  };

  const handleClearNameSearch = () => {
    setPageConfig((p) => ({ ...p, name: null }));
    setNameSearch(undefined);
  };

  const FormListQuery = useQuery(
    [
      'FormListQuery-mytmplt',
      pageConfig?.page,
      pageConfig?.sort,
      pageConfig?.name,
    ],
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
      width: 150,
      sorter: true,
    },
    {
      title: `${t('FORM_TABLE.NAME')}`,
      dataIndex: ['templateDTO', 'titleAr'],
      key: 'titleAr',
      width: 200,
      ellipsis: true,
      filterDropdown: () => (
        <div className='w-80'>
          <div className='p-4'>
            <div className='pb-4'>{`${t('ACTION.SEARCH_FOR')}`}</div>
            <Input
              value={nameSearch}
              placeholder={`${t('ACTION.SEARCH_FOR')}`}
              maxLength={100}
              onChange={(v) => {
                if (
                  v?.target?.value?.trim()?.length ||
                  v?.target?.value?.length == 0
                ) {
                  setNameSearch(v.target.value);
                }
              }}
            />
            <div className='pt-4 flex justify-between'>
              <OutlineButton
                id={'clear-search'}
                text={`${t('ACTION.CLEAR')}`}
                onClick={() => handleClearNameSearch()}
              />
              <PrimaryButton
                id={'search-name'}
                text={`${t('ACTION.SEARCH')}`}
                onClick={() => handleNameSearch(nameSearch)}
              />
            </div>
          </div>
        </div>
      ),
      render: (text) => <span title={text}>{text}</span>,
    },
    {
      title: `${t('FORM_TABLE.CREATED_AT')}`,
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: 200,
      ellipsis: true,
      sorter: true,
      render: (text) => (
        <span>{dateFormatter(text, language, 'YYYY/MM/DD hh:mmA')}</span>
      ),
    },
    {
      title: `${t('FORM_TABLE.Category')}`,
      dataIndex: 'templateDTO.subCategory',
      key: 'nameAr',
      width: 200,
      ellipsis: true,
      render: (rvalue: any, record: any) => (
        <span>
          {record['templateDTO']?.['subCategory']?.['nameAr'] &&
          record['templateDTO']?.['subCategory']?.['nameEn']
            ? language === 'ar'
              ? record['templateDTO']?.['subCategory']?.['nameAr']
              : record['templateDTO']?.['subCategory']?.['nameEn']
            : ''}
        </span>
      ),
    },
    {
      title: ``,
      dataIndex: ['templateDTO', 'id'],
      key: 'id',
      width: 100,
      render: (text) => (
        <Link className={`text-[#0075EF]`} to={`/form/fill-template/${text}`}>
          {t('FORM_TABLE.DETAILS')}
        </Link>
      ),
    },
  ];

  const handleTableChange: HandleChangeArgs<ReactNode> = (
    pagination,
    filters,
    sorter
  ) => {
    const { current = 1, pageSize = 10 } = pagination;
    const { columnKey, order }: any = sorter;
    let requestPrams: Partial<any> = {};
    requestPrams = {
      page: current,
      size: pageSize,
      sort:
        columnKey && order
          ? `${columnKey},${order.replace('end', '')}`
          : 'createdDate,desc',
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
        dataSource={FormListQuery?.data?.templateLocationsDTOS?.content}
        columns={unassignedColumns}
        loading={FormListQuery?.isLoading}
        pagination={{
          pageSize: pageConfig.size,
          current: pageConfig.page,
          total: FormListQuery?.data?.totalElements ?? 0,
        }}
        onChange={handleTableChange}
      />
    </PagePadding>
  );
};
