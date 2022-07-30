import Document, { Html, Head, Main, NextScript } from 'next/document';
import {APP_INFO} from '/constants'


export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            src="https://graphcomment.com/js/integration.js"
            defer
          />
        </Head>
        <body data-before={APP_INFO.APP_NAME}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
