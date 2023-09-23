import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Control,
  Controller,
  FieldArrayWithId,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
  UseFormUnregister,
  UseFormWatch,
} from 'react-hook-form';
import { Checkbox, Col, Collapse, Input, Row, Select } from 'antd';
import { AddQuestionModal } from '../AddQuestionModal';
import { PlusCircleFilled, EyeFilled } from '@ant-design/icons';

import { QuestionList, SurveyI } from '../../interfaces/ISurvey';

import { AffirmationModal } from '../AffirmationModal';

import classes from './CreateQuestion.module.scss';
import React from 'react';

const { Option } = Select;
const { Panel } = Collapse;

export const CreateQuestion: FC<{
  control: Control<QuestionList>;
  errors: FieldErrors<QuestionList>;
  fields: FieldArrayWithId<QuestionList, 'questionList', 'id'>[];
  activeKeys: number[];
  index: number;
  type: string;
  data?: SurveyI;
  item: FieldArrayWithId<QuestionList, 'questionList', 'id'>;
  // eslint-disable-next-line no-unused-vars
  deleteItem: (index: number) => void;
  // eslint-disable-next-line no-unused-vars
  handleActiveKeyChange: (changes: string | string[]) => void;
  unregister: UseFormUnregister<QuestionList>;
  setValue: UseFormSetValue<QuestionList>;
  getValues: UseFormGetValues<QuestionList>;
  watch: UseFormWatch<QuestionList>;
}> = ({
  control,
  errors,
  fields,
  activeKeys,
  index,
  type,
  data,
  deleteItem,
  handleActiveKeyChange,
  getValues,
  setValue,
  watch,
  unregister,
}) => {
  const [questionModal, setQuestionModal] = useState<number | undefined>();
  const { t } = useTranslation();
  const [openAffirmationModal, setOpenAffirmationModal] = useState(false);

  const handleCloseAffirmationModal = () => {
    setOpenAffirmationModal(false);
  };

  const handleOpenAffirmationModal = () => {
    setOpenAffirmationModal(true);
  };

  // const moreQuestions = () =>
  //   ['MULTI_SELECT', 'SELECT_ONE'].includes(
  //     watch(`questionList.${index}.fieldType`) ?? ''
  //   );

  const isValuesError = (i: number) => {
    return Boolean(errors.questionList && errors.questionList[i]?.values);
  };

  // eslint-disable-next-line no-unused-vars
  const valuesError: (i: number) => string | undefined = (i: number) => {
    if (errors.questionList && errors.questionList[i]?.values) {
      return errors.questionList[i]?.values?.message;
    }
  };

  const addQuestions = (values: string[]) => {
    setValue(
      'questionList',
      getValues().questionList.map((v, i) => {
        if (index == i) {
          return { ...v, values };
        }
        return v;
      })
    );
    setQuestionModal(undefined);
  };

  return (
    <Collapse
      activeKey={activeKeys}
      ghost
      onChange={handleActiveKeyChange}
      className={classes.customCollapse}>
      <Panel
        key={index}
        header={
          getValues(`questionList.${index}.nameAr`)?.length
            ? `${index + 1}.${getValues(`questionList.${index}.nameAr`)}`
            : `${type == 'TABLE' ? t('SURVEY.COLUMN') : t('SURVEY.QUESTION')}
                 ${index + 1}`
        }
        className={classes.primaryPanel}
        showArrow={true}>
        <Row align={'top'} gutter={[12, 12]}>
          <Col span={16}>
            <Controller
              name={`questionList.${index}.nameAr`}
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div>
                  <div className={classes.formLabel}>
                    {t('SURVEY.MAIN_QUESTION')}
                  </div>
                  <Input
                    id={`questionList.${index}.nameAr`}
                    value={value}
                    disabled={data?.completed || data?.assigned}
                    onChange={onChange}
                  />
                  {error && (
                    <div className={'mt-2 text-danger'}>{error.message}</div>
                  )}
                </div>
              )}
            />
          </Col>
          <Col span={5}>
            <Controller
              name={`questionList.${index}.fieldType`}
              control={control}
              render={({ field: { value, onChange } }) => (
                <div>
                  <div className={classes.formLabel}>
                    {t('SURVEY.TYPE_ANSWER')}
                  </div>
                  <Select
                    id={`questionList.${index}.fieldType`}
                    disabled={data?.completed || data?.assigned}
                    onChange={(v) => {
                      onChange(v);
                      if (['1', 'NUMBER'].includes(v ?? '')) {
                        unregister(`questionList.${index}.values`);
                      }
                    }}
                    value={value}
                    className={'w-full'}>
                    <Option value={'1'}>{t('SURVEY.TEXT')}</Option>
                    <Option value={'2'}>{t('SURVEY.NUMBER')}</Option>
                    {/* <Option value={'SELECT_ONE'}>
                      {t('SURVEY.SELECT_ONE')}
                    </Option>
                    <Option value={'MULTI_SELECT'}>
                      {t('SURVEY.MULTI_SELECT')}
                    </Option> */}
                  </Select>
                </div>
              )}
            />
            {isValuesError(index) && (
              <div className={'mt-2 text-danger'}>{valuesError(index)}</div>
            )}
          </Col>
          {/* {moreQuestions() && (
            <Col span={3}>
              <div>
                <div className={classes.formLabel}></div>
                {getValues(`questionList.${index}.values`) ? (
                  <div
                    className={
                      'cursor-pointer px-3 flex gap-2 items-center h-8'
                    }
                    onClick={() => setQuestionModal(index)}>
                    <div
                      className={
                        // eslint-disable-next-line max-len
                        'w-5 h-5 bg-[#1D63AB] flex items-center justify-center rounded-3xl'
                      }>
                      <div className={' text-[#FFFFFF] '}>
                        <EyeFilled
                          className=' svg-full'
                          style={{ fontSize: '15px' }}
                        />
                      </div>
                    </div>
                    <div className='text-[#1D63AB]'>
                      {t('ACTION.SHOW_FIELDS')}
                    </div>
                  </div>
                ) : (
                  !(data?.completed || data?.assigned) && (
                    <div
                      className={
                        'cursor-pointer px-3 flex gap-2 items-center h-8'
                      }
                      onClick={() => setQuestionModal(index)}>
                      <div className={'w-5 h-5 text-secondary'}>
                        <PlusCircleFilled className={'svg-full'} />
                      </div>
                      <div>{t('ACTION.ADD_FIELDS')}</div>
                    </div>
                  )
                )}
              </div>
            </Col>
          )}
          {moreQuestions() && (
            <Col span={24} hidden>
              <Controller
                name={`questionList.${index}.values`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    id={`questionList.${index}.values`}
                    disabled={data?.completed || data?.assigned}
                    onChange={onChange}
                    value={value}
                    mode={'multiple'}
                    className={'w-full'}
                  />
                )}
              />
            </Col>
          )}
          {moreQuestions() && (
            <AddQuestionModal
              IsSupQuestion={false}
              supQuestionIndex={0}
              open={questionModal == index}
              data={data}
              control={control}
              index={index}
              onCancel={() => setQuestionModal(undefined)}
              onOk={addQuestions}
              watch={watch}
            />
          )} */}
          <Col span={24}>
            <Controller
              name={`questionList.${index}.required`}
              control={control}
              render={({ field: { value, onChange } }) => (
                <div className={'flex gap-2 items-center'}>
                  <Checkbox
                    id={`questionList.${index}.required`}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={data?.completed || data?.assigned}
                    checked={value}>
                    {t('SURVEY.REQUIRED')}
                  </Checkbox>
                </div>
              )}
            />
          </Col>

          {fields.length > 1 && !(data?.completed || data?.assigned) && (
            <Col span={24}>
              <div
                onClick={() => handleOpenAffirmationModal()}
                className={'text-danger cursor-pointer w-fit'}>
                {type == 'TABLE'
                  ? t('ACTION.DELETE_COLUMN')
                  : t('ACTION.DELETE_QUESTION')}
              </div>
            </Col>
          )}
          <AffirmationModal
            title={
              type == 'TABLE'
                ? t('ACTION.DELETE_COLUMN')
                : t('ACTION.DELETE_QUESTION')
            }
            affirmationStatement={t('PAGE_DETAILS.DELETE_PAGE')}
            openModal={openAffirmationModal}
            affirmationActionText={
              type == 'TABLE'
                ? t('ACTION.DELETE_COLUMN')
                : t('ACTION.DELETE_QUESTION')
            }
            closeModal={handleCloseAffirmationModal}
            affirmationAction={() => deleteItem(index)}
          />
        </Row>
      </Panel>
    </Collapse>
  );
};
