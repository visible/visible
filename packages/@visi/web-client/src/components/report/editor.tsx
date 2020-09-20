import MonacoEditor, { DiffEditor, monaco } from '@monaco-editor/react';
import { applyPatch } from 'diff';
// eslint-disable-next-line
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import React from 'react';
import styled from 'styled-components';

import { Location } from '../../generated/graphql';

monaco.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.19.3/min/vs',
  },
});

const EditorWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 8px;

  .warning {
    background: pink;
  }
`;

export type EditorProps = {
  value: string;
  patch?: string;
  message?: string;
  location?: Location;
};

export const Editor = (props: EditorProps) => {
  const { value, patch, location, message } = props;
  const modified = patch != null ? applyPatch(value, patch) : null;

  const handleEditorDidMount = (
    _: unknown,
    editor: editor.IStandaloneCodeEditor,
  ) => {
    if (location == null) return;

    editor.revealPositionInCenterIfOutsideViewport({
      lineNumber: location.startLine,
      column: location.startColumn,
    });

    editor.deltaDecorations(
      [],
      [
        {
          range: {
            startLineNumber: location.startLine,
            startColumn: location.startColumn,
            endLineNumber: location.endLine,
            endColumn: location.endColumn,
          },
          options: {
            hoverMessage: message ? { value: message } : null,
            className: 'warning',
          },
        },
      ],
    );
  };

  if (modified != null) {
    return (
      <EditorWrapper>
        <DiffEditor
          options={{
            renderSideBySide: false,
            readOnly: true,
          }}
          original={value}
          modified={modified}
        />
      </EditorWrapper>
    );
  }

  return (
    <EditorWrapper>
      <MonacoEditor
        value={value}
        line={location?.startLine}
        editorDidMount={handleEditorDidMount}
        options={{
          cursorSurroundingLines: 5,
          minimap: { enabled: false },
          readOnly: true,
        }}
      />
    </EditorWrapper>
  );
};
