import React, { useEffect, useState } from 'react'
import { CardUserPage } from '../../components/CardUserPage'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export const UserPage = () => {
    const [user, setUser] = useState([{}])
    const [photo, setPhoto] = useState()
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
    const navigate = useNavigate()

    const getUsers = async() => {
        try {
            const { data } = await axios('http://localhost:3022/user/get', { headers: headers })

            if(data) {
                for (let i = 0; i < data.data.length; i++) {
                    if(data.data[i].photo) {
                        let img = await axios(`http://localhost:3022/user/getImg/${data.data[i].photo}`, { headers: headers })
                        data.data[i].photo = img.request.responseURL
                    }
                    continue
                }
            }
            setUser(data.data)

        } catch (err) {
            console.error(err)

        }
    }

    const del = async(id) => {
        try {
            Swal.fire({
                title: 'Are you sure to delete this user?',
                icon: 'question',
                showConfirmButton: true,
                showDenyButton: true,
            }).then(async(result) => {
                if(result.isConfirmed) {
                    const { data } = await axios.delete(`http://localhost:3022/user/delete/${id}`, { headers: headers }).catch((err) => {
                        Swal.fire(err.response.data.message, '', 'error')
                    })
                    console.log(data)
                    getUsers()
                    Swal.fire(`${data.message}`, '', 'success')
                } else {
                    Swal.fire('No worries!', '', 'success')
                }
            })
        } catch (err) {
            Swal.fire(err.response.data.message, '', 'error')
        }
    }

    useEffect(() => {
        getUsers()
    }, [])
    
    
    return (
        <div className="main-content">
            <div className="container">

                <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white'>

                    <h1 className='h1TE text-center'>Users</h1>

                </div>

                <div className='row justify-content-start mb-4 mt-3'>

                    <div className='col-md-5'>

                        <select name="state" className='form-select'>

                            <option value={null}>FILTER</option>

                        </select>

                    </div>

                    <div className='col-md-7'>

                        <input type="text" placeholder='Search' className='form-control' />

                    </div>


                </div>

                {
                    user.map(({ name, surname, phone, email, username, photo, id, role }, index) => {
                        
                        return (
                            <CardUserPage 
                                key={index}
                                name={name}
                                surname={surname}
                                phone={phone}
                                email={email}
                                username={username}
                                photo={photo}
                                id={id}
                                role={role}
                                butDel={()=>del(id)}
                            />
                        )
                        
                    })
                }
                

            </div>
        </div>
    )
}
