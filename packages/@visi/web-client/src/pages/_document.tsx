import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

import { NextI18NextRequest } from '../utils/i18next';

interface I18nextContext {
  req: NextI18NextRequest;
}

interface CustomDocumentProps {
  styleTags: React.ReactNode;
  lang?: string;
  dir?: 'ltr' | 'rtl';
}

class CustomDocument extends Document<CustomDocumentProps> {
  static async getInitialProps(ctx: DocumentContext & I18nextContext) {
    const { req } = ctx;

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      lang: req.lng,
      dir: req.i18n?.dir,
    };
  }

  render() {
    const { lang, dir } = this.props;

    return (
      <Html lang={lang} dir={dir}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
