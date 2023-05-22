import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { BellOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import { HaseenLogo, NewNcaLogo, SurveyIcon } from '@assets/svg';
import { getKeyClockFullName, SITE_LOGO } from '@helpers';
import {
  Badge,
  Button,
  Col,
  Divider,
  Dropdown,
  Layout,
  Menu,
  Radio,
  Row,
  Space,
  MenuProps,
} from 'antd';
import dayjs from 'dayjs';

import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { conditionalInObject } from '../../helpers/isEmptyObj';

import { FullScreenLoading } from '../Loading';

import classes from './Layout.module.scss';

const { Header, Footer, Sider, Content } = Layout;

const noLayoutLinks = ['unauthorized'];

export const MainLayout: FC = () => {
  const [showLayout, setShowLayout] = useState(true);
  const { i18n, t } = useTranslation();
  const [name, setName] = useState('');
  const navigateTo = useNavigate();
  const { dir, changeLanguage, language } = i18n;
  const { pathname } = location;
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const menuKey = {
    HOME: '',
    TEST: 'test',
    FORMSLIST: 'form-list',
  };

  const menu: MenuProps = {
    items: [
      {
        key: 'switch-lang-btn',
        className: classes.noCursorItem,
        label: (
          <Space size={'middle'}>
            <div>{t('LANGUAGE')}</div>
            <Radio.Group
              className={classes.langRadio}
              value={i18n.language}
              buttonStyle={'solid'}
              onChange={(v) => changeLanguage(v.target.value)}>
              <Radio.Button id='ar-lang' value={'ar'}>
                عربي
              </Radio.Button>
              <Radio.Button id={'en-lang'} value={'en'}>
                Eng
              </Radio.Button>
            </Radio.Group>
          </Space>
        ),
      },
      {
        key: 'logout-btn',
        label: t('LAYOUT.LOGOUT'),
        className: classes.signOut,
      },
    ],
    className: classes.dropDown,
  };

  const handleClick = (e: any) => {
    navigateTo(`/${e.key}`);
  };

  useEffect(() => {
    if (language === 'ar') {
      dayjs.locale('ar-sa');
    } else {
      dayjs.locale();
    }
    document.body.dir = dir(language);
  }, [language]);

  useEffect(() => {
    setShowLayout(
      !pathname.split('/').some((p) => noLayoutLinks.some((l) => p.includes(l)))
    );
    setOpenKeys([]);
  }, [pathname]);

  if (!showLayout) {
    return (
      <Layout>
        <Layout className='bg-[#F6F2ED]'>
          <Content>
            <Outlet />
          </Content>
        </Layout>
        <Footer className={classes.footer}>
          <div></div>
        </Footer>
      </Layout>
    );
  }

  const onOpenChange = (openedKeys: string[]) => {
    setOpenKeys(openedKeys);
  };

  return (
    <>
      <Layout>
        <Layout>
          <Header className={classes.mainHeader}>
            <Space size={12}>
              <Button
                type='link'
                id='notifications'
                className={classes.grayIcon}
                icon={
                  <Badge size='small'>
                    <BellOutlined />
                  </Badge>
                }
              />
              <Divider type='vertical' className={classes.divider} />
            </Space>
          </Header>
          <Content className={classes.content}>
            <div
              style={{
                flex: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Outlet />
            </div>
          </Content>
          <div className={classes.footerContainer}>
            <Footer className={classes.footer}>
              <></>
            </Footer>
          </div>
        </Layout>
      </Layout>
    </>
  );
};
