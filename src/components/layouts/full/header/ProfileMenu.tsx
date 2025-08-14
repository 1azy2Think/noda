import React, { useState, useEffect } from 'react';
import {
  Dropdown,
  Avatar,
  Typography,
  message,
  Image,
  theme,
} from 'antd';
import {
  UserOutlined,
  BulbOutlined,
  TranslationOutlined,
  SwapOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  CheckOutlined,
  SunOutlined,
  MoonOutlined,
  DesktopOutlined
} from '@ant-design/icons';
import { useThemeMode } from '../../../context/ThemeContext';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import src from '/vite.svg'

const { Text } = Typography;
const { useToken } = theme;

const ProfileMenu: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(src);
  const [isOpen, setIsOpen] = useState(false);
  const { mode, setMode } = useThemeMode();
  const { token } = useToken();
  const { i18n, t } = useTranslation();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const appearanceItems: MenuProps['items'] = [
    {
      key: 'light',
      icon: <SunOutlined />,
      label: (
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '120px' }}
          onClick={() => setMode('light')}
        >
          <span>Light</span>
          {mode === 'light' && <CheckOutlined style={{ color: token.colorSuccess }} />}
        </div>
      ),
    },
    {
      key: 'dark',
      icon: <MoonOutlined />,
      label: (
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '120px' }}
          onClick={() => setMode('dark')}
        >
          <span>Dark</span>
          {mode === 'dark' && <CheckOutlined style={{ color: token.colorSuccess }} />}
        </div>
      ),
    },
    {
      key: 'system',
      icon: <DesktopOutlined />,
      label: (
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '120px' }}
          onClick={() => setMode('system')}
        >
          <span>{t('profile.followSystem')}</span>
          {mode === 'system' && <CheckOutlined style={{ color: token.colorSuccess }} />}
        </div>
      ),
    },
  ];

  // Language and switch account items remain unchanged
  const languageItems: MenuProps['items'] = [
    {
      key: 'english',
      label: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '120px'
          }}
          onClick={() => i18n.changeLanguage('en')}
        >
          <span>English</span>
          {i18n.language === 'en' && (
            <CheckOutlined style={{ color: token.colorSuccess }} />
          )}
        </div>
      ),
    },
    {
      key: 'chinese',
      label: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '120px'
          }}
          onClick={() => i18n.changeLanguage('zh')}
        >
          <span>中文</span>
          {i18n.language === 'zh' && (
            <CheckOutlined style={{ color: token.colorSuccess }} />
          )}
        </div>
      ),
    },
  ];

  const switchAccountItems: MenuProps['items'] = [
    {
      key: 'add-account',
      icon: <UserOutlined />,
      label: 'Add Account',
    },
    {
      key: 'manage-accounts',
      icon: <SettingOutlined />,
      label: 'Manage Accounts',
    },
  ];

  const menuItems: MenuProps['items'] = [
    {
      key: 'profile-section',
      label: (
        <div style={{ padding: '12px 0', borderBottom: `1px solid ${token.colorBorderSecondary}` }}>
          {/* User Information Section */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            {/* Avatar Image */}
            <div style={{ position: 'relative', marginRight: '12px' }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: token.colorPrimary,
                }}
              >
                <Image
                  src={avatarUrl || "https://via.placeholder.com/80?text=JT"}
                  alt="avatar"
                  width="100%"
                  height="100%"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  preview={true}
                />
              </div>
            </div>
            {/* end Avatar Image */}
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}><Text>JING YI THAM</Text></div>
              <div style={{ fontSize: '12px' }}><Text type="secondary">jingyi@example.com</Text></div>
            </div>
          </div>
          {/* end User Info Section */}
        </div>
      ),
      disabled: true,
    },
    {
      key: 'appearance',
      icon: <BulbOutlined />,
      label: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '180px' }}>
          <span>{t('profile.appearance')}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {mode === 'system' ? t('profile.followSystem') : mode}
            </Text>
          </div>
        </div>
      ),
      children: appearanceItems,
    },
    {
      key: 'language',
      icon: <TranslationOutlined />,
      label: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '180px' }}>
          <span>{t('profile.language')}</span>
        </div>
      ),
      children: languageItems,
    },
    {
      key: 'switch-account',
      icon: <SwapOutlined />,
      label: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '180px' }}>
          <span>{t('profile.switchAccount')}</span>
        </div>
      ),
      children: switchAccountItems,
    },
    {
      type: 'divider',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('profile.settings'),
    },
    {
      key: 'help',
      icon: <QuestionCircleOutlined />,
      label: t('profile.help'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('profile.logout'),
      style: { color: token.colorError },
    },
  ];

  return (
    <Dropdown
      menu={{
        items: menuItems,
        style: {
          width: 280,
          borderRadius: token.borderRadius,
          boxShadow: token.boxShadowSecondary,
        },
        onClick: (e) => {
          e.domEvent.stopPropagation();
        }
      }}
      trigger={['click']}
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <Avatar
        size={32}
        src={avatarUrl || "https://via.placeholder.com/80?text=JT"}
        style={{
          cursor: 'pointer',
          background: token.colorPrimary,
        }}
      />
    </Dropdown>
  );
};

export default ProfileMenu;