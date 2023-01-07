export const ENV = "dev"

export const APP_INFO = {
    APP_NAME: "GaanaWorld.in",
    APP_URL: ENV === 'prod' ? 'https://gaanaworld.in/' : 'http://localhost:3005/',  // add slash after domain
    APP_SLOGAN: 'Remix Your Mood With GaanaWorld.In',
    APP_DESCRIPTION: "Download all latest mp3 songs. All Original, Dj and Remixed songs is available on our website. Download high quality mp3 songs. Bollywood, Punjabi, Bhojpuri, Haryanavi and many more language songs.",
    DOWNLOAD_SERVER_URL: 'https://mp3.techfacts007.in/file/',
    VERSION: '1.0',
    SHORT_URL_PATH: ENV === 'prod' ? 'https://gaanaworld.in/s/' : 'http://localhost:3005/s/',
    ADMIN_PAGE: 'https://gaanaworld-admin.techfacts007.in/'
}

export const API = {
    URL: "https://api.gaanaworld.in/",
    ENDPOINTS: {}
}

export const LIMITS = {
    LATEST_UPLOADS: 20,
    SONGS_PER_PAGE: 20,
}

export const OPERATION_CANCELED = 'OPERATION_CANCELED'

export const ACTION = {
    AUDIO: {
        // SET_AUDIO_ID: 'audio/audioId',
        PLAY: "audio/play",
        PAUSE: "audio/pause",
        STOP: "audio/stop",
        SET_FILE: "audio/setFile",
        PLAY_FILE: "audio/playFile",
        SET_VOLUME: "audio/setVolume",
        SET_MUTE: "audio/setMute",
    },
    USER: {
        UPDATE_LOGGED: "user/updateLogged",
        SET_USERNAME: "user/username",
        SET_EMAIL: "user/email"
    }
}