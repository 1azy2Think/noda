import React from 'react';
import { Menu, theme } from 'antd';

const { useToken } = theme;

interface NavGroupProps {
  item: { subheader: string; children?: any[] };
}

const NavGroup: React.FC<NavGroupProps> = ({ item }) => {
  const { token } = useToken();

  return (
    <Menu.ItemGroup
      key={item.subheader}
      title={
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
      }
    >
      {(item.children || []).map((child) => (
        <Menu.Item 
          key={child.href} 
          icon={child.icon ? React.createElement(child.icon, {
            style: { color: token.colorTextSecondary }
          }) : null}
          style={{
            borderRadius: token.borderRadius,
            margin: '4px 0',
          }}
        >
          {child.title}
        </Menu.Item>
      ))}
    </Menu.ItemGroup>
  );
};

export default NavGroup;