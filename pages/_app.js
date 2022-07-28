import { useEffect } from 'react'
import '../styles/globals.scss'
import MainLayout from '../components/MainLayout/MainLayout'
import 'bootstrap/dist/css/bootstrap.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  })

  return <>
    <Head>
      <link rel="icon" href="/favicon.png" />
    </Head>

    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  </>
}

export default MyApp
