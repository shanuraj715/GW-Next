import { useState, useContext, useCallback, useReducer } from 'react'
import styles from '/styles/header.module.scss'
import Logo from '/assets/images/site_title_image.png'
import Icon from '/components/FontAwesome/FontAwesome'
import toast from 'react-hot-toast'
import { APP_INFO } from '/constants'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AppContext } from '/Store'
import { getRequest } from '/extra/request'


function Header(props) {

    const router = useRouter()

    const [_, forceUpdate] = useReducer(x => x + 1, 0)

    const {
        state: {
            user
        }, dispatch
    } = useContext(AppContext)

    const { isLogged, username } = user

    const { openSignInModal, openSignUpModal } = props

    const [string, setString] = useState('')

    const handleKeyPress = event => {
        if (event.which === 13 && string !== '') {
            router.push('/search/' + string, undefined, { shallow: true })
        }
    }

    const handleSearchBtn = () => {
        if (string !== '') {
            router.push('/search/' + string, undefined, { shallow: true })
        }
        else {
            toast.error("Invalid search string.", { position: 'bottom-left' })
        }
    }

    const logout = useCallback(async () => {
        try {
            const response = await getRequest('user/logout')
            if (response.status) {
                dispatch({
                    type: 'user/updateLogged',
                    payload: {
                        logged: false
                    }
                })
                forceUpdate()
                toast.success("Successfully logged out", { position: 'bottom-right' })
            }
            else {
                toast.error('An error occured')
            }
        }
        catch (err) {
            console.log(err)
        }
    }, [dispatch])

    return <header className={styles.header}>
        <div className={styles.headerLeft}>
            <Link href="/">
                <a className={styles.headerImage}>
                    {/* <Image src={Logo} alt="" /> */}
                </a>
            </Link>
            <span>{APP_INFO.APP_SLOGAN}</span>
        </div>
        <div className="d-flex justify-content-center justify-content-md-end w-100">
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
                        <span className={styles.hddUsername}>{username ?? "*************"}</span>

                        {isLogged ?
                            <>
                                <button className={styles.huLink}>My Favorites</button>
                                <button className={styles.huLink}>Profile Settings</button>
                                <button className={`${styles.huLink} ${styles.huLogout}`} onClick={logout}>Logout</button>
                            </> : <>
                                <button className={`${styles.headerDropBtn} ${styles.dropBtnSignin}`} onClick={openSignInModal}>Sign In</button>
                                <button className={`${styles.headerDropBtn} ${styles.dropBtnSignup}`} onClick={openSignUpModal}>Sign Up</button>
                            </>}

                    </div>
                </div>
            </div>
        </div>
    </header>
}

export default Header