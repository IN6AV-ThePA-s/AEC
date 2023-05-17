import React, { useContext, useEffect, useState } from 'react'
import './styleSettings.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../index'
import axios from 'axios'
import Swal from 'sweetalert2'

export const Settings = () => {
    const navigate = useNavigate()

    const userData = JSON.parse(localStorage.getItem('user'))
    const [photo, setPhoto] = useState()
    const [user, setUser] = useState({})
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getUser = async() => {
        try {
            
            const { data } = await axios.get(`http://localhost:3022/user/get/${userData.user.sub}`, { headers: headers })

            if (data.data) {
                setUser(data.data[0])
                getPhoto(data.data[0].photo)
            }
            
        } catch (err) {
            console.error(err)
        }
    }
    
    const getPhoto = async(id) => {
        try {
            const img = await axios.get(`http://localhost:3022/user/getImg/${id}`)

            if (img) setPhoto(img.request.responseURL)
            
        } catch (err) {
            console.error(err)
        }
    }

    const delAccount = async() => {
        try {
            Swal.fire({
                title: 'Are you sure about deleting your account?',
                text: 'This action is irreversible',
                icon: 'question',
                showConfirmButton: true,
                showDenyButton: true,
            }).then(async(result)=>{
                if(result.isConfirmed) {
                    const { data } = await axios.delete(`http://localhost:3022/user/delete`, { headers: headers }).catch((err)=>{
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

            <div className="row justify-content-center ">

                <div className="col-md-3 border-right ">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">

                        <img className="rounded-circle mt-5" width="150px" crossOrigin='anonymous' src={photo} />
                        <span className="textSUser font-weight-bold mt-1">{user.username}</span>
                        <span className="textSEmail text-black-50">{user.email}</span>

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
                                <input defaultValue={user.name} type="text" className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label className="labels">Surnames</label>
                                <input defaultValue={user.surname} type="text" className="form-control" />
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-md-12 mt-3">
                                <label className="labels">Phone</label>
                                <input defaultValue={user.phone} type="text" className="form-control" />
                            </div>

                            <div className="col-md-12 mt-3">
                                <label className="labels">Email</label>
                                <input defaultValue={user.email} type="text" className="form-control" />
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
                            <button className="btn btn-primary ms-1" type="button">Save Profile</button>

                        </div>

                    </div>

                </div>
                {/* <div className="col-md-4">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center experience">
                            <h4>Change Password</h4>
                        </div>
                        <br />
                        <div className="col-md-12">
                            <label className="labels">Actual Password</label>
                            <input type="text" className="form-control" />
                        </div> 
                        <br />
                        <div className="col-md-12">
                            <label className="labels">New Password</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary profile-button" type="button">Save Password</button>
                    </div>
                </div> */}
            </div>
        </div>

    )
}
