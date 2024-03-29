import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { FC, ReactNode, useState } from 'react';
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
import { Input, notification } from 'antd';
import { Loading } from '../../components/Loading';
import { dateFormatter } from '../../helpers/dateFormatter';
import { ImportTemplates } from '../../components/ImportTemplates';
import { OutlineButton } from '../../components/OutlineButton';

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
  const { language } = i18n;
  const [importModal, setImportModal] = useState(false);
  const [nameSearch, setNameSearch] = useState<string | undefined>(undefined);
  const [idForm, setIdForm] = useState('');
  const navigate = useNavigate();
  const { organizationTemplateImport, getForms, getLocations } =
    useSurveyForm();
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

  const locaionListQuery = useQuery(['list-/api/locaion'], () =>
    getLocations()
  );

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
    ['list-mytem', pageConfig?.page, pageConfig?.sort, pageConfig?.name],
    () =>
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
      sorter: true,
    },
    {
      title: `${t('FORM_TABLE.NAME')}`,
      dataIndex: 'titleAr',
      key: 'titleAr',
      width: 200,
      ellipsis: true,
      filterIcon: <SearchOutlined />,
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
      dataIndex: ['subCategory', 'nameAr'],
      key: 'nameAr',
      width: 200,
      ellipsis: true,
      render: (rvalue: any, record: any) => (
        <span>
          {record['subCategory']?.['nameAr'] &&
          record['subCategory']?.['nameEn']
            ? language === 'ar'
              ? record['subCategory']?.['nameAr']
              : record['subCategory']?.['nameEn']
            : ''}
        </span>
      ),
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 150,
      render: (id) => (
        <div
          className={`text-[#0075EF] cursor-pointer`}
          onClick={() => {
            setIdForm(id);
            setImportModal(true);
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
        <Link className={`text-[#0075EF]`} to={`/template/${text}`}>
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
      <PageHeader title={`${t('TITLE.Templates')}`} extra={pageExtra()} />
      <HaseenTable
        dataSource={
          FormListQuery?.data?.content ? FormListQuery?.data?.content : []
        }
        columns={unassignedColumns}
        loading={FormListQuery?.isLoading}
        pagination={{
          pageSize: pageConfig.size,
          current: pageConfig.page,
          total: FormListQuery?.data?.totalElements ?? 0,
        }}
        onChange={handleTableChange}
      />
      <ImportTemplates
        openModal={importModal}
        data={locaionListQuery?.data}
        template_id={idForm}
        closeModal={() => {
          setImportModal(false);
        }}
      />
    </PagePadding>
  );
};
