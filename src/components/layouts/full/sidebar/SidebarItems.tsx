import React, { useState } from 'react';
import { Menu, theme, type MenuProps, Typography, Flex, Button } from 'antd';
import Menuitems, { type MenuItemType } from './MenuItems';
import { Link, useLocation } from 'react-router';
import { TbPlus, TbChevronDown, TbChevronRight, TbRefresh, TbProgress } from "react-icons/tb";

const { useToken } = theme;
const { Title } = Typography;

const SidebarItems: React.FC = () => {
  const location = useLocation();
  const { token } = useToken();
  const menuItems = Menuitems();

  // State to track collapsed sections
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  // Toggle section collapse
  const toggleSection = (sectionKey: string) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(sectionKey)) {
      newCollapsed.delete(sectionKey);
    } else {
      newCollapsed.add(sectionKey);
    }
    setCollapsedSections(newCollapsed);
  };

  // Group items by navlabel sections
  const groupItemsByNavLabel = (items: MenuItemType[]) => {
    const groups: { navLabel?: MenuItemType; items: MenuItemType[] }[] = [];
    let currentGroup: { navLabel?: MenuItemType; items: MenuItemType[] } = { items: [] };

    for (const item of items) {
      if (item.navlabel) {
        // Start new group
        if (currentGroup.items.length > 0 || currentGroup.navLabel) {
          groups.push(currentGroup);
        }
        currentGroup = { navLabel: item, items: [] };
      } else {
        currentGroup.items.push(item);
      }
    }

    // Add the last group
    if (currentGroup.items.length > 0 || currentGroup.navLabel) {
      groups.push(currentGroup);
    }

    return groups;
  };

  // Render action buttons
  const renderActionButtons = (buttons: string[], sectionKey?: string) => {
    return buttons.map((buttonType) => {
      switch (buttonType) {
        case 'add':
          return (
            <Button
              key="add"
              type="text"
              size="small"
              icon={<TbPlus size={14} />}
              onClick={(e) => {
                e.stopPropagation();
                console.log('Add clicked for section:', sectionKey);
                // Your add logic here
              }}
              style={{
                color: token.colorTextSecondary,
                border: 'none',
                padding: '2px 4px',
                height: 'auto',
                minWidth: 'auto'
              }}
            />
          );
        case 'refresh':
          return (
            <Button
              key="refresh"
              type="text"
              size="small"
              icon={<TbRefresh size={14} />}
              onClick={(e) => {
                e.stopPropagation();
                console.log('Refresh clicked for section:', sectionKey);
                // Your refresh logic here
              }}
              style={{
                color: token.colorTextSecondary,
                border: 'none',
                padding: '2px 4px',
                height: 'auto',
                minWidth: 'auto'
              }}
            />
          );
        default:
          return null;
      }
    });
  };

  // Render individual menu items
  const renderMenuItems = (items: MenuItemType[]): NonNullable<MenuProps['items']> => {
    return items.map((item) => {
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
          <>
            <Flex justify='space-between' align='center'>
              <Link
                to={item.href}
                onClick={(e) => {
                  if (item.onprogress) {
                    e.preventDefault();
                  }
                }}
                style={{
                  color: item.onprogress
                    ? token.colorTextDisabled
                    : location.pathname === item.href
                      ? token.colorPrimary
                      : token.colorText,
                  textDecoration: 'none',
                  fontWeight: location.pathname === item.href ? 500 : 400,
                  pointerEvents: item.onprogress ? 'none' : 'auto',
                  cursor: item.onprogress ? 'not-allowed' : 'pointer'
                }}
              >
                {item.title}
              </Link>
              {item.onprogress && <Button type='text' icon={<TbProgress />} disabled>TBA</Button>}
            </Flex>
          </>
        ) : item.title,
        style: {
          backgroundColor: location.pathname === item.href ? token.colorPrimaryBgHover : 'transparent',
          borderRadius: token.borderRadius,
          margin: '4px 0',
          transition: 'all 0.2s ease-in-out',
        },
        className: 'sidebar-menu-item'
      };
    });
  };

  // Group items and render
  const groups = groupItemsByNavLabel(menuItems);

  return (
    <>
      <style>
        {`
          .sidebar-menu-item:hover {
            background-color: ${token.colorBgTextHover} !important;
          }
          .nav-label-header {
            cursor: pointer;
            padding: 8px 12px;
            margin: 8px 0 4px 0;
            border-radius: ${token.borderRadius}px;
            transition: all 0.2s ease-in-out;
          }
          .nav-label-header:hover {
            background-color: ${token.colorFillQuaternary};
          }
        `}
      </style>

      {groups.map((group, groupIndex) => {
        const sectionKey = group.navLabel?.subheader || `section-${groupIndex}`;
        const isCollapsed = collapsedSections.has(sectionKey);

        return (
          <div key={sectionKey}>
            {/* Render NavLabel Header */}
            {group.navLabel && group.navLabel.subheader && (
              <div
                className="nav-label-header"
                onClick={() => group.navLabel?.collapsible && toggleSection(sectionKey)}
              >
                <Flex justify="space-between" align="center">
                  <Flex align="center" gap={8}>
                    {group.navLabel.collapsible && (
                      <span style={{ color: token.colorTextSecondary }}>
                        {isCollapsed ? <TbChevronRight size={12} /> : <TbChevronDown size={12} />}
                      </span>
                    )}
                    <Title
                      level={5}
                      style={{
                        fontWeight: 600,
                        color: token.colorTextSecondary,
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2px',
                        margin: 0,
                      }}
                    >
                      {group.navLabel.subheader}
                    </Title>
                  </Flex>

                  {group.navLabel.buttons && (
                    <Flex gap={2} onClick={(e) => e.stopPropagation()}>
                      {renderActionButtons(group.navLabel.buttons, sectionKey)}
                    </Flex>
                  )}
                </Flex>
              </div>
            )}

            {/* Render Menu Items (collapsed/expanded) */}
            {(!group.navLabel?.collapsible || !isCollapsed) && group.items.length > 0 && (
              <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                items={renderMenuItems(group.items)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  marginBottom: group.navLabel ? '16px' : '0',
                }}
              />
            )}

            {/* Render items without navLabel (for items before first navLabel) */}
            {!group.navLabel && group.items.length > 0 && (
              <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                items={renderMenuItems(group.items)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  marginBottom: '16px',
                }}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

export default SidebarItems;