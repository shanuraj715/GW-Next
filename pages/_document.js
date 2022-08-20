import Document, { Html, Head, Main, NextScript } from 'next/document';
import { APP_INFO } from '/constants'
import { useEffect } from 'react'


function MyDocument() {


  return (
    <Html>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-164476484-1" />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-164476484-1', {
              page_path: window.location.pathname,
            });
            `,
        }} />

        <script async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6719876622039428"
          crossOrigin="anonymous"></script>
      



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

export default MyDocument