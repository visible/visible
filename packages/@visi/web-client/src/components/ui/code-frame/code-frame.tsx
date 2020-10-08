import classNames from 'classnames';
import { parsePatch } from 'diff';
import React, { useMemo } from 'react';

import { useTranslation } from '../../../utils/i18next';
import { Typography } from '../typography';

export type LineAppearance = 'red' | 'green' | 'normal';

type LineProps = {
  appearance: LineAppearance;
  lineNumber: number;
  children: string;
  'aria-label'?: string;
};

const Line = ({
  children: value,
  appearance,
  lineNumber,
  ...rest
}: LineProps) => {
  const { t } = useTranslation();
  // const chars = value !== '' ? value.replace(/\s/g, '&nbsp;') : '&nbsp;';

  return (
    <>
      <span className="sr-only">
        {t('code-frame.line-number', 'Line number: {{number}}', {
          number: lineNumber,
        })}
      </span>

      <span
        className={classNames(
          'block',
          'whitespace-no-wrap',
          'leading-5',
          'px-2',
          'whitespace-pre',
          appearance === 'red' && ['bg-red-200'],
          appearance === 'green' && ['bg-green-200'],
        )}
        {...rest}
      >
        {value}
      </span>
    </>
  );
};

Line.defaultProps = {
  appearance: 'normal',
};

type CodeProps = {
  children: React.ReactNode;
};

const Code = ({ children }: CodeProps) => {
  return (
    <div
      className={classNames(
        'font-mono',
        'text-xs',
        'text-gray-800',
        'py-1',
        'w-full',
        'overflow-scroll',
      )}
    >
      {children}
    </div>
  );
};

type ToolbarProps = JSX.IntrinsicElements['header'] & {
  title: string;
  filename: string;
  href: string;
};

const Toolbar = ({ title, filename, href, ...rest }: ToolbarProps) => {
  const { t } = useTranslation();

  return (
    <header
      className={classNames(
        'flex',
        'box-border',
        'border-b',
        'p-2',
        'border-gray-400',
        'bg-gray-100',
        'space-x-4',
      )}
      {...rest}
    >
      <Typography variant="h4" color="wash" fontSize="sm">
        <a
          className="hover:underline"
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          {title}
        </a>
      </Typography>

      <Typography
        variant="h4"
        fontWeight="normal"
        color="wash"
        fontSize="xs"
        font="mono"
        aria-label={t('code-frame.filename', 'Filename')}
      >
        {filename}
      </Typography>
    </header>
  );
};

Toolbar.defaultProps = {
  filename: 'untitled.txt',
  title: 'Code frame',
  href: '#',
};

type LineNumberProps = {
  children: number;
};

const LineNumber = ({ children }: LineNumberProps) => {
  return (
    <span className={classNames('leading-5', 'text-xs', 'w-6', 'text-right')}>
      {children}
    </span>
  );
};

type LineNumberContainerProps = {
  children: React.ReactNode;
};

const LineNumberContainer = ({ children }: LineNumberContainerProps) => {
  return (
    <div
      aria-hidden
      className={classNames(
        'flex',
        'flex-col',
        'border-r',
        'border-gray-400',
        'text-gray-600',
        'font-mono',
        'py-1',
        'px-1',
      )}
    >
      {children}
    </div>
  );
};

type ViewerProps = {
  title: string;
  filename?: string;
  href?: string;
  lines: React.ReactNode;
  lineNumbers: React.ReactNode;
  className?: string;
};

const Viewer = ({
  className,
  title,
  filename,
  href,
  lines,
  lineNumbers,
}: ViewerProps) => {
  return (
    <div
      className={classNames(
        'box-border',
        'border',
        'border-gray-400',
        'rounded-md',
        'max-w-full',
        className,
      )}
    >
      <Toolbar title={title} filename={filename} href={href} />

      <div className={classNames('flex', 'w-full')}>
        <LineNumberContainer aria-hidden>{lineNumbers}</LineNumberContainer>
        <Code>{lines}</Code>
      </div>
    </div>
  );
};

export type CodeFrameProps = JSX.IntrinsicElements['code'] & {
  value: string;
  title: string;
  gap: number;
  maxLines: number;
  highlightStart: number;
  highlightEnd: number;
  highlightColor: LineAppearance;
  filename?: string;
  href?: string;
};

export const CodeFrame = ({
  value,
  title,
  gap,
  ref: _ref,
  maxLines,
  highlightColor,
  highlightEnd,
  highlightStart,
  ...rest
}: CodeFrameProps) => {
  const initialLine = Math.max(highlightStart - gap, 0);

  // prettier-ignore
  const nodes = value
    .split('\n')
    .slice(initialLine, highlightEnd + gap)
    .reduce<string[]>((xs, x) => xs.length >= maxLines ? xs : xs.concat(x), [])
    .map((line, i) => {
      return {
        line: <Line key={`line-${i}`} appearance={highlightColor} lineNumber={i + 1}>{line}</Line>,
        number: <LineNumber key={`number-${i}`}>{initialLine + i + 1}</LineNumber>,
      };
    });

  const lines = nodes.map((node) => node.line);
  const lineNumbers = nodes.map((node) => node.number);

  return (
    <Viewer title={title} lineNumbers={lineNumbers} lines={lines} {...rest} />
  );
};

CodeFrame.defaultProps = {
  highlightColor: 'normal',
  highlightStart: NaN,
  highlightEnd: NaN,
  gap: 5,
  maxLines: 20,
};

export type DiffCodeFrameProps = {
  hunk: string;
  title: string;
  filename?: string;
  className?: string;
  href?: string;
};

type Modification = 'added' | 'removed' | 'none';

const getMod = (line: string): Modification => {
  if (/^\+/.test(line)) return 'added';
  if (/^-/.test(line)) return 'removed';
  return 'none';
};

const mapLineAppearance = (mod: Modification): LineAppearance => {
  return {
    added: 'green' as const,
    removed: 'red' as const,
    none: 'normal' as const,
  }[mod];
};

export const DiffCodeFrame = ({ hunk, title, ...rest }: DiffCodeFrameProps) => {
  const { t } = useTranslation();
  const [diff] = useMemo(() => parsePatch(hunk), [hunk]);

  const nodeStructure = diff.hunks.flatMap((hunk) =>
    hunk.lines.flatMap((line, i) => {
      const mod = getMod(line);
      const appearance = mapLineAppearance(mod);
      const num = mod === 'added' ? hunk.newStart + i : hunk.oldStart + i;
      const label =
        mod === 'added'
          ? t('diff-code-frame.added', 'Added line', { content: line })
          : mod === 'removed'
          ? t('diff-code-frame.removed', 'Removed line', { content: line })
          : undefined;

      return {
        num: <LineNumber key={`number-${i}`}>{num}</LineNumber>,
        line: (
          <Line
            key={`line-${i}`}
            appearance={appearance}
            lineNumber={i + 1}
            aria-label={label}
          >
            {line}
          </Line>
        ),
      };
    }),
  );

  const numbers = nodeStructure.map((a) => a.num);
  const lines = nodeStructure.map((a) => a.line);

  return <Viewer title={title} lines={lines} lineNumbers={numbers} {...rest} />;
};
