import React from 'react';
import { HelmetData } from 'react-helmet';

export interface HtmlProps {
  state: unknown;
  content: string;
  manifest: { [K: string]: string };
  elements?: React.ReactElement<{}>[];
  helmet?: HelmetData;
}

const encodeState = (state: unknown) =>
  `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`;

export const Html = (props: HtmlProps) => {
  const { helmet, state, content, elements, manifest } = props;

  return (
    // eslint-disable-next-line jsx-a11y/html-has-lang
    <html {...helmet?.htmlAttributes.toString()}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        {helmet?.title.toComponent()}
        {helmet?.meta.toComponent()}
        {helmet?.link.toComponent()}
        {elements}
      </head>

      <body {...helmet?.bodyAttributes.toString()}>
        <div
          id="root"
          role="application"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <script dangerouslySetInnerHTML={{ __html: encodeState(state) }} />
        <script type="text/javascript" src={manifest['main.js']} />
      </body>
    </html>
  );
};
