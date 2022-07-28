import { useState } from 'react'
import { APP_INFO } from '/constants'
import styles from '/styles/footer.module.scss'
import sr from '/assets/images/sr.jpg'
import Icon from '/components/FontAwesome/FontAwesome'
import OutsideClickHandler from 'react-outside-click-handler'

function Footer(props) {

    const [cardVisible, setCardVisible] = useState(false)

    const toggleCardVisibility = () => {
        setCardVisible(!cardVisible)
    }

    const devCard = () => (<div className={styles.userCardContainer}>
        <span className={styles.ucCloseBtn} onClick={toggleCardVisibility}>
            <Icon classes="fa-times" type="solid" />
        </span>
        <OutsideClickHandler onOutsideClick={toggleCardVisibility}>
            <div className={styles.card}>
                <div className={styles.card__imageContainer}>
                    <img className={styles.card__image} src={sr.src} alt="" />
                </div>

                <svg className={styles.card__svg} viewBox="0 0 800 500">

                    <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#333" />
                    <path className={styles.card__line} d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" strokeWidth="3" fill="transparent" />
                </svg>

                <div className={styles.card__content}>
                    <h1 className={styles.card__title}>Shanu Raj</h1>
                    <p>I am a Full Stack Professional Web Developer.<br />
                        I am expert in <strong>HTML, CSS, JavaScript, jQuery, PHP, SQL, React Js, Express Js, Node Js, MongoDB, Python and Wordpress.</strong><br /><br />
                        Contact me for website development.<br />
                        Mob: +91-9877936035</p>
                    <div className={`${styles.effect} ${styles.varrius}`}>
                        <div className={styles.buttons}>
                            <a className={styles.ucEmail} href="mailto:shanuraj715@gmail.com" title="">
                                <Icon classes="fa-at" type="regular" />
                            </a>
                            <a className={styles.ucPhone} href="tel:+919877936035" title="">
                                <Icon classes="fa-phone" type="regular" />
                            </a>
                            <a className={styles.ucFacebook} href="https://facebook.com/shanuraj715" target="_blank" title="" rel="noreferrer">
                                <Icon classes="fa-facebook-f" type="brands" />
                            </a>
                            <a className={styles.ucInstagram} href="https://instagram.com/shanu_the_web_dev" target="_blank" title="" rel="noreferrer">
                                <Icon classes="fa-instagram" type="brands" />
                            </a>
                            <a className={styles.ucGithub} href="https://github.com/shanuraj715" target="_blank" title="" rel="noreferrer">
                                <Icon classes="fa-github" type="brands" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </OutsideClickHandler>
    </div>)


    return (
        <div className={styles.footer} >
            <p>
                <span>Copyright © 2018 - {new Date().getFullYear()} | {APP_INFO.APP_NAME + ' v-' + APP_INFO.VERSION} </span>
                <span>- Developed By: <span onClick={toggleCardVisibility} className={styles.footerDevName}>Shanu Raj</span></span>
            </p>
            {cardVisible ? devCard() : null}
        </div >
    )

}

export default Footer