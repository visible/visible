import { AppProps } from 'next/app';
import Document, { Main, NextScript } from 'next/document';
import Head from 'next/head';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document<{ styleTags: string }> {
  static getInitialProps({ renderPage }: any) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage(
      (App: React.ComponentType<AppProps>) => (props: AppProps) =>
        sheet.collectStyles(<App {...props} />),
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="en">
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
