import Document, { Html, Head, Main, NextScript } from 'next/document';
import { APP_INFO } from '/constants'
import Script from 'next/script'
import { ENV } from '/constants'


function MyDocument() {


  return (
    <Html>
      <Head>
        <Script strategy="beforeInteractive" src="https://www.googletagmanager.com/gtag/js?id=UA-164476484-1" />
        <Script id="google-analytics-script" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-164476484-1', {
              page_path: window.location.pathname,
            });
            `,
        }} />
        {ENV === 'prod' &&
          <Script strategy="afterInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6719876622039428"
            crossOrigin="anonymous" />
        }




        <Script
          src="https://graphcomment.com/js/integration.js"
          strategy="beforeInteractive"
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