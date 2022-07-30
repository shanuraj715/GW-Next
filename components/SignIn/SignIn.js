import { useState, useEffect, useCallback, useContext, useRef } from 'react'
import styles from '/styles/signInSignUp.module.scss'
import Icon from '../../components/FontAwesome/FontAwesome'
import image from '/assets/images/lr-bg.png'
import OutsideClickHandler from 'react-outside-click-handler'
import validator from 'validator'
import toast from 'react-hot-toast'
import { postRequest } from '/extra/request'
import { AppContext } from '/Store'

function SignIn({ hide, openSignUpModal, openForgotPasswordModal }) {

    var time = useRef()

    const { state, dispatch } = useContext(AppContext)

    const hideModal = useCallback(() => {
        let elem = document.getElementById('form')
        elem.classList.add(styles.hideForm)
        time.current = setTimeout(() => {
            elem.style.display = 'none'
            hide()
        }, 300)
    }, [hide])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (state.user.isLogged) window.reload()
        return () => {
            clearTimeout(time.current)
        }
    })

    const validateForm = () => {
        if (!validator.isEmail(email)) {
            toast.error("Please enter correct email address.", { position: 'bottom-left' })
            return false
        }

        if (!validator.isLength(password, { min: 6, max: 32 })) {
            toast.error("Incorrect password length", { position: 'bottom-left' });
            return false
        }
        return true
    }

    const submitForm = useCallback(async () => {
        if (!validateForm()) return

        const payload = {
            email: email, password: password
        }
        try {
            const response = await postRequest('/user/login', payload)
            console.log(response)
            if (response.status) {
                dispatch({
                    type: 'user/updateLogged',
                    payload: {
                        logged: true,
                        sessionId: response.session_id,
                        email: response.data.email,
                        username: response.data.name,
                        userId: response.data.userId
                    }
                })
                hideModal()
                toast.success("Login success!", { position: 'bottom-right' })
            }
            else {
                toast.error(response.error.message, { position: 'bottom-right' })
            }
        }
        catch (err) {
            console.log(err)
        }
    }, [dispatch, email, password, hideModal, validateForm])

    return (
        <div className={styles.formBg}>
            <OutsideClickHandler onOutsideClick={() => {
                hideModal()
            }}>
                <div className={styles.formCont} id="form" style={{ backgroundImage: `url(${image.src})` }}>
                    <div className={styles.formHead}>
                        <h3 className={styles.formHeadText}>Sign In</h3>
                        <span className={styles.formCloseBtn} onClick={hideModal}>
                            <Icon classes="fa-times" type="solid" />
                        </span>
                    </div>
                    <div className={styles.formData}>
                        <div className={styles.formInpRow}>
                            <input type="text" className={styles.lrFormInp}
                                placeholder="Your Email" value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className={styles.formInpRow}>
                            <input type="password" className={styles.lrFormInp}
                                placeholder="Your Password" value={password}
                                onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className={styles.lrBtnCont}>
                            <button className={styles.lrSignInBtn} onClick={submitForm}>Sign In</button>
                        </div>
                        <p className={styles.lfFp}>
                            <button className={styles.resetPasswordBtn} onClick={openForgotPasswordModal}>Forgot Password ?</button>
                        </p>

                        <div className={styles.lrBottomRow}>
                            <p className="">Do not have an account? <strong onClick={openSignUpModal}>Sign Up</strong></p>
                        </div>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    )


}

export default SignIn
