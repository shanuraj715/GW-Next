import { useState, useEffect } from 'react'
import '../styles/globals.scss'
import MainLayout from '../components/MainLayout/MainLayout'
import 'bootstrap/dist/css/bootstrap.css'
import Head from 'next/head'
import Header from '../components/common/Header/Header'
import Footer from '../components/common/Footer/Footer'
import '../public/css/fonts-awesome/css/all.css'
import { Toaster } from 'react-hot-toast';
import SignIn from '/components/SignIn/SignIn'
import SignUp from '/components/SignUp/SignUp'
import ResetPassword from '/components/ResetPassword/ResetPassword'
import '/styles/global.css'
import {APP_INFO} from '/constants'

function MyApp({ Component, pageProps }) {

  const allModals = {
    signinVisible: false,
    signupVisible: false,
    forgotPasswordVisible: false
  }

  const [modals, setModals] = useState({ ...allModals })

  const toggleModals = (key, bool) => {
    const oldStateOfModals = { ...modals };
    let setAllFalse = {};
    Object.keys(oldStateOfModals).forEach(key => {
      setAllFalse[key] = false
    })
    setModals({ setAllFalse, [key]: bool })
  }

  const setDataAttributeOnBody = () => {
    const body = document.getElementsByTagName('body')
    body[0].setAttribute('data-before', APP_INFO.APP_NAME)
  }

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
    setDataAttributeOnBody()
  })

  return <>
    <Head>
      <link rel="icon" href="/favicon.png" />
    </Head>
    <Header openSignInModal={() => toggleModals('signinVisible', true)} openSignUpModal={() => toggleModals('signupVisible', true)} />
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
    <Footer />
    {modals.signinVisible && <SignIn hide={() => toggleModals('signinVisible', false)} openSignUpModal={() => toggleModals('signupVisible', true)} openForgotPasswordModal={() => toggleModals('forgotPasswordVisible', true)} />}
    {modals.signupVisible && <SignUp hide={() => toggleModals('signupVisible', false)} openSignInModal={() => toggleModals('signinVisible', true)} />}
    {modals.forgotPasswordVisible && <ResetPassword hide={() => toggleModals('forgotPasswordVisible', false)} openSignInModal={() => toggleModals('signinVisible', true)} />}

    <Toaster />
  </>
}

export default MyApp
