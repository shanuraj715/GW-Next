import { createContext, useReducer, useRef } from 'react';
import { clone } from '/extra/utils'
import { ACTION } from '/constants'
import Cookie from 'universal-cookie'
// import audio, { fetchAudioData } from '/extra/Audio'
import { getRequest } from '/extra/request'
import toast from 'react-hot-toast'


const cookies = new Cookie()


const initialState = {
    audio: {
        isPlaying: false,
        stopped: false,
        duration: 0,
        currentTime: 0,
        audioSrc: '',
        volume: 100,
        mute: false,
        title: '',
        repeat: false,
        isFavorite: false,
        audioData: {},
        audioId: null
    },
    user: {
        isLogged: false,
        email: '',
        username: '',
        userId: '',
    }
}

const AppContext = createContext(initialState)

const StateProvider = props => {
    const { children } = props

    const [state, dispatch] = useReducer((prevState, action) => {
        const { type, payload } = action
        const newState = clone(prevState)
        switch (type) {
            case ACTION.AUDIO.SET_FILE:
                newState.audio.audioSrc = payload.url;
                newState.audio.title = payload.title ?? '';
                break

            case ACTION.AUDIO.PLAY:
                newState.audio.play = payload.play


                break
            case ACTION.AUDIO.PAUSE:

                break
            case ACTION.AUDIO.STOP:

                break
            case ACTION.AUDIO.SET_VOLUME:

                break;
            case ACTION.AUDIO.SET_MUTE:
                audioObj.muted = payload.mute
                newState.audio.mute = payload.mute
                break

            case ACTION.AUDIO.PLAY_FILE:
                setAndPlay(payload.id)
                break


            case ACTION.USER.UPDATE_LOGGED:
                if (payload.logged) {
                    cookies.set('PHPSESSID', payload.sessionId, { path: '/' })
                    newState.user.isLogged = true
                    newState.user.email = payload.email
                    newState.user.username = payload.username
                    newState.user.userId = payload.userId
                }
                else {
                    cookies.remove('PHPSESSID')
                    newState.user.isLogged = false
                    newState.user.email = ''
                    newState.user.username = ''
                    newState.user.userId = ''
                }
                break

            case ACTION.USER.SET_USERNAME:
                break
            case ACTION.USER.SET_EMAIL:
                break
            default:
                log("Pta nhi kya hi hoga hamara")
        }
        return newState
    }, initialState)

    return <AppContext.Provider value={{ state, dispatch }}>
        {children}
    </AppContext.Provider>
}

export { AppContext, StateProvider }