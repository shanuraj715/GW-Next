import { useState, useEffect, useRef, useContext } from 'react'
import '../styles/globals.scss'
import '/styles/margin.css'
import '/styles/padding.css'
import '/styles/ads.css'
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
import { StateProvider } from '/Store'
import FooterPlayer from '/components/FooterPlayer/FooterPlayer'

import { APP_INFO } from '/constants'
import { copyToClipboard } from '/extra/utils'
import { getRequest, postRequest } from '/extra/request'
import { toast } from 'react-hot-toast'
import { AppContext } from '/Store'
import * as ga from '/lib/ga'
import {useRouter} from 'next/router'

// CUSTOM LOG
import '/components/log/index'

function MyApp({ Component, pageProps }) {

  const router = useRouter()

  const user = useRef(useContext(AppContext).user)

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

  useEffect(() => {

    const routeChangeStarting = () => {
      log("Route Change Start")
    }
    const handleRouteChange = (url) => {
      log("Route change complete", '#16a085')
      ga.pageview(url)
    }
    router.events.on('routeChangeStart', routeChangeStarting)
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeStart', routeChangeStarting)
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])


  // AUDIO PLAYER

  let audio = useRef(null)
  let interval = useRef(null)

  const [audioId, setAudioId] = useState(null)
  const [audioData, setAudioData] = useState({})
  const [footerPlayerVisible, setFooterPlayerVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isLoadingAudio, setIsLoadingAudio] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)


  const refreshPlayer = () => {
    setAudioData({ ...audioData })
  }

  const fetchAndPlay = async (id) => {
    const payload = { id: id }
    try {
      const response = await getRequest('song', payload)
      if (response.status) {
        setAudioId(response.data.song_id)
        setAudioData(response.data)
        setIsFavorite(response.data.favorite)
        !footerPlayerVisible && setFooterPlayerVisible(true)
        audio.current.src = response.data.file
        audio.current.play()

      }
      else {
        toast.error(response.error.message, { position: 'bottom-left' })
      }

      toast.success(`Playing ${response.data.title.length <= 25 ? response.data.title : response.data.title.substring(0, 25) + '...'}`, {
        style: {
          border: '1px solid #e84393',
          padding: '5px 10px',
          color: '#0097e6',
        },
        iconTheme: {
          primary: '#F72B8E',
          secondary: '#FFFFFF',
        },
        position: "top-right"
      });
    }
    catch (err) {
      console.log(err)
    }
  }

  const play = () => {
    audio.current.play()
    audio.current.currentTime = 50
  }

  const pause = () => {
    audio.current.pause()
  }

  const loop = (bool) => {
    audio.current.loop = bool ?? true
  }

  const volumeController = (event) => {
    const value = ((event.target.value - 0) / 100) * 100
    audio.current.volume = value / 100
  }

  const stop = () => {
    audio.current.pause()
    audio.current.currentTime = 0
  }

  const seek = (value) => {
    console.log(audioData)
    console.log(value)
    setCurrentTime(value)
    audio.current.currentTime = value
  }

  const toggleFavorite = async () => {
    if (user.current.isLogged) {
      try {
        const payload = {
          sid: audioId
        }
        const response = await getRequest('favourite', payload)
        if (response.status) {
          if (response.message === 'added') {
            toast.success("Added to favorites.", { position: 'bottom-left' })
            setIsFavorite(true)
          }
          if (response.message === 'removed') {
            toast.success("Removed from favorites.", { position: 'bottom-left' })
            setIsFavorite(false)
          }
        }
        else {
          toast.error(response.error.message)
        }

      }
      catch (err) {
        console.log(err)
      }
    }
    else {
      toast.error("Please login to use this feature", { position: 'top-right' })
    }
  }

  const copyURL = () => {
    copyToClipboard(`${APP_INFO.SHORT_URL_PATH}${audioData.short_url}`)
    toast.success("Link copied to clipboard", { position: 'top-right' })
  }



  const addListnerOnAudio = () => {
    audio.current.onplay = () => {
      setIsPlaying(true)
      interval.current = setInterval(() => {
        setCurrentTime(audio.current.currentTime)
      }, 1000)
    }
    audio.current.onpause = () => {
      setIsPlaying(false)
      clearInterval(interval.current)
    }
    audio.current.onwaiting = () => {
      console.log("Waiting")
      setIsLoadingAudio(true)
    }

    audio.current.onloadeddata = () => {
      console.log(audio.current.duration)
      setDuration(parseInt(audio.current.duration ?? 0))
      setIsPlaying(true)
      setIsLoadingAudio(false)
      console.log("Loaded")
    }

    audio.current.onended = () => {
      // executes when audio ends playing
    }

    audio.current.onseeking = () => {
      // executes when user is seeking the audio
    }

    audio.current.onrepeat = () => {
      console.log("REPEAT")
    }
  }

  const download = () => {
    let key = audioData.file_key
    window.open(`${APP_INFO.DOWNLOAD_SERVER_URL}?file_id=${audioId}&auth_key=${key}`, '_blank')
  }


  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
    audio.current = new Audio()
    addListnerOnAudio()
  }, [])

  return <>
    <Head>
      <link rel="icon" href="/favicon.png" />
    </Head>
    <StateProvider>
      <Header openSignInModal={() => toggleModals('signinVisible', true)} openSignUpModal={() => toggleModals('signupVisible', true)} />
      <MainLayout>
        <Component {...pageProps} fetchAndPlay={fetchAndPlay} isPlaying={isPlaying} audioId={audioId} play={play} pause={pause} />
      </MainLayout>
      <Footer />
      {footerPlayerVisible && <FooterPlayer
        isPlaying={isPlaying}
        fetchAndPlay={fetchAndPlay}
        play={play}
        pause={pause}
        stop={stop}
        loop={loop}
        volumeController={volumeController}
        audioData={audioData}
        audioObject={audio.current}
        currentTime={currentTime}
        duration={duration}
        isLoadingAudio={isLoadingAudio}
        seek={seek}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
        copy={copyURL}
        download={download}
        refreshPlayer={refreshPlayer}
      />}
      {modals.signinVisible && <SignIn hide={() => toggleModals('signinVisible', false)} openSignUpModal={() => toggleModals('signupVisible', true)} openForgotPasswordModal={() => toggleModals('forgotPasswordVisible', true)} />}
      {modals.signupVisible && <SignUp hide={() => toggleModals('signupVisible', false)} openSignInModal={() => toggleModals('signinVisible', true)} />}
      {modals.forgotPasswordVisible && <ResetPassword hide={() => toggleModals('forgotPasswordVisible', false)} openSignInModal={() => toggleModals('signinVisible', true)} />}
      <Toaster />
    </StateProvider>
  </>
}

export default MyApp
