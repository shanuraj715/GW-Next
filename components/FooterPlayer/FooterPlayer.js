import { useState, useEffect, useContext, useRef, useReducer } from 'react';
import styles from '/styles/footerplayer.module.scss'
import songBarsStyles from '/styles/songBars.module.scss'
import Icon from '/components/FontAwesome/FontAwesome'
import { reactLocalStorage } from 'reactjs-localstorage';
import { APP_INFO } from '/constants'
import { AppContext } from '/Store'
import adholder from '/assets/images/320x50.png'
import { secToMinSec } from '/extra/utils'
import GetDeviceInfo from '/extra/GetDeviceInfo/GetDeviceInfo'
import Ad320x50 from '../ads/Ad320x50';

export default function FooterPlayer(props) {

    const [isExpanded, setIsExpanded] = useState(false)
    const [maxScrubberVal, setMaxScrubberVal] = useState(100)

    const { isDesktop } = GetDeviceInfo()

    const { state: {
        user: {
            isLogged
        }
    }, dispatch } = useContext(AppContext)

    const {
        isPlaying,
        fetchAndPlay,
        play,
        pause,
        stop,
        loop,
        volumeController,
        audioData,
        audioObject,
        currentTime: currTime,
        duration,
        seek,
        toggleFavorite,
        isFavorite,
        copy,
        download,
        refreshPlayer
    } = props

    const { title } = audioData
    

    const currentTime = Math.ceil(currTime)

    useEffect(() => {
    }, [props])

    const muteAudio = () => {
        audioObject.muted = !audioObject.muted
        refreshPlayer()
    }

    const playHandler = () => {
        play()
    }

    const pauseHandler = () => {
        pause()
    }

    const newAudioPlayHandler = (id) => {
        fetchAndPlay(id)
    }

    const seekHandler = (event) => {
        console.log(event.target.value)
        seek(event.target.value)
    }

    const repeatHandler = () => {
        audioObject.loop = !repeat
        refreshPlayer()
    }

    const copyHandler = () => {
        copy()
    }

    return <>
        <div className={styles.footerPlayerPh}></div>
        {!isExpanded &&
            <div className={styles.musicPlayer} id={styles.footerPlayer}>
                <div className={styles.mpSeek}>
                    <input data-for="scrubber-inp" data-tip type="range" min="0" max={duration ?? 0} id="scrubber" onChange={(e) => { seekHandler(e) }} value={(currentTime ?? 0)} />

                </div>
                <div className={styles.mpLeft}>
                    <div className={styles.mp3IconCont}>
                        {/* <Icon type="solid" classes="fas fa-music mp-footer-icon" /> */}
                        <div className={songBarsStyles.mpBars}></div>
                    </div>
                    <div className={styles.songData}>
                        <span className={styles.mpSongTitle} data-for="stitle" data-tip>{title}</span>
                        {/* <span className={styles.mp-song-details">{this.state.playingSongData?.total_downloads} Downloads</span> */}
                        <span className={styles.mpSongDetails} data-tip={isLogged ? "Next song." : 'Login'} >
                            {isLogged ? "Next song name here" : 'Login to get favourite tracks.'}
                        </span>

                        {/* <span>Song title here</span> */}
                    </div>

                    {isDesktop &&
                        <div className={styles.mpLeftBtnCont}>
                            <span data-tip={`${isFavorite ? "Remove from favourites" : "Add to favourites"}`} className={`${styles.mpLeftBtn} ${styles.mpFavBtn}`} onClick={toggleFavorite}>
                                <Icon type={`${isFavorite ? 'solid' : 'regular'}`} classes="fa-heart" />
                            </span>
                            <span data-tip="Download this song." className={`${styles.mpLeftBtn} ${styles.mpDownloadBtn}`} onClick={download}>
                                <Icon type="regular" classes="fa-download" />
                            </span>
                        </div>
                    }
                </div>
                <div className={styles.mpCenter}>
                    {isDesktop &&
                        <>
                            <div className={styles.mpTime}>
                                <span id="current-time" className={styles.mpCurrentTime} data-tip="Current Time">{`${secToMinSec(currentTime).min}:${secToMinSec(currentTime).sec}`}</span>
                                <span> / </span>
                                <span className={styles.mpDurationTime} data-tip="Total Duration">{`${secToMinSec(duration).min}:${secToMinSec(duration).sec}`}</span>
                            </div>

                            <span className={styles.mpControlBtn} onClick={repeatHandler}>
                                <Icon classes={loop ? 'fa-repeat-1-alt' : 'fa-repeat'} type="regular" />
                            </span>

                            <span className={styles.mpControlBtn}>
                                <Icon classes="fa-angle-double-left" type="regular" />
                            </span>
                        </>
                    }

                    <span className={`${styles.mpControlBtn} ${styles.mpPlayBtn}`} onClick={isPlaying ? pauseHandler : playHandler}>
                        <Icon classes={`${isPlaying ? 'fa-pause' : 'fa-play'}`} type="regular" />
                    </span>
                    {isDesktop &&
                        <>
                            <span className={styles.mpControlBtn}>
                                <Icon classes="fa-angle-double-right" type="regular" />
                            </span>

                            <span className={styles.mpControlBtn} data-tip="Copy link (Ctrl + c)" onClick={copyHandler}>
                                <Icon classes="fa-link" type="regular" />
                            </span>

                            <span className={`${styles.mpControlBtn} ${styles.mpVolumeBtn}`}>
                                <div className={styles.mpVcCont}>
                                    <input data-tip data-for="vol-cont-tip" id="volume-controller" type="range" className={styles.mpVc} min="0" max="100" value={audioObject.volume * 100} onChange={e => volumeController(e)} />
                                </div>
                                {/* <span>{volume}</span> */}

                                <span onClick={() => { muteAudio() }}><Icon classes={`${audioObject.muted ? 'fa-volume-slash' : 'fa-volume-up'}`} type="regular" /></span>
                            </span>
                        </>
                    }
                </div>
                {isDesktop &&
                    <div className={styles.mpRight}>
                        {/* <span data-tip={ this.props.isLogged ? "Next song." : 'Login'} className={styles.mp-next-song">
							{ this.props.isLogged ? "Next song name here" : 'Login to get favourite tracks.'}
						</span> */}
                        <div className={styles.footerAdContainer}>
                            {/* <img src={adholder.src} alt="" /> */}
                            <Ad320x50 />
                        </div>

                        <span className={styles.mpExpandBtn} onClick={() => { }}>
                            <Icon classes="fa-expand" type="regular" />
                        </span>
                    </div>
                }
            </div>}
    </>
}