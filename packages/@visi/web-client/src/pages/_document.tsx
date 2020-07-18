import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

import { I18n, TFunction } from '../utils/i18next';

interface NextI18nextContext {
  res?: {
    locals: {
      language: string;
      languageDir: 'ltr' | 'rtl';
      t: TFunction;
      i18n: I18n;
    };
  };
}

interface CustomDocumentProps {
  styleTags: React.ReactNode;
  lang?: string;
  dir?: 'ltr' | 'rtl';
}

class CustomDocument extends Document<CustomDocumentProps> {
  static async getInitialProps(ctx: DocumentContext & NextI18nextContext) {
    const { res } = ctx;

    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        lang: res?.locals.language,
        dir: res?.locals.languageDir,
        styleTags: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const { lang, dir, styleTags } = this.props;

    return (
      <Html lang={lang} dir={dir}>
        <Head>{styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
