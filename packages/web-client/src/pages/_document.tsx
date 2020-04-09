import Document, {
  DocumentContext,
  Html,
  Main,
  NextScript,
} from 'next/document';
import Head from 'next/head';
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

export default class CustomDocument extends Document<CustomDocumentProps> {
  static async getInitialProps({
    res,
    renderPage,
  }: DocumentContext & NextI18nextContext) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return {
      ...page,
      styleTags,
      lang: res?.locals.language,
      dir: res?.locals.languageDir,
    };
  }

  render() {
    const { lang, dir, styleTags } = this.props;

    return (
      <Html lang={lang} dir={dir}>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {styleTags}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
