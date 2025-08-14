import React from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { theme as antdTheme } from "antd";

export default function MyEditor() {
  const { token } = antdTheme.useToken();
  const isDark = token.colorBgBase === "#000";

  const editor = useCreateBlockNote();

  return (
    <BlockNoteView
      editor={editor}
      theme={isDark ? "dark" : "light"}
    />
  );
}
