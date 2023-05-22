import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Input, notification, Select, Space, MenuProps, Dropdown } from 'antd';

import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import { OutlineButton } from '../../components/OutlineButton';
import { PagePadding } from '../../components/PagePadding';
import { PageHeader } from '../../components/PageHeader';
import { WhiteContainer } from '../../components/WhiteContainer';
import { CreateQuestion } from '../../components/CreateQuestion';
import { PrimaryButton } from '../../components/PrimaryButton';
import { AffirmationModal } from '../../components/AffirmationModal';

import { handleErrorNotifications } from '../../helpers/errorHandler';
import { useSurveyForm } from '@services/surveyService';
import { Question, QuestionList, SurveyI } from '@interfaces/ISurvey';

const { TextArea } = Input;

export const defaultQuestion: Question = {
  type: 'TEXT',
};

const defaultValues: QuestionList = {
  description: '',
  questionList: [defaultQuestion],
};
const defaultTableValues: QuestionList = {
  rowSize: 1,
  description: '',
  questionList: [defaultQuestion],
};

export const CreateBasicSection: FC<{
  type?: 'BASIC' | 'TABLE';
  mode?: 'CREATE' | 'EDIT';
}> = ({ type = 'BASIC', mode = 'CREATE' }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const questionSchema = z.lazy(() =>
    z
      .object({
        required: z.boolean().or(z.null()).or(z.undefined()),
        title: z
          .string()
          .max(500, { message: `${t('ERRORS.CREATMODAL_MAXLENGTH')}` })
          .or(z.undefined()),
        type: z.string().or(z.undefined()),
        values: z.array(z.string()).or(z.undefined()),
        hasOthers: z.boolean().or(z.null()).or(z.undefined()),
      })

      .superRefine(({ type, values, title }, ctx) => {
        if (!title || title?.trim() == '' || title?.length == 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('ERRORS.REQUIRED') ?? '',
            path: ['title'],
          });
        }

        if (
          ['MULTI_SELECT', 'SELECT_ONE'].includes(type ?? '') &&
          (!values?.length || !values)
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('ERRORS.REQUIRED') ?? '',
            path: ['values'],
          });
        }
        return z.NEVER;
      })
  );

  const schema = z.object({
    rowSize: z.number().or(z.null()).or(z.undefined()),
    description: z
      .string()
      .max(1000, { message: `${t('ERRORS.CREATMODAL_MAXLENGTH')}` }),
    questionList: z.array(questionSchema),
  });

  const {
    control,
    unregister,
    handleSubmit,
    getValues,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuestionList>({
    defaultValues: type == 'TABLE' ? defaultTableValues : defaultValues,
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questionList',
  });

  const { uuid, pageUuid, surveyUuid } = useParams();
  const { editSurvey, addSurvey, getSurvey, deleteSurveyById } =
    useSurveyForm();
  const [pageName, setPageName] = useState<string | undefined>();
  const [activeKeys, setActiveKeys] = useState<number[]>([]);
  const [openAffirmationModal, setOpenAffirmationModal] = useState(false);

  useEffect(() => {
    if (mode == 'CREATE') {
      setActiveKeys([0]);
    }
  }, [mode]);
  ``;

  const { mutate } = useMutation(addSurvey, {
    onError: (error) => {
      handleErrorNotifications(error as any);
    },
    onSuccess: () => {
      notification.success({
        message: t('SURVEY.SUCCESS_MESSAGE'),
        duration: 1.5,
      });
      // navigate(`/form-list/${uuid}/view`);
    },
  });

  const { mutate: editMutate } = useMutation(editSurvey, {
    onError: (error) => {
      handleErrorNotifications(error as any);
    },
    onSuccess: () => {
      notification.success({
        message: t('SURVEY.SUCCESS_MESSAGE'),
        duration: 1.5,
      });
      // navigate(`/form-list/${uuid}/view`);
    },
  });

  const { mutate: deleteMutate } = useMutation(deleteSurveyById, {
    onError: (error) => {
      handleErrorNotifications(error as any);
    },
    onSuccess: () => {
      notification.success({
        message: t('SURVEY.DELETE_SUCCESS_MESSAGE'),
        duration: 1.5,
      });
      navigate(`/form-list/${uuid}/view`);
    },
  });

  const { data } = useQuery(
    ['get-survey', surveyUuid, mode],
    () => getSurvey(surveyUuid ?? '', uuid ?? ''),
    {
      onSuccess: (data) => {
        if ((type as string) != data?.type) {
          navigate(`/404`, { replace: true });
        }
        setPageName(data.pageName);
      },
      enabled: !!(surveyUuid && mode == 'EDIT'),
    }
  );

  useEffect(() => {
    if (data) {
      reset(data); // reset means setting all values
    }
  }, [data]);

  const onSubmit = (body: QuestionList) => {
    const surveyPayload: SurveyI = {
      ...body,
      questionList: body.questionList.map((v, i) => ({
        ...v,
        orderNumber: i + 1,
      })),
    };

    if (mode == 'CREATE') {
      console.log(surveyPayload, 'Payload');
      // mutate(surveyPayload);
    } else {
      editMutate({
        ...surveyPayload,
        pageUuid: data?.pageUuid as string,
        uuid: surveyUuid as string,
      });
    }
  };

  const closeKey = (index: number) => {
    setActiveKeys((prev) => {
      return prev.filter((v) => v != index);
    });
  };

  const handleActiveKeyChange = (changes: string | string[]) => {
    if (typeof changes == 'string') {
      setActiveKeys([+changes]);
    } else {
      setActiveKeys(changes.map((c: string) => +c));
    }
  };

  const deleteItem = (index: number) => {
    remove(index);
    closeKey(index);
  };

  const appendItem = () => {
    if (type == 'TABLE') {
      if (fields.length >= 20) {
        notification.error({
          message: t('ERRORS.UNABLE_ADD_NEW_COLUMN'),
          duration: 1.5,
        });
      } else {
        setActiveKeys((prev) => [fields.length]);
        append(defaultQuestion);
      }
    } else {
      if (fields.length >= 30) {
        notification.error({
          message: t('ERRORS.UNABLE_ADD_NEW_QUESTIONS'),
          duration: 1.5,
        });
      } else {
        setActiveKeys((prev) => [fields.length]);
        append(defaultQuestion);
      }
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    const items = getValues('questionList');
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);
    setValue('questionList', items);
    setActiveKeys([]);
  };

  const handleDeleteSection = () => {
    deleteMutate(data?.uuid);
  };

  const handleCloseAffirmationModal = () => {
    setOpenAffirmationModal(false);
  };

  const handleOpenAffirmationModal = () => {
    setOpenAffirmationModal(true);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className='text-danger' onClick={handleOpenAffirmationModal}>
          {t('ACTION.SECTIONS_DELETE')}
        </div>
      ),
    },
  ];

  const renderExtra = () => {
    return (
      <Space>
        <OutlineButton
          text={t('ACTION.BACK')}
          id={'back'}
          onClick={() => history.back()}
        />
        {!(data?.completed || data?.assigned) && (
          <PrimaryButton
            id={'save_survey'}
            disabled={isSubmitting}
            text={`${t('ACTION.SAVE_SECTION')}`}
            htmlType={'submit'}
          />
        )}
        {mode === 'EDIT' && !(data?.completed || data?.assigned) && (
          <Dropdown
            className={``}
            menu={{ items }}
            placement='bottom'
            trigger={['click']}>
            <PrimaryButton
              id={'survey_settings'}
              icon={<DownOutlined className={'p-0 m-0'} />}
            />
          </Dropdown>
        )}
      </Space>
    );
  };

  return (
    <PagePadding>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageHeader title={pageName ?? ''} extra={renderExtra()} />
        <WhiteContainer className={'mb-4'}>
          <div className={'text-primary text-lg mb-4 font-bold'}>
            {t('BASIC_SECTION.DESCRIPTION')}
          </div>
          <Controller
            name={`description`}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <TextArea
                  id={`description`}
                  placeholder={`${t('BASIC_SECTION.DESCRIPTION')}`}
                  value={value}
                  disabled={data?.completed || data?.assigned}
                  onChange={onChange}
                />
                {error && (
                  <div className={'mt-2 text-danger'}>{error.message}</div>
                )}
              </>
            )}
          />
        </WhiteContainer>
        <WhiteContainer className={'min-h-400'}>
          <div className={'flex justify-between mb-8'}>
            <div className={'text-primary text-lg font-bold'}>
              {type == 'TABLE'
                ? t('TABLE_SECTION.ADD_TABLE')
                : t('BASIC_SECTION.ADD_QUESTION')}
            </div>
            <div className={'flex gap-6 items-end ali'}>
              {type == 'TABLE' && (
                <>
                  <Controller
                    name={`rowSize`}
                    control={control}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <div>
                        <div className='text-[#666666] pb-2 text-xs'>
                          {`${t('TABLE_SECTION.NUMBER_ROW')}`}
                        </div>
                        <Select
                          id={`rowSize`}
                          onChange={onChange}
                          disabled={data?.completed || data?.assigned}
                          options={Array.from({ length: 30 }).map((_, i) => {
                            const item = i + 1;
                            return {
                              key: item,
                              label: item,
                              value: item,
                            };
                          })}
                          value={value}
                          className={'w-32'}
                        />
                        {error && (
                          <div className={'text-danger'}>{error.message}</div>
                        )}
                      </div>
                    )}
                  />
                  {fields.length < 20 &&
                  !(data?.completed || data?.assigned) ? (
                    <div
                      className={'h-6 w-[1px] bg-[#9B9B9B] content-{""]'}></div>
                  ) : (
                    <></>
                  )}
                </>
              )}
              {!(data?.completed || data?.assigned) && (
                <OutlineButton
                  id={'create_new_question'}
                  text={
                    type == 'TABLE'
                      ? t('ACTION.CREATE_COLUMN')
                      : t('ACTION.CREATE_QUESTION')
                  }
                  icon={<PlusOutlined className={'p-0 m-0'} />}
                  onClick={appendItem}
                />
              )}
            </div>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId='questionList'
              direction='vertical'
              type='column'>
              {(provided) => (
                <div
                  className=''
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  {fields.map((item, index) => {
                    return (
                      <Draggable
                        key={`${item.id}`}
                        draggableId={`${item.id}`}
                        disableInteractiveElementBlocking={false}
                        isDragDisabled={data?.completed || data?.assigned}
                        index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <CreateQuestion
                              type={type}
                              item={item}
                              index={index}
                              control={control}
                              errors={errors}
                              fields={fields}
                              data={data}
                              activeKeys={activeKeys}
                              watch={watch}
                              deleteItem={deleteItem}
                              unregister={unregister}
                              getValues={getValues}
                              setValue={setValue}
                              handleActiveKeyChange={handleActiveKeyChange}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </WhiteContainer>
      </form>
      <AffirmationModal
        title={t('ACTION.SECTIONS_DELETE')}
        affirmationStatement={t('PAGE_DETAILS.DELETE_PAGE')}
        affirmationActionText={t('ACTION.SECTIONS_DELETE')}
        openModal={openAffirmationModal}
        closeModal={handleCloseAffirmationModal}
        affirmationAction={handleDeleteSection}
      />
    </PagePadding>
  );
};
