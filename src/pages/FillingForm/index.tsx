/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useMutation, useQuery } from '@tanstack/react-query';
import { Input, Skeleton } from 'antd';
import { FC } from 'react';
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

export const FillingForm: FC<{ mode?: 'VIEW' | 'FILL' }> = ({
  mode = 'VIEW',
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { formId } = useParams();
  const { fillSurvey, getFormDetails, getFormDetailsFill } = useSurveyForm();
  const { handleSubmit, control, reset, setValue } = useForm({
    mode: 'onChange',
  });
  const payload: any = {
    formId: formId ?? '',
    uuid: null,
    next: null,
  };

  const FormQuery = useQuery(['getFormDetails'], () =>
    mode === 'VIEW' ? getFormDetails(formId) : getFormDetailsFill(formId)
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
    console.log(body, 'body');

    const answerPayload: any = {
      ...body,
      formId: formId,
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

  const inputLiteral: any = {
    1: (
      <Controller
        name='answer'
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextArea
              id={`answer`}
              placeholder={`${t('GENERAL.WRITE_YOUR_ANSWER')}`}
              value={value}
              onChange={onChange}
            />
            {error && (
              <div className={'mt-2 text-danger'}>{error?.message}</div>
            )}
          </>
        )}
        rules={
          data?.canSave && {
            required: {
              value: data?.required ?? false,
              message: `${t('ERRORS.REQUIRED')}`,
            },
            maxLength: {
              value: 500,
              message: t('ERRORS.CREATMODAL_MAXLENGTH', {
                count: 500,
              }),
            },
          }
        }
        control={control}
        defaultValue={null}
      />
    ),
    2: (
      <Controller
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextArea
              id={`answer`}
              placeholder={`${t('GENERAL.WRITE_YOUR_ANSWER')}`}
              value={value}
              onChange={onChange}
            />
            {error && (
              <div className={'mt-2 text-danger'}>{error?.message}</div>
            )}
          </>
        )}
        name='answer'
        rules={
          data?.canSave && {
            required: {
              value: data?.required ?? false,
              message: `${t('ERRORS.REQUIRED')}`,
            },
            maxLength: {
              value: 500,
              message: t('ERRORS.CREATMODAL_MAXLENGTH', {
                count: 500,
              }),
            },
            pattern: {
              value: /^[0-9]*$/,
              message: `${t('ERRORS.NUM_ERRORS')}`,
            },
          }
        }
        control={control}
        defaultValue={null}
      />
    ),
    // SELECT_ONE: (
    //   <Controller
    //     render={({ field: { onChange, value }, fieldState: { error } }) => (
    //       <>
    //         <Radio.Group
    //           buttonStyle='solid'
    //           className={`flex-col ${classes.basicFormFillingSelectOne}`}
    //           id={`answer`}
    //           defaultValue={value}
    //           disabled={!data?.canSave}
    //           onChange={onChange}>
    //           <Row className='py-3 w-full' gutter={[0, 12]}>
    //             {data?.fields?.map((option: string) => (
    //               <Col span={24} key={option}>
    //                 <OutlineRadius value={option} key={option}>
    //                   <Tooltip
    //                     title={option}
    //                     arrow={false}
    //                     placement={'bottom'}>
    //                     {truncate({
    //                       text: option ?? '',
    //                       length: 90,
    //                       maxLengthAllowed: 100,
    //                     })}
    //                   </Tooltip>
    //                 </OutlineRadius>
    //               </Col>
    //             ))}
    //             {data.hasOthers && (
    //               <Col span={24} key={'OTHER_OPTION'} className='w-full'>
    //                 <OutlineRadius value={'OTHER_OPTION'} key={'OTHER_OPTION'}>
    //                   {t('OTHER_OPTION')}
    //                 </OutlineRadius>
    //               </Col>
    //             )}
    //           </Row>
    //         </Radio.Group>
    //         {error && (
    //           <div className={'mt-2 text-danger'}>{error?.message}</div>
    //         )}
    //       </>
    //     )}
    //     name='answer'
    //     rules={
    //       data?.canSave && {
    //         required: {
    //           value: data?.required ?? false,
    //           message: `${t('ERRORS.REQUIRED')}`,
    //         },
    //       }
    //     }
    //     control={control}
    //     defaultValue={null}
    //   />
    // ),
    // MULTI_SELECT: (
    //   <Controller
    //     render={({ field: { onChange, value }, fieldState: { error } }) => (
    //       <>
    //         <Checkbox.Group
    //           defaultValue={value}
    //           onChange={onChange}
    //           disabled={!data?.canSave}
    //           className={`flex-col gap-4 w-full`}>
    //           <Row className='py-3 w-full' gutter={[0, 12]}>
    //             {data?.fields?.map((option: string) => (
    //               <Col span={24} key={option}>
    //                 <Checkbox
    //                   value={option}
    //                   key={option}
    //                   className={`${classes.basicFormFillingCheckboxItem}`}>
    //                   <Tooltip
    //                     title={option}
    //                     arrow={false}
    //                     placement={'bottom'}>
    //                     {truncate({
    //                       text: option ?? '',
    //                       length: 90,
    //                       maxLengthAllowed: 100,
    //                     })}
    //                   </Tooltip>
    //                 </Checkbox>
    //               </Col>
    //             ))}
    //             {data.hasOthers && (
    //               <Col span={24} key={'OTHER_OPTION'} className='w-full'>
    //                 <Checkbox
    //                   value={'OTHER_OPTION'}
    //                   key={'OTHER_OPTION'}
    //                   className={`${classes.basicFormFillingCheckboxItem}`}>
    //                   {t('OTHER_OPTION')}
    //                 </Checkbox>
    //               </Col>
    //             )}
    //           </Row>
    //         </Checkbox.Group>
    //         {error && (
    //           <div className={'mt-2 text-danger'}>{error?.message}</div>
    //         )}
    //       </>
    //     )}
    //     name='selected'
    //     rules={
    //       data?.canSave && {
    //         required: {
    //           value: data?.required ?? false,
    //           message: `${t('ERRORS.REQUIRED')}`,
    //         },
    //       }
    //     }
    //     control={control}
    //     defaultValue={null}
    //   />
    // ),
  };

  if (FormQuery.isFetching) {
    return <Loading />;
  }

  return (
    <PagePadding className={''}>
      <PageHeader title={FormQuery?.data?.nameAr} />
      {isLoading ? (
        <WhiteContainer>
          <Skeleton />
        </WhiteContainer>
      ) : (
        <WhiteContainer className='flex justify-center'>
          <div className='w-60 mx-3 md:max-w-5xl md:mx-auto'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='max-w-5xl mx-auto min-w-[700px]'>
              {FormQuery?.data?.fields.map((question: any, index: number) => {
                return (
                  <div key={question?.id}>
                    <div className='pt-4'>
                      <div className='pt-4'>
                        <div className='text-black pb-4'>
                          {question?.nameAr}
                        </div>
                        <Controller
                          name={`values.${index}.fieldId`}
                          control={control}
                          defaultValue={question?.id}
                          render={({ field: { onChange, value } }) => (
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
                              <TextArea
                                id={`answer`}
                                placeholder={`${t(
                                  'GENERAL.WRITE_YOUR_ANSWER'
                                )}`}
                                disabled={mode == 'VIEW'}
                                value={mode == 'VIEW' ? question?.value : value}
                                onChange={onChange}
                              />
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
                              message: t('ERRORS.CREATMODAL_MAXLENGTH', {
                                count: 500,
                              }),
                            },
                          }}
                          control={control}
                          defaultValue={null}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className='flex items-center justify-between pt-60'>
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
                  {mode != 'VIEW' && (
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
