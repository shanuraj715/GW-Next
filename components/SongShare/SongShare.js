import Icon from '/components/FontAwesome/FontAwesome'
import styles from '/styles/songshare.module.scss'
import OutsideClickHandler from 'react-outside-click-handler'
import {copyToClipboard} from '/extra/utils'
import toast from 'react-hot-toast'
import buttonStyles from '/styles/footer.module.scss'

export default function SongShare(props) {

    const { short_url = '', toggle = () => { } } = props

    const copyText = () => {
        copyToClipboard(short_url)
        toast.success("Link copied to clipboard.", { position: 'top-center' })
    }

    return (
        <div className={styles.songSharePc} id="songShareMod" style={{ display: 'none' }}>
            <span className={styles.songShareCloseBtn} onClick={toggle}>
                <Icon classes="fa-times" type="solid" />
            </span>
            <OutsideClickHandler onOutsideClick={() => {
                if (document.getElementById("songShareMod").style.display !== 'none') {
                    toggle()
                }
            }} >
                <div className={styles.songShareModal} id="songShareModal">
                    <p className={styles.songShareMt}>
                        <Icon classes="fa-share-alt pd-r-14" type="duotone" color1="#2d3436" color2="var(--dark-yellow)" />
                        Share Now
                    </p>
                    <div className={`${buttonStyles.effect} ${styles.amiens}`}>
                        <div className={buttonStyles.buttons}>
                            <a href={`${'https://www.facebook.com/sharer/sharer.php?u=' + short_url}`} target="_blank" className={styles.ssBtnFb} data-tip="Share on Facebook" rel="noreferrer">
                                <Icon classes="fa-facebook-f" type="brands" />
                            </a>
                            <a href={`${'whatsapp://send?text=Listen the song from %0A' + short_url}`} target="_blank" className={styles.ssBtnWhatsapp} data-tip="Share on Whatsapp" rel="noreferrer">
                                <Icon classes="fa-whatsapp" type="brands" />
                            </a>
                            <a href={`${'tg://msg_url?url=' + short_url + '&text=Listen this awesome song '}`} target="_blank" className={styles.ssBtnTelegram} data-tip="Share on Telegram" rel="noreferrer">
                                <Icon classes="fa-telegram-plane" type="brands" />
                            </a>
                            <a href={`${'sms://?body= Listen this awesome song ' + short_url}`} target="_blank" className={styles.ssBtnSms} data-tip="Share via SMS" rel="noreferrer">
                                <Icon classes="fa-sms" type="regular" />
                            </a>
                            {/* <a href={`${'' + short_url }`} target="_blank" className={styles.ss-btn-instagram" data-tip="Share via SMS">
                                    <Icon classes="fa-instagram" type="brands" />
                                </a> */}
                        </div>
                    </div>

                    <div className={styles.ssCpyLinkBlock}>
                        <span className={styles.hytgj}>Or copy link</span>
                        <div className={styles.ssLinkTxtC}>
                            <span className="fsRed">
                                <Icon classes="fa-link pd-r-10" type="regular" />
                            </span>
                            <span className={styles.ssLink}>
                                {short_url}
                            </span>
                            <button onClick={copyText}>Copy</button>
                        </div>

                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    )
}




