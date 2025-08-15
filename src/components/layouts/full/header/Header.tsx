import React from "react";
import { Layout, Button, Space, Breadcrumb, Row, theme } from "antd";
import {
    MenuUnfoldOutlined,
    HomeOutlined,
    SearchOutlined,
    AppstoreOutlined,
} from "@ant-design/icons";
import ProfileMenu from "./ProfileMenu";
import { useLocation, Link } from "react-router";

const { Header } = Layout;
const { useToken } = theme;

interface AppHeaderProps {
    collapsed: boolean;
    toggleSidebar: () => void;
    setHover: any;
    handleMouseEnter: () => void,
    handleMouseLeave: () => void,
}

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, toggleSidebar, setHover, handleMouseEnter, handleMouseLeave }) => {
    const { token } = useToken();
    const location = useLocation();

    return (
        <Header
            style={{
                padding: "0 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // Use theme tokens for consistent styling
                backgroundColor: token.colorBgContainer,
                borderBottom: `1px solid ${token.colorBorderSecondary}`,
            }}
        >
            {/* Left section */}
            <Space size="middle" align="center">

                {collapsed &&
                    <Row align="middle">
                        {/* Sidebar toggle */}
                        <Button
                            type="text"
                            icon={<MenuUnfoldOutlined />}
                            onClick={() => {
                                toggleSidebar();
                                setHover(false);
                            }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />

                        {location.pathname !== "/dashboard" && (
                            <Link to="/dashboard">
                            <Button
                                type="text"
                                icon={<HomeOutlined />}
                                style={{ padding: 0 }}
                            />
                            </Link>
                        )}

                        {/* {notes && (
                            <Button
                                type="text"
                                icon={<HomeOutlined />}
                                style={{ padding: 0 }}
                            />
                        )} */}

                    </Row>
                }

                {/* Breadcrumb / Project structure */}
                <Breadcrumb
                    items={[
                        { title: <a href="">Storage</a>, },
                        { title: <a href="">RAG</a> },
                        { title: "Topic 1" },
                    ]}
                />
            </Space>

            {/* Right section */}
            <Space size="middle" align="center">
                <Button type="text" icon={<SearchOutlined />} />
                <Button type="text" icon={<AppstoreOutlined />} />
                <ProfileMenu />
            </Space>
        </Header>
    );
};

export default AppHeader;