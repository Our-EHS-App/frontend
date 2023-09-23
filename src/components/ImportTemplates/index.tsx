import { FC, useState } from 'react';
import { Modal, Select, notification } from 'antd';
import { useTranslation } from 'react-i18next';

import classes from './ImportTemplates.module.scss';
import { handleErrorNotifications } from '../../helpers/errorHandler';
import { useSurveyForm } from '@services/surveyService';
import { useMutation } from '@tanstack/react-query';

type Props = {
  openModal: boolean;
  data: any;
  template_id: any;
  closeModal: () => void;
};

export const ImportTemplates: FC<Props> = ({
  openModal,
  data,
  template_id,
  closeModal,
}) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const { organizationTemplateImport } = useSurveyForm();
  const [list, setList] = useState([]);

  const close = () => {
    setList([]);
    closeModal();
  };

  const { mutate } = useMutation(organizationTemplateImport, {
    onError: (error: any) => {
      handleErrorNotifications(error as any);
    },
    onSuccess: () => {
      notification.success({
        message: 'Success',
        duration: 1.5,
      });
      setList([]);
    },
  });

  const handleChange = (value: any) => {
    setList(value);
  };

  const handleOk = () => {
    mutate({
      templateId: template_id,
      locationIds: list,
    });
  };

  return (
    <>
      <Modal
        destroyOnClose
        title={t('FORM_TABLE.IMPORT')}
        okText={t('FORM_TABLE.IMPORT')}
        cancelText={t('ACTION.CANCEL')}
        onOk={handleOk}
        className={classes.importTemplatesContainer}
        open={openModal}
        closable={false}
        okButtonProps={{ disabled: list?.length === 0 }}
        onCancel={close}>
        <div className='py-10'>
          <Select
            mode='multiple'
            allowClear
            style={{ width: '100%' }}
            onChange={handleChange}
            options={data?.map((Category: any) => ({
              value: Category?.id,
              label: language === 'ar' ? Category?.nameAr : Category?.nameEn,
            }))}
          />
        </div>
      </Modal>
    </>
  );
};
