import React, { useContext, useEffect, useState } from 'react'
import './styleSettings.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../index'
import axios from 'axios'
import Swal from 'sweetalert2'
import photoError from '../../assets/userDefault.png'

export const Settings = () => {
    const navigate = useNavigate()
    const { dataUser } = useContext(AuthContext)
    const userData = JSON.parse(localStorage.getItem('user'))
    const [photo, setPhoto] = useState()
    const [uPhoto, setUPhoto] = useState()
    const [user, setUser] = useState({})
    const [form, setForm] = useState({})
    const [pass, setPass] = useState({})
    const [isUp, setIsUp] = useState(false)
    const [isUpdPass, setIsUpdPass] = useState(false)
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const handleImageError = (e) => {
        e.target.src = photoError;
    };

    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setTimeout(() => {
            setIsUp(true)
        }, 500);
    }

    const handlePass = (e) => {
        setPass({
            ...pass,
            [e.target.name]: e.target.value
        })
        setTimeout(() => {
            setIsUpdPass(true)
        }, 500);
    }

    const handlePhoto = (e) => {
        const allowedExtensions = /(.jpg|.jpeg|.png)$/i
        if(!allowedExtensions.exec(e.target.value)) {
            Swal.fire({
                title: 'Invalid extension (only .png | .jpg | .jpeg)',
                icon: 'error',
                showConfirmButton: true
            }).then(()=>{
                e.target.value = ''
            })
        } else {
            let formData = new FormData()
            formData.append('image', e.target.files[0])
            setPhoto(formData)

            setUPhoto(URL.createObjectURL(e.target.files[0]))

            setTimeout(() => {
                setIsUp(true)
            }, 500);
        }

        
    }

    const getUser = async () => {
        try {

            const { data } = await axios.get(`http://localhost:3022/user/get/${dataUser.sub}`, { headers: headers })

            if (data.data) {
                setUser(data.data[0])
                let user = data.data[0]
                setForm({ name: user.name, surname: user.surname, email: user.email, phone: user.phone, username: user.username })
                getPhoto(data.data[0].photo)
            }

        } catch (err) {
            console.error(err)
        }
    }

    const update = async () => {
        try {
            const { data } = await axios.put(`http://localhost:3022/user/update`, form, { headers: headers })
            
            if (data.user) {
                if (uPhoto) {
                    console.log(uPhoto);
                    const { data } = await axios.put(`http://localhost:3022/user/uploadImg/${dataUser.sub}`, photo, { 
                        headers: {'Content-type': 'multipart/form-data', 'Authorization': localStorage.getItem('token')}
                    })
                    
                    Swal.fire({
                        title: 'Account updated!',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        localStorage.setItem('user', JSON.stringify({ sub: data.user._id, role: data.user.role, photo: data.user.photo, username: data.user.username }))
                        location.reload()
                    })
                } else {

                    Swal.fire({
                        title: 'Account updated!',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        localStorage.setItem('user', JSON.stringify({ sub: data.user._id, role: data.user.role, photo: data.user.photo, username: data.user.username }))
                        location.reload()
                    })
                }

            }

        } catch (err) {
            Swal.fire(err.response.data.message, '', 'error')
            console.error(err)
        }
    }

    const upPass = async () => {
        try {
            const { data } = await axios.put(`http://localhost:3022/user/updatePassword`, pass, { headers: headers })

            if (data.message) {
                Swal.fire({
                    title: 'Password updated!',
                    text: 'Login again to complete the steps!',
                    icon: 'success',
                    timer: 3000,
                    showConfirmButton: false
                }).then(() => {
                    localStorage.clear()
                    navigate('/login')
                })
            }

        } catch (err) {
            Swal.fire(err.response.data.message, '', 'error')
            console.error(err)
        }
    }

    const getPhoto = async (id) => {
        try {
            const img = await axios.get(`http://localhost:3022/user/getImg/${id}`)

            if (img) setPhoto(img.request.responseURL)

        } catch (err) {
            console.error(err)
        }
    }

    const delAccount = async () => {
        try {
            Swal.fire({
                title: 'Are you sure about deleting your account?',
                text: 'This action is irreversible',
                icon: 'question',
                showConfirmButton: true,
                showDenyButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await axios.delete(`http://localhost:3022/user/delete`, { headers: headers }).catch((err) => {
                        Swal.fire(err.response.data.message, '', 'error')
                    })
                    Swal.fire(`${data.message}`, '', 'success')
                    navigate('/')
                } else {
                    Swal.fire('No worries!', '', 'success')
                }
            })
        } catch (err) {
            Swal.fire(err.response.data.message, '', 'error')
            console.error(err)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className="bodySettings container rounded bg-white">
            {
                isUp ? (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        There are changes to save, please click the <Link onClick={update} className='alert-link'>button</Link> below to save your changes!
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                ) : (
                    <></>
                )
            }
            <div className="row justify-content-center ">

                <div className="col-md-2 border-right ">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle mt-5" width='150px' height='150px' crossOrigin='anonymous' src={uPhoto ? uPhoto : photo || photoError} onError={handleImageError} />
                        <span className="textSUser font-weight-bold mt-1">{user.username}</span>
                        <span className="textSEmail text-black-50">{user.email}</span>
                        <br />
                        <input onChange={handlePhoto} name='photo' type="file" className="form-control" />

                    </div>
                </div>

                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="titleProfile text-right">Profile Settings</h4>
                        </div>

                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="labels">Names</label>
                                <input defaultValue={user.name} type="text" name='name' onChange={handleForm} className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label className="labels">Surnames</label>
                                <input defaultValue={user.surname} name='surname' type="text" onChange={handleForm} className="form-control" />
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-md-12 mt-3">
                                <label className="labels">Username</label>
                                <input defaultValue={user.username} name='username' type="text" onChange={handleForm} className="form-control" />
                            </div>

                            <div className="col-md-12 mt-3">
                                <label className="labels">Phone</label>
                                <input defaultValue={user.phone} name='phone' type="text" onChange={handleForm} className="form-control" />
                            </div>

                            <div className="col-md-12 mt-3">
                                <label className="labels">Email</label>
                                <input defaultValue={user.email} name='email' type="text" onChange={handleForm} className="form-control" />
                            </div>

                        </div>

                        <div className="text-center mt-3">
                            {
                                user.role === 'CLIENT' ? (
                                    <button onClick={delAccount} className="btn btn-danger me-1" type="button">Delete Account</button>
                                ) : (
                                    <></>
                                )
                            }
                            {
                                isUp ? (
                                    <button className="btn btn-success ms-1" type="button" onClick={update}>Save Profile</button>
                                ) : (
                                    <></>
                                )
                            }

                        </div>

                    </div>

                </div>
                <div className="col-md-4">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center experience">
                            <h4 className="titleProfile">Change Password</h4>
                        </div>
                        <br />
                        <div className="col-md-12">
                            <label className="labels">Actual Password</label>
                            <input required type="password" name='password' onChange={handlePass} className="form-control" />
                        </div>
                        <br />
                        <div className="col-md-12">
                            <label className="labels">New Password</label>
                            <input required type="password" name='newPass' onChange={handlePass} className="form-control" />
                        </div>
                    </div>
                    <div className="text-center">
                        {
                            isUpdPass ? (
                                <button className="btn btn-success profile-button" type="button" onClick={upPass}>Save Password</button>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}
