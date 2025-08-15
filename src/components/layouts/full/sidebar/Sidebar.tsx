import { Button, Flex, Layout, Typography, theme } from 'antd';
import {
  MenuFoldOutlined,
} from '@ant-design/icons';
import SidebarItems from './SidebarItems';
import Logo from '../shared/logo/Logo';
const { Sider } = Layout;
const { Text } = Typography;
const { useToken } = theme;

interface MSidebarProps {
  collapsed: boolean,
  onCollapse: any,
  hover: boolean,
  handleMouseEnter: () => void,
  handleMouseLeave: () => void,
}

const Sidebar: React.FC<MSidebarProps> = ({ collapsed, onCollapse, hover, handleMouseEnter, handleMouseLeave }) => {
  const { token } = useToken();

  return (
    <>
      {!collapsed && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={270}
          style={{
            backgroundColor: token.colorBgContainer,
            borderRight: `1px solid ${token.colorBorderSecondary}`,
            overflow: 'auto',
            height: '100vh',
            position: 'sticky',
            insetInlineStart: 0,
            top: 0,
            bottom: 0,
            scrollbarWidth: 'thin',
            scrollbarGutter: 'stable',
          }}
        >
          {/* Logo */}
          <Flex justify='space-between' align="center" style={{ padding: '16px', flexShrink: 0 }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* <Image src={logo} alt="logo" width={32} preview={false} /> */}
              <Logo />
              <Text strong style={{ color: token.colorText }}>Noda</Text>
            </div>
            <Button
              type="text"
              icon={<MenuFoldOutlined />}
              onClick={() => onCollapse(!collapsed)}
              style={{
                fontSize: '16px',
                width: 32,
                height: 32,
              }}
            />
          </Flex>

          {/* Menu Items using SidebarItems component */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
            <SidebarItems />
          </div>
        </Sider>
      )}

      {collapsed && hover && (
        <Sider
          width={270}
          style={{
            position: 'fixed',
            top: 64,
            zIndex: 100,
            backgroundColor: token.colorBgContainer,
            boxShadow: token.boxShadowSecondary,
            borderRight: `1px solid ${token.colorBorderSecondary}`,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={{ padding: '8px' }}>
            <SidebarItems />
          </div>
        </Sider>
      )}
    </>
  );
};

export default Sidebar;