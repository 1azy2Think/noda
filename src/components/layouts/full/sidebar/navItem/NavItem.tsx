import React from 'react';
import { Menu, theme } from 'antd';
import { NavLink } from 'react-router';

const { useToken } = theme;

interface NavItemProps {
  item: any;
  pathDirect: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ item, pathDirect, onClick }) => {
  const { token } = useToken();
  const isActive = pathDirect === item.href;

  return (
    <Menu.Item
      key={item.href}
      icon={item.icon ? React.createElement(item.icon, {
        style: { color: isActive ? token.colorPrimary : token.colorTextSecondary }
      }) : null}
      style={{
        backgroundColor: isActive ? token.colorPrimaryBg : 'transparent',
        borderRadius: token.borderRadius,
        margin: '4px 0',
      }}
    >
      <NavLink
        to={item.href}
        style={{
          color: isActive ? token.colorPrimary : token.colorText,
          textDecoration: 'none',
          fontWeight: isActive ? 500 : 400,
        }}
        onClick={onClick}
      >
        {item.title}
      </NavLink>
    </Menu.Item>
  );
};

export default NavItem;