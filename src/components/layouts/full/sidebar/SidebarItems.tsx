import React from 'react';
import { Menu, theme, type MenuProps } from 'antd';
import Menuitems, { type MenuItemType } from './MenuItems';
import { Link, useLocation } from 'react-router';

const { useToken } = theme;

const SidebarItems: React.FC = () => {
  const location = useLocation();
  const { token } = useToken();

  const menuItems = Menuitems();

  const renderMenuItems = (items: MenuItemType[]): NonNullable<MenuProps['items']> => {
    return items.map((item) => {
      if (item.navlabel && item.subheader) {
        return {
          type: 'group',
          label: (
            <span
              style={{
                fontWeight: 600,
                color: token.colorTextSecondary,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {item.subheader}
            </span>
          ),
        };
      }

      if (item.children && item.children.length > 0) {
        return {
          key: item.title || '',
          icon: item.icon ? React.createElement(item.icon, { 
            size: 18,
            style: { color: token.colorTextSecondary }
          }) : undefined,
          label: item.title,
          children: renderMenuItems(item.children)
        };
      }

      return {
        key: item.href || item.title || '',
        icon: item.icon ? React.createElement(item.icon, { 
          size: 18,
          style: { 
            color: location.pathname === item.href ? token.colorPrimary : token.colorTextSecondary 
          }
        }) : undefined,
        label: item.href ? (
          <Link 
            to={item.href}
            style={{
              color: location.pathname === item.href ? token.colorPrimary : token.colorText,
              textDecoration: 'none',
              fontWeight: location.pathname === item.href ? 500 : 400,
            }}
          >
            {item.title}
          </Link>
        ) : item.title,
        style: {
          backgroundColor: location.pathname === item.href ? token.colorPrimaryBg : 'transparent',
          borderRadius: token.borderRadius,
          margin: '4px 0',
        }
      };
    });
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      items={renderMenuItems(menuItems)}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
      }}
    />
  );
};

export default SidebarItems;
