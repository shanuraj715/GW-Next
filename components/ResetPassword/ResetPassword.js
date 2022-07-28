import { useState, useEffect } from 'react'
import styles from '/styles/signInSignUp.module.scss'
import Icon from '../../components/FontAwesome/FontAwesome'
import Link from 'next/link'
import image from '/assets/images/lr-bg.png'
import OutsideClickHandler from 'react-outside-click-handler'
import validator from 'validator'
import toast from 'react-hot-toast'
import { APP_INFO } from '/constants'
import Cookie from 'universal-cookie'
import { useRouter } from 'next/router'

const cookie = new Cookie();

function ResetPassword({ hide, openSignInModal }) {

    var time;

    const router = useRouter()


    const hideModal = () => {
        let elem = document.getElementById('form')
        elem.classList.add(styles.hideForm)
        time = setTimeout(() => {
            elem.style.display = 'none'
            hide()
        }, 300)
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('')
    const [password2, setPassword2] = useState('')
    const [stepCompleted, setStepCompleted] = useState(0)

    const getBtnTextFromStepCompleted = () => {
        const arr = ['Get OTP', "Verify OTP", 'Change Password']
        return arr[stepCompleted]
    }

    useEffect(() => {
        return () => {
            clearTimeout(time)
        }
    })

    const validateForm = () => {
        if (!validator.isEmail(email)) {
            toast.error("Please enter correct email address.", { position: 'top-right' })
            return false
        }

        if (!validator.isLength(password, { min: 6, max: 32 })) {
            toast.error("Incorrect password length", { position: 'top-right' });
            return false
        }
        return true
    }

    const submitForm = () => {
        console.log("Called")
        if (!validateForm()) return

        fetch(APP_INFO.API_URL + 'user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error("Error")
            })
            .then(json => {
                console.log(json)
                if (json.status) {
                    cookie.set('PHPSESSID', json.session_id, { path: '/' });
                    window.location.reload()
                }
                else {
                    toast.error(json.error.message, { position: 'top-right' })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className={styles.formBg}>
            <OutsideClickHandler onOutsideClick={() => {
                hideModal()
            }}>
                <div className={styles.formCont} id="form" style={{ backgroundImage: `url(${image.src})` }}>
                    <div className={styles.formHead}>
                        <h3 className={styles.formHeadText}>Reset Password</h3>
                        <span className={styles.formCloseBtn} onClick={hideModal}>
                            <Icon classes="fa-times" type="solid" />
                        </span>
                    </div>
                    <div className={styles.formData}>
                        <div className={styles.formInpRow}>
                            <input type="text" className={styles.lrFormInp}
                                placeholder="Your Email (something@example.com)" value={email}
                                onChange={e => setEmail(e.target.value)} disabled={!(stepCompleted === 0)} />
                        </div>
                        <div className={styles.formInpRow}>
                            <input type="text" className={styles.lrFormInp}
                                placeholder="Enter OTP" value={otp}
                                onChange={e => setOtp(e.target.value)} disabled={!(stepCompleted === 1)} />
                        </div>
                        <div className={`${styles.formInpRow} flex-column flex-md-row`}>
                            <input type="text" className={styles.lrFormInp}
                                placeholder="Enter New Password" value={password}
                                onChange={e => setPassword(e.target.value)} disabled={!(stepCompleted === 2)} />
                            <input type="text" className={styles.lrFormInp}
                                placeholder="Confirm New Password" value={password2}
                                onChange={e => setPassword2(e.target.value)} disabled={!(stepCompleted === 2)} />
                        </div>
                        <div className={styles.lrBtnCont}>
                            <button className={styles.lrSignInBtn} onClick={submitForm}>{getBtnTextFromStepCompleted()}</button>
                        </div>

                        <div className={styles.lrBottomRow}>
                            <p className="">Already have an account? <strong onClick={openSignInModal}>Sign In</strong></p>
                        </div>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    )


}

export default ResetPassword
