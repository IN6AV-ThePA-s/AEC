import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NavbarHome } from '../../components/NavbarHome'
import './LoginStyle.css'
import { auto } from '@popperjs/core'
import { AuthContext } from '../../index'
import axios from 'axios'
import logo from '../../assets/logo.png'
import Swal from 'sweetalert2'

export const RegisterPage = () => {
    const { loggedIn, setLoggedIn, setDataUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        surname: '', 
        phone: '',
        email: '',
        username: '',
        password: ''
    })
    const [photo, setPhoto] = useState()
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handlePhoto = (e) => {
        let formData = new FormData()
        formData.append('image', e.target.files[0])
        setPhoto(formData)
    }

    const add = async(e) => {
        try {
            const { data } = await axios.post('http://localhost:3022/user/register', form)

            if(data.user) {
                if(photo) await axios.put(`http://localhost:3022/user/registerImg/${data.user._id}`, photo, {
                    headers: {'Content-Type': 'multipart/form-data'}
                })
                navigate('/login')
            }

        } catch (err) {
            Swal.fire(err.response.data.message, '', 'error')
            console.error(err)
            throw new Error('Login error')
        }
    }

    return (
            <div className="text-center" >
                <div className='d-flex mx-5 py-2 flex-column text-center conLogin'>

                    
                </div>
                <div className="p-5 bg-image" style={ {height: '250px', 
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
                            <h2 className="fw-bold mb-5" style={{color: '#fffFFF'}}><i className="fa-solid fa-address-card fa-3x" ></i></h2>
                            <h2 className="fw-bold mb-5">Register</h2>
                            <form >
                            <div className='form-group d-flex justify-content-center'>
                                <div className="form__group field ms-3">
                                    <input onChange={handleChange} type="text" className="form__field" placeholder="Name" name="name" maxLength='100' required />
                                    <label htmlFor="name" className="form__label">Name</label>
                                </div>
                        
                                <div className="form__group field ms-3">
                                    <input onChange={handleChange} type="text" className="form__field" placeholder="Surname" name="surname" maxLength='100' required />
                                    <label htmlFor="name" className="form__label">Surname</label>
                                </div>
                            </div>
                            <div className='form-group d-flex justify-content-center'>
                                <div className="form__group field ms-3">
                                    <input onChange={handleChange} type="number" className="form__field" placeholder="Phone" name="phone" maxLength='100' required />
                                    <label htmlFor="name" className="form__label">Phone</label>
                                </div>
                        
                                <div className="form__group field ms-3">
                                    <input onChange={handleChange} type="email" className="form__field" placeholder="Email" name="email" maxLength='100' required />
                                    <label htmlFor="name" className="form__label">Email</label>
                                </div>
                            </div>
                            <div className='form-group d-flex justify-content-center'>
                                <div className="form__group field ms-3">
                                    <input onChange={handleChange} type="password" className="form__field" placeholder="Password" name="password" maxLength='100' required />
                                    <label htmlFor="name" className="form__label">Password</label>
                                </div>
                                <div className="form__group field ms-3">
                                    <input onChange={handleChange} type="text" className="form__field" placeholder="Username" name="username" maxLength='100' required />
                                    <label htmlFor="name" className="form__label">Username</label>
                                </div>
                            </div>
                            <br />
                            <div className='form-group d-flex justify-content-center'>
                                <div className="mb-3">
                                    <input onChange={handlePhoto} className="form-control" type="file" id="formFile" name='photo'/>
                                </div>
                            </div>
                                <br />
                                <button className="btnLogin draw-border rounded mx-3" onClick={(e)=>{add(e), e.preventDefault()}}>Register</button>
                                <Link to={'/login'}>
                                <button className="btnLogin draw-border2 rounded">Cancel</button>
                                </Link>
                                <br />
                            </form>

                        </div>
                    </div>
                </div>
                </div>
                </div>
)
}