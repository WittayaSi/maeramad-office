import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faKey
} from '@fortawesome/free-solid-svg-icons'
import { useToasts } from 'react-toast-notifications'

import { login } from '../../actions/authAction'
import { LOGGIN_COMPLETED, LOGGIN_INCOMPLETE } from '../../types/constantTypes'

const LoginFormComponent = () => {

    const history = useHistory()
    const { addToast } = useToasts()

    const dispatch = useDispatch()

    const initialUser = {
        username: '',
        password: ''
    }

    const [userpass, setUserpass] = useState(initialUser)
    const [loading, setLoading] = useState(false)
    const [validated, setValidated] = useState(false)

    const onChangeHandle = event => {
        const { name, value } = event.target
        setUserpass({
            ...userpass,
            [name]: value
        })
    }
    const onSubmitHandle = async event => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            setValidated(true)
            setLoading(false)
        } else {
            
            try{
                const result = await login(userpass)
                addToast('เข้าระบบสำเร็จ', {
                    appearance: 'success',
                    autoDismiss: true,
                    placement: 'top-center'
                })
                setTimeout(()=>{
                    dispatch({
                        type: LOGGIN_COMPLETED,
                        payload: result
                    })
                    history.push('/')
                }, 2000)
                setLoading(true)
            } catch (err) {
                console.log(err)
                setLoading(false)
                const { code, message } = err.response.data
                dispatch({ type: LOGGIN_INCOMPLETE })
                addToast(`เข้าระบบไม่สำเร็จ ${message} รหัส: ${code}`, {
                    appearance: 'error',
                    autoDismiss: true,
                })
                
            }
        }
    }

    return (
        <div className="container" style={{height: '100vh'}}>

            <div className="d-flex justify-content-center h-100">
                <div className="user_card">
                    <div className="d-flex justify-content-center">
                        <div className="brand_logo_container">
                            <img src="images/logo.png" className="brand_logo" alt="Logo"/>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center form_container">
                        <Form 
                            noValidate 
                            validated={validated} 
                            onSubmit={onSubmitHandle}
                        >
                            <div className="input-group mb-3">
                                <div className="input-group-append">
                                    <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                                </div>
                                <input 
                                    type="text" 
                                    name="username" 
                                    className="form-control input_user" 
                                    value={userpass.username}
                                    onChange={onChangeHandle}
                                    placeholder="username"
                                    required
                                />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-append">
                                    <span className="input-group-text"><FontAwesomeIcon icon={faKey} /></span>
                                </div>
                                <input 
                                    type="password" 
                                    name="password" 
                                    className="form-control input_pass" 
                                    value={userpass.password}
                                    onChange={onChangeHandle}
                                    placeholder="password"
                                    required
                                />
                            </div>

                            <br/>
                            {/* <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customControlInline"/>
                                    <label className="custom-control-label" for="customControlInline">Remember me</label>
                                </div>
                            </div> */}
                                <button 
                                    type="submit" 
                                    name="button" 
                                    className="btn login_btn"
                                    disabled={loading}
                                >
                                    Login
                                </button>
                        </Form>
                    </div>
            
                    <div className="mt-4">
                        <div className="d-flex justify-content-center links">
                            Don't have an account? <a href="/register" className="ml-2">Sign Up</a>
                        </div>
                        <div className="d-flex justify-content-center links">
                            <a href="/#">Forgot your password?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginFormComponent
