/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useMutation, useQuery } from '@tanstack/react-query';
import { Collapse, Input, Radio, Select, Skeleton } from 'antd';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { OutlineButton } from '../../components/OutlineButton';
import { PageHeader } from '../../components/PageHeader';
import { PagePadding } from '../../components/PagePadding';
import { PrimaryButton } from '../../components/PrimaryButton';
import { WhiteContainer } from '../../components/WhiteContainer';

import { useSurveyForm } from '../../services/surveyService';
import { Loading } from '../../components/Loading';

const { TextArea } = Input;
const { Panel } = Collapse;
import classes from '../../components/CreateQuestion/CreateQuestion.module.scss';
import { ImportTemplates } from '../../components/ImportTemplates';

export const FillingForm: FC<{ mode?: 'VIEW' | 'FILL' | 'FILLTM' }> = ({
  mode = 'VIEW',
}) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const [importModal, setImportModal] = useState(false);

  const navigate = useNavigate();

  const { formId } = useParams();
  const {
    fillSurvey,
    getFormDetails,
    getFormDetailsFill,
    getMyFormFill,
    getLocations,
  } = useSurveyForm();
  const { handleSubmit, control, reset, setValue } = useForm({
    mode: 'onChange',
  });
  const locaionListQuery = useQuery(['list-/api/locaion'], () =>
    getLocations()
  );
  const payload: any = {
    formId: formId ?? '',
    uuid: null,
    next: null,
  };

  const FormQuery = useQuery(['getFormDetails'], () =>
    mode === 'VIEW'
      ? getFormDetails(formId)
      : mode === 'FILL'
      ? getFormDetailsFill(formId)
      : getMyFormFill(formId)
  );

  const {
    mutate: answerMutate,
    data,
    isLoading,
  } = useMutation(fillSurvey, {
    onSuccess: (data) => {
      history.back();
    },
    onError: () => {
      navigate(`/404`, { replace: true });
    },
  });

  const onSubmit = (body: any) => {
    const answerPayload: any = {
      ...body,
      formId: mode === 'FILL' ? formId : FormQuery?.data?.id,
    };
    answerMutate({ ...answerPayload });
  };
  const clear = () => reset();

  const saveAndGoBack = () => {
    handleSubmit(onSubmit)();
  };

  const saveAndGoNext = () => {
    handleSubmit(onSubmit)();
  };

  if (FormQuery.isFetching) {
    return <Loading />;
  }

  return (
    <PagePadding className={''}>
      <PageHeader
        title={
          mode == 'VIEW' ? FormQuery?.data?.titleAr : FormQuery?.data?.nameAr
        }
        extra={
          mode == 'VIEW' ? (
            <>
              <OutlineButton
                text={t('FORM_TABLE.IMPORT')}
                onClick={() => {
                  setImportModal(true);
                }}
                id={'setImportModal'}
              />
            </>
          ) : (
            <></>
          )
        }
      />
      {isLoading ? (
        <WhiteContainer>
          <Skeleton />
        </WhiteContainer>
      ) : (
        <WhiteContainer className=''>
          <div className='mx-3'>
            <div className={'text-primary text-lg my-4 font-bold'}>
              {`${t('frequency')} : ${
                mode == 'VIEW'
                  ? FormQuery?.data?.frequency
                  : FormQuery?.data?.template?.frequency
              }`}
            </div>
            <div className={'text-primary text-lg my-4 font-bold'}>
              {`${t('FORM_TABLE.Category')} : ${
                mode == 'VIEW'
                  ? language === 'ar'
                    ? FormQuery?.data?.subCategory?.nameAr
                    : FormQuery?.data?.subCategory?.nameEn
                  : language === 'ar'
                  ? FormQuery?.data?.template?.subCategory?.nameAr
                  : FormQuery?.data?.template?.subCategory?.nameEn
              }`}
            </div>
            {FormQuery?.data?.location && (
              <div className={'text-primary text-lg my-4 font-bold'}>
                {`${t('Location')} : ${
                  language === 'ar'
                    ? FormQuery?.data?.location?.nameAr
                    : FormQuery?.data?.location?.nameAr
                }`}
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
              {mode == 'FILLTM'
                ? FormQuery?.data?.template?.fields?.map(
                    (question: any, index: number) => {
                      return (
                        <Collapse
                          ghost
                          key={index}
                          className={classes.customCollapse}>
                          <Panel
                            key={index}
                            header={question?.nameAr}
                            className={classes.primaryPanel}
                            showArrow={true}>
                            <div key={question?.id}>
                              <div className=''>
                                <div className=''>
                                  <Controller
                                    name={`values.${index}.fieldId`}
                                    control={control}
                                    defaultValue={question?.id}
                                    render={({
                                      field: { onChange, value },
                                    }) => (
                                      <>
                                        <Input
                                          id={`values.${index}.fieldId`}
                                          value={question?.id}
                                          hidden={true}
                                        />
                                      </>
                                    )}
                                  />
                                  <Controller
                                    name={`values.${index}.value`}
                                    render={({
                                      field: { onChange, value },
                                      fieldState: { error },
                                    }) => (
                                      <>
                                        {question?.fieldType?.id == 2 ? (
                                          <Radio.Group
                                            onChange={onChange}
                                            disabled={
                                              FormQuery?.data?.listStatus
                                                ?.id === 4
                                            }
                                            value={
                                              FormQuery?.data?.listStatus
                                                ?.id === 4
                                                ? question?.value
                                                : value
                                            }>
                                            <Radio value={'true'}>
                                              {t('Yes')}
                                            </Radio>
                                            <Radio value={'false'}>
                                              {t('No')}
                                            </Radio>
                                          </Radio.Group>
                                        ) : (
                                          <TextArea
                                            id={`answer`}
                                            placeholder={`${t(
                                              'GENERAL.WRITE_YOUR_ANSWER'
                                            )}`}
                                            disabled={
                                              FormQuery?.data?.listStatus
                                                ?.id === 4
                                            }
                                            value={
                                              FormQuery?.data?.listStatus
                                                ?.id === 4
                                                ? question?.value
                                                : value
                                            }
                                            onChange={onChange}
                                          />
                                        )}
                                        {error && (
                                          <div className={'mt-2 text-danger'}>
                                            {error?.message}
                                          </div>
                                        )}
                                      </>
                                    )}
                                    rules={{
                                      maxLength: {
                                        value: 500,
                                        message: t(
                                          'ERRORS.CREATMODAL_MAXLENGTH',
                                          {
                                            count: 500,
                                          }
                                        ),
                                      },
                                    }}
                                    control={control}
                                    defaultValue={null}
                                  />
                                </div>
                              </div>
                            </div>
                          </Panel>
                        </Collapse>
                      );
                    }
                  )
                : mode == 'VIEW'
                ? FormQuery?.data?.fields?.map(
                    (question: any, index: number) => {
                      return (
                        <>
                          <Collapse
                            ghost
                            key={index}
                            className={classes.customCollapse}>
                            <Panel
                              key={index}
                              header={question?.nameAr}
                              className={classes.primaryPanel}
                              showArrow={true}>
                              <div key={question?.id}>
                                <div className=''>
                                  <div className=''>
                                    <Controller
                                      name={`values.${index}.fieldId`}
                                      control={control}
                                      defaultValue={question?.id}
                                      render={({
                                        field: { onChange, value },
                                      }) => (
                                        <>
                                          <Input
                                            id={`values.${index}.fieldId`}
                                            value={question?.id}
                                            hidden={true}
                                            disabled={true}
                                          />
                                        </>
                                      )}
                                    />
                                    <Controller
                                      name={`values.${index}.value`}
                                      render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                      }) => (
                                        <>
                                          {question?.fieldType?.id == 2 ? (
                                            <Radio.Group
                                              onChange={onChange}
                                              disabled={true}
                                              value={
                                                FormQuery?.data?.listStatus
                                                  ?.id === 4
                                                  ? question?.value
                                                  : value
                                              }>
                                              <Radio value={'true'}>
                                                {t('Yes')}
                                              </Radio>
                                              <Radio value={'false'}>
                                                {t('No')}
                                              </Radio>
                                            </Radio.Group>
                                          ) : (
                                            <TextArea
                                              id={`answer`}
                                              placeholder={`${t(
                                                'GENERAL.WRITE_YOUR_ANSWER'
                                              )}`}
                                              disabled={true}
                                              value={
                                                FormQuery?.data?.listStatus
                                                  ?.id === 4
                                                  ? question?.value
                                                  : value
                                              }
                                              onChange={onChange}
                                            />
                                          )}
                                          {error && (
                                            <div className={'mt-2 text-danger'}>
                                              {error?.message}
                                            </div>
                                          )}
                                        </>
                                      )}
                                      rules={{
                                        maxLength: {
                                          value: 500,
                                          message: t(
                                            'ERRORS.CREATMODAL_MAXLENGTH',
                                            {
                                              count: 500,
                                            }
                                          ),
                                        },
                                      }}
                                      control={control}
                                      defaultValue={null}
                                    />
                                  </div>
                                </div>
                              </div>
                            </Panel>
                          </Collapse>
                          <ImportTemplates
                            openModal={importModal}
                            data={locaionListQuery?.data}
                            template_id={formId}
                            closeModal={() => {
                              setImportModal(false);
                            }}
                          />
                        </>
                      );
                    }
                  )
                : FormQuery?.data?.template?.fields?.map(
                    (question: any, index: number) => {
                      return (
                        <Collapse
                          ghost
                          key={index}
                          className={classes.customCollapse}>
                          <Panel
                            key={index}
                            header={question?.nameAr}
                            className={classes.primaryPanel}
                            showArrow={true}>
                            <div key={question?.id}>
                              <div className=''>
                                <div className=''>
                                  <Controller
                                    name={`values.${index}.fieldId`}
                                    control={control}
                                    defaultValue={question?.id}
                                    render={({
                                      field: { onChange, value },
                                    }) => (
                                      <>
                                        <Input
                                          id={`values.${index}.fieldId`}
                                          value={question?.id}
                                          hidden={true}
                                        />
                                      </>
                                    )}
                                  />
                                  <Controller
                                    name={`values.${index}.value`}
                                    render={({
                                      field: { onChange, value },
                                      fieldState: { error },
                                    }) => (
                                      <>
                                        {question?.fieldType?.id == 2 ? (
                                          <Radio.Group
                                            onChange={onChange}
                                            disabled={
                                              FormQuery?.data?.listStatus
                                                ?.id === 4
                                            }
                                            value={
                                              FormQuery?.data?.listStatus
                                                ?.id === 4
                                                ? question?.value
                                                : value
                                            }>
                                            <Radio value={'true'}>
                                              {t('Yes')}
                                            </Radio>
                                            <Radio value={'false'}>
                                              {t('No')}
                                            </Radio>
                                          </Radio.Group>
                                        ) : (
                                          <TextArea
                                            id={`answer`}
                                            placeholder={`${t(
                                              'GENERAL.WRITE_YOUR_ANSWER'
                                            )}`}
                                            disabled={
                                              FormQuery?.data?.listStatus
                                                ?.id === 4
                                            }
                                            value={
                                              FormQuery?.data?.listStatus
                                                ?.id === 4
                                                ? question?.value
                                                : value
                                            }
                                            onChange={onChange}
                                          />
                                        )}
                                        {error && (
                                          <div className={'mt-2 text-danger'}>
                                            {error?.message}
                                          </div>
                                        )}
                                      </>
                                    )}
                                    rules={{
                                      maxLength: {
                                        value: 500,
                                        message: t(
                                          'ERRORS.CREATMODAL_MAXLENGTH',
                                          {
                                            count: 500,
                                          }
                                        ),
                                      },
                                    }}
                                    control={control}
                                    defaultValue={null}
                                  />
                                </div>
                              </div>
                            </div>
                          </Panel>
                        </Collapse>
                      );
                    }
                  )}

              <div className='flex items-center justify-between pt-8'>
                {data?.orderNumber !== data?.maxOrder ? (
                  <div className=''>
                    <OutlineButton
                      text={
                        data?.canSave
                          ? t('ACTION.SAVE_GO_BACK')
                          : t('ACTION.GO_BACK')
                      }
                      onClick={saveAndGoBack}
                      id={'saveAndGoBack'}
                    />
                  </div>
                ) : (
                  <div className=''>
                    <PrimaryButton
                      text={`${t('ACTION.GO_BACK')}`}
                      onClick={() => history.back()}
                      id={'saveAndGoBack'}
                      disabled={isLoading}
                    />
                  </div>
                )}
                <div className='flex items-center gap-4'>
                  {FormQuery?.data?.listStatus?.id == 1 &&
                    !(mode === 'VIEW') && (
                      <div className=''>
                        <PrimaryButton
                          text={`${t('ACTION.SAVE')}`}
                          onClick={saveAndGoNext}
                          id={'saveAndGoBack'}
                          disabled={isLoading}
                        />
                      </div>
                    )}
                </div>
              </div>
            </form>
          </div>
        </WhiteContainer>
      )}
    </PagePadding>
  );
};
