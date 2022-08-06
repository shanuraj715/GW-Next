import { getRequest } from '/extra/request'

export default function audioPlayer() {

    let audio = null;

    const _init = function () {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext
        }
        catch (err) {
            console.log("Web Audio API is not supported by the browser.")
            return false
        }
        audio = new Audio()
        audio.onPause = () => {
            log("Audio paused"); s
        }
        audio.onPlay = () => {
            log("Audio is playing")
        }
    }

    const setSource = src => {
        if (!audio) {
            log('Audio object not initialized')
            return
        }
        if (!src) {
            log("Invalid source file.")
            return
        }
        audio.src = src
    }

    const play = () => {
        console.log(audio)
        if (!audio) {
            log('Audio object not initialized')
            return
        }
        audio.play()
    }

    const pause = () => {
        if (!audio) {
            log('Audio object not initialized')
            return
        }
        audio.pause()
    }





    return {
        play, pause, _init, setSource
    }

}

export const fetchAudioData = async (id) => {
    const payload = { id: id }
    try {
        const response = await getRequest('song', payload).response
        console.log(response)
    }
    catch (err) {
        console.log(err)
    }
}