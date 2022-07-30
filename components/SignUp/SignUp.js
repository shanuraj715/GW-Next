import { useState, useEffect, useCallback, useRef } from 'react'
import styles from '/styles/signInSignUp.module.scss'
import Icon from '../../components/FontAwesome/FontAwesome'
import image from '/assets/images/lr-bg.png'
import OutsideClickHandler from 'react-outside-click-handler'
import validator from 'validator'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { postRequest } from '/extra/request'

function SignUp({ hide, openSignInModal }) {

    var time = useRef()

    const router = useRouter()


    const hideModal = () => {
        let elem = document.getElementById('form')
        elem.classList.add(styles.hideForm)
        time.current = setTimeout(() => {
            elem.style.display = 'none'
            hide()
        }, 300)
    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        return () => {
            clearTimeout(time.current)
        }
    }, [])

    const validateForm = useCallback(() => {
        if (!validator.isEmail(email)) {
            toast.error("Please enter correct email address.", { position: 'bottom-left' })
            return false
        }

        if( !validator.isLength(name, { min: 1, max: 40 })){
            toast.error("Please enter a valid name between 1 to 40 characters.", { position: 'bottom-left' });
            return false
        }

        if( isNaN(mobile)){
            toast.error("Please enter a valid mobile number.", { position: 'bottom-left' });
            return false
        }

        if (!validator.isLength(password, { min: 6, max: 32 })) {
            toast.error("Incorrect password length.", { position: 'bottom-left' });
            return false
        }
        return true
    }, [email, mobile, name, password])

    const submitForm = useCallback(async () => {
        if (!validateForm()) return

        const payload = {
            name, email, password, mobile
        }

        try {
            const response = await postRequest('user/register', payload);
            if (response.status) {
                toast.success('Registered Successfully', { position: 'bottom-left' })
                toast.success("Please login to your account", { position: 'bottom-left' })
                openSignInModal()
            }
            else {
                toast.error(response.error.message)
            }
        }
        catch (err) {
            console.log(err)
        }
    }, [email, name, mobile, password, openSignInModal, validateForm])

    return (
        <div className={styles.formBg}>
            <OutsideClickHandler onOutsideClick={() => {
                hideModal()
            }}>
                <div className={styles.formCont} id="form" style={{ backgroundImage: `url(${image.src})` }}>
                    <div className={styles.formHead}>
                        <h3 className={styles.formHeadText}>Sign Up</h3>
                        <span className={styles.formCloseBtn} onClick={hideModal}>
                            <Icon classes="fa-times" type="solid" />
                        </span>
                    </div>
                    <div className={styles.formData}>
                        <div className={`${styles.formInpRow} flex-column flex-md-row`}>
                            <input type="text" className={styles.lrFormInp}
                                placeholder="Your Full Name" value={name}
                                onChange={e => setName(e.target.value)} />
                            <input type="text" className={styles.lrFormInp}
                                placeholder="Your Mobile Number" value={mobile}
                                onChange={e => !isNaN(e.target.value) && setMobile(e.target.value.trim())} />
                        </div>
                        <div className={styles.formInpRow}>
                            <input type="text" className={styles.lrFormInp}
                                placeholder="Your Email (something@example.com)" value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className={styles.formInpRow}>
                            <input type="password" className={styles.lrFormInp}
                                placeholder="Your Password" value={password}
                                onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className={styles.lrBtnCont}>
                            <button className={styles.lrSignInBtn} onClick={submitForm}>Sign Up</button>
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

export default SignUp
