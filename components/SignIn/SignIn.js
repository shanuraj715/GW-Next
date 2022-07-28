import React, { Component } from 'react'
import '/styles/signInSignUp.module.scss'
import Icon from '../../components/FontAwesome'
import Link from 'next/link'
import image from '../../assets/images/lr-bg.png'
import OutsideClickHandler from 'react-outside-click-handler'
import validator from 'validator'
import toast from 'react-hot-toast'
import conf from '../../conf'
import Cookie from 'universal-cookie'

const cookie = new Cookie();

export default class Login extends Component {

    hide = () => {
        let elem = document.getElementById('form')
        elem.classList.add('hide-form')
        this.time = setTimeout(() => {
            elem.style.display = 'none'
            this.props.hide()
        }, 300)
    }

    state = {
        email: '',
        password: ''
    }

    componentWillUnmount() {
        clearTimeout(this.time)
    }

    render() {
        return (
            <div className="form-bg">
                <OutsideClickHandler onOutsideClick={() => {
                    this.hide()
                }}>
                    <div className="form-cont" id="form" style={{ backgroundImage: `url(${image})` }}>
                        <div className="form-head">
                            <h3 className="form-head-text">Sign In</h3>
                            <span className="form-close-btn" onClick={this.hide}>
                                <Icon classes="fa-times" type="solid" />
                            </span>
                        </div>
                        <div className="form-data">
                            <div className="form-inp-row">
                                <input type="text" className="lr-form-inp"
                                    placeholder="Your Email" value={this.state.email}
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </div>
                            <div className="form-inp-row">
                                <input type="password" className="lr-form-inp"
                                    placeholder="Your Password" value={this.state.password}
                                    onChange={e => this.setState({ password: e.target.value })} />
                            </div>
                            <div className="lr-btn-cont">
                                <button className="lr-sign-in-btn" onClick={this.submitForm}>Sign In</button>
                            </div>
                            <p className="lf-fp">
                                <Link to="/reset-password">Forgot Password ?</Link>
                            </p>

                            <div className="lr-bottom-row">
                                <span className="">Do not have an account? <span>Sign Up</span></span>
                            </div>
                        </div>
                    </div>
                </OutsideClickHandler>
            </div>
        )
    }

    validateForm = () => {
        if (!validator.isEmail(this.state.email)) {
            toast.error("Please enter correct email address.", { position: 'top-right' })
            return false
        }

        if (!validator.isLength(this.state.password, { min: 6, max: 32 })) {
            toast.error("Incorrect password length", { position: 'top-right' });
            return false
        }
        return true
    }

    submitForm = () => {
        console.log("Called")
        if (!this.validateForm()) return

        fetch(conf.API_URL + 'user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: this.state.email, password: this.state.password })
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
                    cookie.set('PHPSESSID', json.session_id, {path: '/'});
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
}
