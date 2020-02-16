import React from 'react';
import { HelmetData } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export interface HtmlProps {
  state: unknown;
  content: string;
  manifest: { [K: string]: string };
  elements?: React.ReactElement<{}>[];
  helmet?: HelmetData;
}

export const Html = (props: HtmlProps) => {
  const { helmet, state, content, elements, manifest } = props;
  const { i18n } = useTranslation();

  return (
    <html lang={i18n.language}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        {helmet?.title.toComponent()}
        {helmet?.meta.toComponent()}
        {helmet?.link.toComponent()}
        {elements}
      </head>

      <body>
        <div
          id="root"
          role="application"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
              /</g,
              '\\u003c',
            )};`,
          }}
        />
        <script type="text/javascript" src={manifest['main.js']} />
      </body>
    </html>
  );
};
