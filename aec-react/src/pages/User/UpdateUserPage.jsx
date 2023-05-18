import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export const UpdateUserPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [select, setSelect] = useState()
    const [photo, setPhoto] = useState()
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const handleSelect = (e) => {
        setSelect(e.target.options[e.target.selectedIndex].value)
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
                setSelect(data.data[0].role)
                document.getElementById('role').value = data.data[0].role
            }
            
        } catch (err) {
            console.log(err)
            Swal.fire(err.response.data.message, '', 'error')
            console.error(err)
        }
    }

    const update = async() => {
        try {
            let form = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                username: document.getElementById('username').value,
                role: select
            }
            const { data } = await axios.put(`http://localhost:3022/user/update/${id}`, form, { headers: headers })

            if (data.user) {
                if (photo) await axios.put(`http://localhost:3022/user/uploadImg/${id}`, photo, { 
                    headers: {'Content-type': 'multipart/form-data', 'Authorization': localStorage.getItem('token')}
                })

                Swal.fire({
                    title: 'User updated!',
                    text: `User "${data.user.username}" was updated!`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
                navigate('/dashboard/userPage')
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
                                    <input defaultValue={user.name} name='name' id='name' type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Surname</h5>
                                    <input defaultValue={user.surname} name='surname' id='surname' type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Phone</h5>
                                    <input defaultValue={user.phone} name='phone' id='phone' type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Email</h5>
                                    <input defaultValue={user.email} name='email' id='email' type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Username</h5>
                                    <input defaultValue={user.username} name='username' id='username' type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Role</h5>
                                    <select onChange={handleSelect} defaultValue={user.role} name='role' id='role' className='form-select'>
                                        
                                        <option value={'ADMIN'}>ADMIN</option>
                                        <option value={'CLIENT'}>CLIENT</option>

                                    </select>

                                    <h5 className="mr-2 mt-3">Photo</h5>
                                    <input onChange={handlePhoto} type="file" className="form-control" />




                                </div>

                                <button onClick={update} className="btn btn-primary me-1 mt-4">Save Changes</button>
                                <button onClick={()=>{navigate('/dashboard/userPage')}} className="btn btn-danger me-1 mt-4">Cancel</button>

                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}
