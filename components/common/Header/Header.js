import { useState } from 'react'
import styles from '/styles/header.module.scss'
import Logo from '/assets/images/site_title_image.png'
import Icon from '/components/FontAwesome/FontAwesome'
import toast from 'react-hot-toast'
import { APP_INFO } from '/constants'
import Cookie from 'universal-cookie'
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'

const cookies = new Cookie()

function Header(props) {

    const router = useRouter()

    const [string, setString] = useState('')
    const [redirectTo, setRedirectTo] = useState('')

    const handleKeyPress = event => {
        if (event.which === 13 && string !== '') {
            router.push('/search/' + string, undefined, {shallow: true})
        }
    }

    const handleSearchBtn = () => {
        if (string !== '') {
            router.push('/search/' + string, undefined, {shallow: true})
        }
        else {
            toast.error("Invalid search string.", { position: 'bottom-left' })
        }
    }

    const logout = () => {
        fetch(API_URL + 'user/logout', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'sessid': cookies.get("PHPSESSID")
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Error")
            })
            .then(json => {
                console.log(json)
                if (json.status) {
                    window.location.reload()
                }
                else {

                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return <header className={styles.header}>
        <div className={styles.headerLeft}>
            <Link href="/">
                <a  className={styles.headerImage}>
                    <Image src={Logo} alt="" />
                </a>
            </Link>
            <span>{APP_INFO.APP_SLOGAN}</span>
        </div>

        <div className={styles.headerCenter}>
            <div className={styles.headerSearchCont}>
                <input type="text" placeholder="Search here..." value={string} onChange={e => setString(e.target.value)} onKeyPress={e => handleKeyPress(e)} />
                <button onClick={handleSearchBtn}>
                    <Icon type="solid" classes="fa-search" />
                </button>
            </div>
        </div>

        <div className={styles.headerRight}>
            <div className={styles.headerUserNavbar}>
                <button className={styles.headerUserBtn}>
                    <Icon type="solid" classes="fa-user" />
                </button>
                <div className={styles.headerUmDropdown}>
                    <span className={styles.hddUsername}>{props.userName || "*************"}</span>

                    {props.isLogged ?
                        <>
                            <button className={styles.huLink}>My Favorites</button>
                            <button className={styles.huLink}>Profile Settings</button>
                            <button className={`${styles.huLink} ${styles.huLogout}`} onClick={logout}>Logout</button>
                        </> : <>
                            <button className={`${styles.headerDropBtn} ${styles.dropBtnSignin}`} onClick={() => {}}>Sign In</button>
                            <button className={`${styles.headerDropBtn} ${styles.dropBtnSignup}`}> Sign Up</button >
                        </>}

                </div >
            </div >
        </div >
    </header >
}

export default Header