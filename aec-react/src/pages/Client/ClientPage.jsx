import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../index'
import { NavbarClient } from '../../components/NavbarClient'

export const ClientPage = () => {
    const navigate = useNavigate()
    const { dataUser } = useContext(AuthContext)

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
        if (!allowedExtensions.exec(e.target.value)) {
            Swal.fire({
                title: 'Invalid extension (only .png | .jpg | .jpeg)',
                icon: 'error',
                showConfirmButton: true
            }).then(() => {
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

    const update = async () => {
        try {
            const { data } = await axios.put(`http://localhost:3022/user/update`, form, { headers: headers })

            if (data.user) {
                if (uPhoto) {
                    console.log(uPhoto);
                    const { data } = await axios.put(`http://localhost:3022/user/uploadImg/${dataUser.sub}`, photo, {
                        headers: { 'Content-type': 'multipart/form-data', 'Authorization': localStorage.getItem('token') }
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



    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            <div className='container' style={{ marginTop: '6rem' }}>

                <div>
                    <NavbarClient />
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12">

                    <Outlet />

                </div>

            </div>

        </>

    )
}
