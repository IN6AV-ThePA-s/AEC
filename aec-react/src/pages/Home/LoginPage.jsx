import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NavbarHome } from '../../components/NavbarHome'
import './LoginStyle.css'
import { auto } from '@popperjs/core'
import { AuthContext } from '../../index'
import axios from 'axios'
import logo from '../../assets/logo.png'


export const LoginPage = () => {
    const { loggedIn, setLoggedIn, setDataUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username: '',
        password: ''
    })


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const login = async (e) => {
        try {
            const { data } = await axios.post('http://localhost:3022/user/login', form)

            if (data.token) {
                localStorage.setItem('token', data.token)
                setDataUser(data.user)
                setLoggedIn(true)
                navigate('/dashboard')
            }

        } catch (err) {
            console.error(err)
            throw new Error('Login error')
        }
    }

    return (
        <div className="text-center" >
            <div className='d-flex mx-5 py-2 flex-column text-center conLogin'>

                <NavbarHome />
            </div>
            <div className="p-5 bg-image" style={{
                height: '250px',
                backgroundImage: `url('https://img.freepik.com/free-photo/fantastic-blue-sky_1203-1929.jpg?w=996&t=st=1683838238~exp=1683838838~hmac=488e0f00855dd85560dee7eaa798f29a16699300c15d4e3f4e9edcad98586d8c')`,
                backgroundSize: 'cover'

            }} >
            </div>

            <div className="card mx-4 mx-md-5 shadow-5-strong" style={{
                marginTop: '-175px',
                background: `transparent`,
                backdropFilter: `blur(30px)`,
                border: 'none'
            }}>
                <div className="card-body py-5 px-md-5">

                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8">
                            <h2 className="fw-bold mb-5" style={{ color: '#00126c' }}><img src={logo} width='120rem' height='120rem' /></h2>
                            <h2 className="fw-bold mb-5">Sign up</h2>
                            <form >
                                <div className='form-group d-flex justify-content-center'>
                                    <div className="form__group field me-3">
                                        <input onChange={handleChange} type="text" className="form__field" placeholder="Username" name="username" maxLength='100' required />
                                        <label htmlFor="name" className="form__label">Username</label>
                                    </div>

                                    <div className="form__group field ms-3">
                                        <input onChange={handleChange} type="password" className="form__field" placeholder="Password" name="password" maxLength='100' required />
                                        <label htmlFor="name" className="form__label">Password</label>
                                    </div>
                                </div>
                                <br />
                                <button className="btnLogin draw-border rounded" onClick={login}>Login</button>
                                <br />
                                <Link to={'/register'}>
                                    <p>Don't have an account? <a className="link-secondary" >Register here</a></p>
                                </Link>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            <footer className="mt-auto">
                <p className='text-dark'>Arc-En-Ciel®</p>
            </footer>
        </div>
    )
}