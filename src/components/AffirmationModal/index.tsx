import { FC } from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import classes from './AffirmationModal.module.scss';

type Props = {
  openModal: boolean;
  title: string;
  affirmationStatement: string;
  affirmationActionText: string;
  affirmationAction: () => void;
  closeModal: () => void;
};

export const AffirmationModal: FC<Props> = ({
  openModal,
  title,
  affirmationActionText,
  affirmationStatement,
  affirmationAction,
  closeModal,
}) => {
  const { t } = useTranslation();

  const close = () => {
    closeModal();
  };

  const handleOk = () => {
    affirmationAction();
  };

  return (
    <>
      <Modal
        destroyOnClose
        title={title}
        okText={affirmationActionText}
        cancelText={t('ACTION.CANCEL')}
        onOk={handleOk}
        className={classes.affirmationModalContainer}
        open={openModal}
        closable={false}
        onCancel={close}>
        <div>{affirmationStatement}</div>
      </Modal>
    </>
  );
};
