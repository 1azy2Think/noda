import { useEffect, useState, useRef } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import {
  Tree,
  Typography,
  Space,
  Card,
  Affix,
  theme,
  Layout
} from "antd";
import {
  CaretDownOutlined,
  CaretRightOutlined,
  EyeInvisibleOutlined,
  FileTextOutlined
} from "@ant-design/icons";
import type { DataNode } from "antd/es/tree";

const { Text } = Typography;
const { Sider, Content } = Layout
const { useToken } = theme

type Section = {
  id: string;
  text: string;
  level: number;
  startIndex: number;
  endIndex: number;
  children: Section[];
};

export default function NoteEditor() {
  const editor = useCreateBlockNote();
  const [sections, setSections] = useState<Section[]>([]);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [hiddenBlocks, setHiddenBlocks] = useState<Set<string>>(new Set());
  const editorRef = useRef<HTMLDivElement>(null);
  const { token } = useToken();

  // Build hierarchical section tree
  const buildSectionTree = (flatSections: any[]): Section[] => {
    const root: Section[] = [];
    const stack: Section[] = [];

    flatSections.forEach((section) => {
      const newSection: Section = { ...section, children: [] };

      // Pop stack until we find a parent with lower level
      while (stack.length > 0 && stack[stack.length - 1].level >= newSection.level) {
        stack.pop();
      }

      if (stack.length === 0) {
        root.push(newSection);
      } else {
        stack[stack.length - 1].children.push(newSection);
      }

      stack.push(newSection);
    });

    return root;
  };

  // Extract sections from editor
  useEffect(() => {
    if (!editor) return;

    const updateSections = () => {
      const blocks = editor.document;
      const flatSections: any[] = [];

      // Find all headings
      blocks.forEach((block, index) => {
        if (block.type === "heading") {
          const level = block.props?.level || 1;
          const text = block.content?.[0]?.text || "Untitled";

          flatSections.push({
            id: block.id,
            text,
            level,
            startIndex: index,
            endIndex: index,
          });
        }
      });

      // Calculate end indices
      for (let i = 0; i < flatSections.length; i++) {
        let endIndex = blocks.length - 1;
        for (let j = i + 1; j < flatSections.length; j++) {
          if (flatSections[j].level <= flatSections[i].level) {
            endIndex = flatSections[j].startIndex - 1;
            break;
          }
        }
        flatSections[i].endIndex = endIndex;
      }

      const hierarchicalSections = buildSectionTree(flatSections);
      setSections(hierarchicalSections);
    };

    updateSections();
    const unsubscribe = editor.onChange(updateSections);
    return unsubscribe;
  }, [editor]);

  // Calculate which blocks should be hidden
  useEffect(() => {
    if (!editor) return;

    const newHiddenBlocks = new Set<string>();
    const blocks = editor.document;

    const processSection = (section: Section) => {
      if (collapsedSections.has(section.id)) {
        // Hide all blocks between startIndex+1 and endIndex
        for (let i = section.startIndex + 1; i <= section.endIndex; i++) {
          const block = blocks[i];
          if (block) {
            newHiddenBlocks.add(block.id);
          }
        }
      } else {
        // Process children recursively
        section.children.forEach(processSection);
      }
    };

    sections.forEach(processSection);
    setHiddenBlocks(newHiddenBlocks);
  }, [collapsedSections, sections, editor]);

  // Apply hiding styles
  useEffect(() => {
    const styleId = "document-collapse-styles";
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    let css = "";
    hiddenBlocks.forEach(blockId => {
      css += `[data-id="${blockId}"] { display: none !important; }\n`;
    });

    styleElement.textContent = css;

    return () => {
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, [hiddenBlocks]);

  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const scrollToSection = (sectionId: string) => {
    // First expand the section if it's collapsed
    if (collapsedSections.has(sectionId)) {
      toggleSection(sectionId);
    }

    setTimeout(() => {
      const element = document.querySelector(`[data-id="${sectionId}"]`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"  // This helps prevent horizontal scrolling
        });
      }
    }, 100);
  };

  // Convert sections to Ant Design Tree data structure
  const convertToTreeData = (sections: Section[]): DataNode[] => {
    return sections.map(section => ({
      key: section.id,
      title: (
        <Space size="small" style={{ width: '100%', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontWeight: section.level <= 2 ? 600 : 400,
              color: section.level === 1 ? '#1f2937' : section.level === 2 ? '#374151' : '#6b7280',
              fontSize: section.level === 1 ? '14px' : '13px'
            }}
            ellipsis={{ tooltip: section.text }}
          >
            {section.text}
          </Text>
          <Space size={4}>
            {collapsedSections.has(section.id) && section.children.length > 0 && (
              <EyeInvisibleOutlined style={{ fontSize: '10px', color: '#9ca3af' }} />
            )}
            <Text type="secondary" style={{ fontSize: '10px' }}>
              H{section.level}
            </Text>
          </Space>
        </Space>
      ),
      icon: section.children.length > 0 ? (
        collapsedSections.has(section.id) ?
          <CaretRightOutlined /> :
          <CaretDownOutlined />
      ) : (
        <FileTextOutlined style={{ fontSize: '10px' }} />
      ),
      children: section.children.length > 0 ? convertToTreeData(section.children) : undefined,
    }));
  };

  // Handle tree node selection (clicking on a heading)
  const handleTreeSelect = (selectedKeys: React.Key[]) => {
    if (selectedKeys.length > 0) {
      const sectionId = selectedKeys[0] as string;
      scrollToSection(sectionId);
    }
  };

  // Handle tree node expansion/collapse
  const handleTreeExpand = (expandedKeys: React.Key[]) => {
    const newCollapsedSections = new Set<string>();

    // Find all sections that should be collapsed
    const findAllSectionIds = (sections: Section[]): string[] => {
      const ids: string[] = [];
      sections.forEach(section => {
        ids.push(section.id);
        if (section.children.length > 0) {
          ids.push(...findAllSectionIds(section.children));
        }
      });
      return ids;
    };

    const allSectionIds = findAllSectionIds(sections);

    allSectionIds.forEach(id => {
      if (!expandedKeys.includes(id)) {
        newCollapsedSections.add(id);
      }
    });

    setCollapsedSections(newCollapsedSections);
  };

  const getExpandedKeys = (): React.Key[] => {
    const findAllSectionIds = (sections: Section[]): string[] => {
      const ids: string[] = [];
      sections.forEach(section => {
        if (!collapsedSections.has(section.id)) {
          ids.push(section.id);
        }
        if (section.children.length > 0) {
          ids.push(...findAllSectionIds(section.children));
        }
      });
      return ids;
    };

    return findAllSectionIds(sections);
  };

  return (
    <Layout style={{ height: "calc(100vh - 64px)", background: "#fff" }}>
      {/* Small collapsible navbar (document outline) */}

      {sections.length > 0 && (
        <Sider
          width={270}
          style={{
            position: 'sticky',
            top: 64,
            left: 0,
            backgroundColor: token.colorBgContainer,
            boxShadow: token.boxShadowSecondary,
            borderRight: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <Affix offsetTop={0}>
            <Card
              title="Document Outline"
              size="small"
              style={{
                height: "100vh",
                borderRadius: 0,
                border: "none",
                borderBottom: "1px solid #f0f0f0"
              }}
              bodyStyle={{
                padding: "8px",
                height: "calc(100vh - 57px)",
                overflowY: "auto"
              }}
            >
              <Tree
                selectable
                expandedKeys={getExpandedKeys()}
                onSelect={handleTreeSelect}
                onExpand={handleTreeExpand}
                treeData={convertToTreeData(sections)}
                style={{
                  fontSize: '13px',
                  userSelect: 'none'  // Prevent text selection which can cause dragging
                }}
                titleRender={(nodeData) => (
                  <div
                    style={{
                      userSelect: 'none',  // Prevent text selection
                      WebkitUserSelect: 'none',  // Safari
                      MozUserSelect: 'none',  // Firefox
                      msUserSelect: 'none',  // IE
                      cursor: 'pointer'
                    }}
                  >
                    {nodeData.title}
                  </div>
                )}
              />
            </Card>
          </Affix>
        </Sider>
      )}

      {/* Editor */}
      <Content style={{ padding: 16, overflow: "auto" }}>
        <div ref={editorRef}>
          <BlockNoteView
            editor={editor}
            theme="light"
            style={{
              minHeight: "calc(--full-screen-height - --header-height - 32px)",
              border: "none"
            }}
          />
        </div>
      </Content>
    </Layout>
  );
}