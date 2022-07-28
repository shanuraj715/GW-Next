import { useState, useEffect } from 'react'
import '../styles/globals.scss'
import MainLayout from '../components/MainLayout/MainLayout'
import 'bootstrap/dist/css/bootstrap.css'
import Head from 'next/head'
import Header from '../components/common/Header/Header'
import '../public/css/fonts-awesome/css/all.css'
import { Toaster } from 'react-hot-toast';
import SignIn from '/components/SignIn/SignIn'
import SignUp from '/components/SignUp/SignUp'
import ResetPassword from '/components/ResetPassword/ResetPassword'

function MyApp({ Component, pageProps }) {

  const allModals = {
    signinVisible: false,
    signupVisible: false,
    forgotPasswordVisible: true
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

    {modals.signinVisible && <SignIn hide={() => toggleModals('signinVisible', false)} openSignUpModal={() => toggleModals('signupVisible', true)} openForgotPasswordModal={() => toggleModals('forgotPasswordVisible', true)} />}
    {modals.signupVisible && <SignUp hide={() => toggleModals('signupVisible', false)} openSignInModal={() => toggleModals('signinVisible', true)} />}
    {modals.forgotPasswordVisible && <ResetPassword hide={() => toggleModals('forgotPasswordVisible', false)} openSignInModal={() => toggleModals('signinVisible', true)} />}

    <Toaster />
  </>
}

export default MyApp
