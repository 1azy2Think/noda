import React, { useRef, useState, type ReactNode } from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router";
import Sidebar from "./sidebar/Sidebar";
import HeaderBar from "./header/Header";
import { useThemeMode } from "../../context/ThemeContext";

const { Header, Content } = Layout;
const { useToken } = theme;

interface FullLayoutProps {
  children?: ReactNode;
}

const FullLayout: React.FC<FullLayoutProps> = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hover, setHover] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { token } = useToken();
  const { mode } = useThemeMode();

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHover(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setHover(false);
    }, 300);
  };

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onCollapse={(value: boolean) => setCollapsed(value)}
        hover={hover}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />

      {/* Main content area */}
      <Layout>
        {/* Header */}
        <Header
          style={{
            padding: 0,
            position: "sticky",
            top: 0,
            zIndex: 100,
            // Remove manual background color - let theme handle it
            backgroundColor: token.colorBgContainer,
          }}
        >
          <HeaderBar
            collapsed={collapsed}
            toggleSidebar={() => setCollapsed(!collapsed)}
            setHover={setHover}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        </Header>

        {/* Page content */}
        <Content
          style={{
            margin: "0",
            // padding: collapsed ? "20px 60px" : "20px 20px",
            padding: "0",
            maxWidth: "calc(100vw)",
            minHeight: "calc(100vh - 170px)",
            // backgroundColor: token.colorBgContainer,
            backgroundColor: mode === 'dark' ? "#1f1f1f" : "#ffffff",
          }}
        >
          <Outlet />
        </Content>

        {/* Footer */}
        {/* <Footer
          style={{
            textAlign: "center",
            backgroundColor: "transparent",
          }}
        >
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default FullLayout;