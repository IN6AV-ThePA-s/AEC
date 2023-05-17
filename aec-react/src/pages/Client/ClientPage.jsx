import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../index'

export const ClientPage = () => {
    const navigate = useNavigate()
    const { dataUser } = useContext(AuthContext)
    
    const [photo, setPhoto] = useState()
    const [user, setUser] = useState({})
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const handleImageError = (e) => {
        e.target.src = photoError;
    };

    const getUser = async() => {
        try {
            
            const { data } = await axios.get(`http://localhost:3022/user/get/${dataUser.sub}`, { headers: headers })

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
    <h1>{user.username}</h1>
  )
}
