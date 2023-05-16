import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export const UpdateUserPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [form, setForm] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        role: ''
    })
    const [photo, setPhoto] = useState()
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSelect = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.options[e.target.selectedIndex].value
        })
    }
    const handlePhoto = (e) => {
        let formData = new FormData()
        formData.append('image', e.target.files[0])
        setPhoto(formData)
    }

    const getUser = async() => {
        try {
            const { data } = await axios.get(`http://localhost:3022/user/get/${id}`, { headers: headers })
            if (data.data) {
                setUser(data.data[0])
            }
            
        } catch (err) {
            Swal.fire(err.response.data.message, '', 'error')
            console.error(err)
        }
    }

    const update = async() => {
        try {
            const { data } = await axios.put(`http://localhost:3022/user/update/${id}`)
        } catch (err) {
            Swal.fire(err.response.data.message, '', 'error')
            console.error(err)
        }
    }
    
    useEffect(() => {
        getUser()
    }, [])
    
    return (
        <div className="main-content">
            <div className="container">

                <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white mb-4'>

                    <h1 className='h1TE text-center'>Update User</h1>

                </div>

                <div className="row justify-content-center">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                            <div className="hotel-card_info p-4">
                                <h1 className='text-center'>User Information</h1>

                                <div className=" align-items-center mb-2">

                                    <h5 className="mr-2 mt-3">Name</h5>
                                    <input defaultValue={user.name} name='name' type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Surname</h5>
                                    <input defaultValue={user.surname} name='surname' type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Phone</h5>
                                    <input defaultValue={user.phone} name='phone' type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Email</h5>
                                    <input defaultValue={user.email} name='email' type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Username</h5>
                                    <input defaultValue={user.username} name='username' type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Role</h5>
                                    <select defaultValue={user.role} name='role' className='form-select'>
                                        
                                        <option value={'ADMIN'}>ADMIN</option>
                                        <option value={'CLIENT'}>CLIENT</option>

                                    </select>

                                    <h5 className="mr-2 mt-3">Photo</h5>
                                    <input onChange={handlePhoto} type="file" className="form-control" />




                                </div>

                                <button className="btn btn-primary me-1 mt-4">Save Changes</button>
                                <button className="btn btn-danger me-1 mt-4">Cancel</button>

                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}
