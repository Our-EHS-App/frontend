import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CloseCircleOutlined } from '@ant-design/icons';

export const AppNotAuthorized: FC = () => {
  const { t } = useTranslation();

  return (
    <div
      className={'flex justify-center h-min-[100rem] items-start my-75  gap-4'}>
      <div>
        <CloseCircleOutlined
          style={{
            strokeWidth: 1,
          }}
          className={'text-7xl text-primary font-light stroke-[1px]'}
        />
      </div>
      <div className={'flex flex-col gap-2 relative'}>
        <div
          className={
            'absolute rounded-full h-[31.25rem] w-[31.25rem] pointer-events-none bg-[rgba(40,56,126,0.05)] -top-44 bottom-0 -right-72 -left-72'
          }
        />
        <span className={'text-primary text-3xl font-medium'}>
          {t('ERRORS.ERROR_CODE', { code: 401 })}
        </span>
        <span className={'text-ncaDark text-xl font-medium'}>
          {t('ERRORS.ERROR_401_MESSAGE')}
        </span>
        <Link
          className={`bg-[#00B9AD] text-xl mt-14 pb-2 pt-1 px-4 self-start 
               rounded-lg text-white font-medium
              hover:bg-[#00B9AD]/90`}
          to={'/services'}>
          {t('GENERAL.BACK_HOME')}
        </Link>
      </div>
    </div>
  );
};
