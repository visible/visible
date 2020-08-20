import Editor, { DiffEditor, monaco } from '@monaco-editor/react';
import { Badge, Typography } from '@visi/web-ui';
import { applyPatch } from 'diff';
import React from 'react';
import styled from 'styled-components';

import { Outcome, ReportLargeFragment } from '../../generated/graphql';
import { useTranslation } from '../../utils/i18next';
import { Image } from '../image';

monaco.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.19.3/min/vs',
  },
});

const Wrapper = styled.div`
  padding: 18px 12px;
`;

const Content = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 18px;

  ${Image} {
    margin-right: 18px;
  }
`;

const Meta = styled.div`
  flex: 1 0 auto;

  ${Badge} {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    height: min-content;
    margin: auto 12px auto 0;
  }
`;

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

export interface ReportProps {
  original: string;
  report: ReportLargeFragment;
}

export const Report = ({ report, original }: ReportProps) => {
  const { t } = useTranslation();
  const variant =
    report.outcome === Outcome.Passed
      ? 'green'
      : report.outcome === Outcome.Fail
      ? 'red'
      : 'grey';

  const patch = report.diffHunk && applyPatch(original, report.diffHunk);

  return (
    <Wrapper>
      <Content>
        {report.screenshot && (
          <Image
            src={report.screenshot}
            alt={
              report.target ?? t('report.no-desc', 'no description provided')
            }
            size={80}
          />
        )}

        <Meta>
          <Badge variant={variant}>{report.outcome}</Badge>
          <Typography variant="body">{report.rule.name}</Typography>
          <Typography variant="h4">{report.message}</Typography>

          <Typography
            variant="body"
            fontStyle={report.message == null ? 'italic' : 'normal'}
          >
            {report.message ?? 'No message'}
          </Typography>
        </Meta>
      </Content>

      <EditorWrapper>
        {patch != original ? (
          <DiffEditor
            options={{
              renderSideBySide: false,
              readOnly: true,
            }}
            original={original}
            modified={patch}
          />
        ) : (
          <Editor
            value={original}
            line={report.location?.startLine}
            editorDidMount={(_, editor) => {
              if (report.location == null) return;
              editor.deltaDecorations(
                [],
                [
                  {
                    range: {
                      startLineNumber: report.location.startLine,
                      startColumn: report.location.startColumn,
                      endLineNumber: report.location.endLine,
                      endColumn: report.location.endColumn,
                    },
                    options: {
                      hoverMessage: report.message
                        ? { value: report.message }
                        : null,
                      className: 'warning',
                    },
                  },
                ],
              );
            }}
            options={{
              cursorSurroundingLines: 5,
              minimap: { enabled: false },
              readOnly: true,
            }}
          />
        )}
      </EditorWrapper>
    </Wrapper>
  );
};
