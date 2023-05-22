import { Input, Modal, notification, Checkbox, Col } from 'antd';
import { FC, useEffect, useState } from 'react';
import { PlusCircleFilled } from '@ant-design/icons';
import { DeleteSVG } from '@assets/svg';
import { useTranslation } from 'react-i18next';
import { Control, Controller, UseFormWatch } from 'react-hook-form';

import { QuestionList, SurveyI } from '@interfaces/ISurvey';

import classes from './AddQuestionModal.module.scss';

interface Iprops {
  open: boolean;
  index: number;
  control: Control<QuestionList>;
  IsSupQuestion: boolean;
  supQuestionIndex: number;
  data?: SurveyI;
  onCancel: () => void;
  onOk: (values: string[]) => void;
  watch: UseFormWatch<QuestionList>;
}

export const AddQuestionModal: FC<Iprops> = ({
  open,
  IsSupQuestion,
  control,
  index,
  supQuestionIndex,
  data,
  onCancel,
  onOk,
  watch,
}) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [text, setText] = useState<string | undefined>(undefined);
  const { t } = useTranslation();

  useEffect(() => {
    const listFields = watch(`questionList.${index}.values`) ?? [];
    setQuestions(listFields);
  }, [open]);

  const removeQuestion = (index: number) => {
    setQuestions((prev) => {
      return prev.filter((v, i) => i !== index);
    });
  };

  const validateBeforeOk = () => {
    if (text) {
      notification.warning({ message: t('ERRORS.ADDED_FIELD'), duration: 1.5 });
    } else {
      onOk(questions);
      notification.success({
        message: t('GENERAL.INFORMATION_HAS_BEEN_SAVE'),
        duration: 1.5,
      });
    }
  };

  const handleCancelModal = () => {
    onCancel();
  };

  return (
    <Modal
      destroyOnClose
      closable={false}
      title={`${t('ACTION.ADD_FIELDS')}`}
      open={open}
      className={classes.addQuestionModalContainer}
      onCancel={handleCancelModal}
      okText={t('ACTION.ADD')}
      cancelText={t('ACTION.CANCEL')}
      onOk={() => validateBeforeOk()}>
      {questions.map((v, i) => (
        <div className={'flex my-1 justify-between'} key={i}>
          <div>{v}</div>
          {!(data?.completed || data?.assigned) && (
            <div
              className={
                // eslint-disable-next-line max-len
                'flex justify-center items-center w-5 h-5 bg-danger rounded-full'
              }>
              <DeleteSVG
                className={'w-[11px] h-[11px] text-white'}
                onClick={() => removeQuestion(i)}
              />
            </div>
          )}
        </div>
      ))}
      {!(data?.completed || data?.assigned) && (
        <div className={'flex gap-4 items-center mt-3'}>
          <Input
            value={text}
            maxLength={500}
            onChange={(v) => {
              if (
                v?.target?.value?.trim()?.length ||
                v?.target?.value?.length == 0
              ) {
                setText(v.target.value);
              }
            }}
          />
          <div className={'flex gap-2 min-w-fit'}>
            <div className={'w-5 h-5 text-secondary'}>
              <PlusCircleFilled
                className={'svg-full'}
                onClick={() => {
                  if (text?.length) {
                    if (questions?.length >= 10) {
                      notification.error({
                        message: t('ERRORS.UNABLE_ADD_NEW_FIELD'),
                        duration: 1.5,
                      });
                    } else {
                      if (questions?.includes(text?.trim())) {
                        notification.error({
                          message: t('ERRORS.ALREADY_USED'),
                          duration: 1.5,
                        });
                      } else {
                        setQuestions((prev) => [...prev, text]);
                        setText(undefined);
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      <Controller
        name={`questionList.${index}.hasOthers`}
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className={'flex gap-2 items-center pt-9'}>
            <Checkbox
              disabled={data?.completed || data?.assigned}
              id={
                IsSupQuestion
                  ? `questionList.${index}.questionList.${supQuestionIndex}.hasOthers`
                  : `questionList.${index}.hasOthers`
              }
              onChange={(e) => onChange(e.target.checked)}
              checked={value}>
              {t('SURVEY.HAS_OTHERS')}
            </Checkbox>
          </div>
        )}
      />
    </Modal>
  );
};
