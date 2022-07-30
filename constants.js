export const APP_INFO = {
    APP_NAME: "GaanaWorld.in",
    APP_URL: 'http://localhost:3000/',  // add slash after domain
    APP_SLOGAN: 'Remix Your Mood With GaanaWorld.In',
    APP_DESCRIPTION: "Download all latest mp3 songs. All Original, Dj and Remixed songs is available on our website. Download high quality mp3 songs. Bollywood, Punjabi, Bhojpuri, Haryanavi and many more language songs.",
    DOWNLOAD_SERVER_URL: 'https://files.gaanaworld.in/',
    VERSION: '1.0',
}

export const API = {
    URL: "http://127.1.2.8/",
    ENDPOINTS: {}
}

export const LIMITS = {
    LATEST_UPLOADS: 20,
    SONGS_PER_PAGE: 20,
}

export const OPERATION_CANCELED = 'OPERATION_CANCELED'

export const ACTION = {
    AUDIO: {
        PLAY: "audio/play",
        PAUSE: "audio/pause",
        STOP: "audio/stop",
        SET_FILE: "audio/setFile",
        PLAY_FILE: "audio/playFile",
        SET_VOLUME: "audio/setVolume",
        SET_MUTE: "audio/setMute"
    },
    USER: {
        UPDATE_LOGGED: "user/updateLogged",
        SET_USERNAME: "user/username",
        SET_EMAIL: "user/email"
    }
}