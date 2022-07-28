import { useEffect } from 'react'
import '../styles/globals.scss'
import MainLayout from '../components/MainLayout/MainLayout'
import 'bootstrap/dist/css/bootstrap.css'
import Head from 'next/head'
import Header from '../components/common/Header/Header'
import '../public/css/fonts-awesome/css/all.css'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  })

  return <>
    <Head>
      <link rel="icon" href="/favicon.png" />
    </Head>
    <Header />
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
    <Toaster />
  </>
}

export default MyApp
