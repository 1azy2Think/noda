import React from "react";
import { Layout, Button, Space, Breadcrumb, Row, theme } from "antd";
import {
    MenuUnfoldOutlined,
    HomeOutlined,
    SearchOutlined,
    AppstoreOutlined,
} from "@ant-design/icons";
import ProfileMenu from "./ProfileMenu";

const { Header } = Layout;
const { useToken } = theme;

interface AppHeaderProps {
    collapsed: boolean;
    toggleSidebar: () => void;
    notes?: boolean;
    setHover: any;
    handleMouseEnter: () => void,
    handleMouseLeave: () => void,
}

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, toggleSidebar, setHover, handleMouseEnter, handleMouseLeave, notes }) => {
    const { token } = useToken();
    
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
                    < Row>
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

                        {/* Home icon only if in notes mode */}
                        {notes && (
                            <Button
                                type="text"
                                icon={<HomeOutlined />}
                                style={{ padding: 0 }}
                            />
                        )}

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