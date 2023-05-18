import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../index'
import axios from 'axios'
import Swal from 'sweetalert2'
import photoError from '../assets/userDefault.png'


export const Sidebar = () => {
    const navigate = useNavigate()
    const { dataUser } = useContext(AuthContext)
    //const dataUser = JSON.parse(localStorage.getItem('user'))
    const [photo, setPhoto] = useState()
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const handleImageError = (e) => {
        e.target.src = photoError;
    };
    
    const getPhoto = async() => {
        try {
            const img = await axios.get(`http://localhost:3022/user/getImg/${dataUser.photo}`)

            if (img) setPhoto(img.request.responseURL)
            
        } catch (err) {
            console.error(err)
        }
    }

    const logOut = ()=> {
        localStorage.clear()
        navigate('/')
    }
    useEffect(() => {
        getPhoto()
    }, [])
    
    
    return (
        <>
            <div className="sticky-top d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">

                <div className='text-center align-items-center ps-auto'>

                    <h1 className="textAec d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none">

                        <span className="dashTitle d-flex text-center d-sm-inline">AEC </span> {/* d-none */}
                    </h1>
                </div>

                <div>
                    <ul className="textMenu nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">

                        <li>
                            <a href="#submenu1" data-bs-toggle="collapse"  className="nav-link px-0 align-middle">
                                <i className="textOption align-middle fs-3 bi bi-person-circle"></i> <span className="textOption align-middle d-none d-sm-inline">User</span>
                            </a>
                            <ul className="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                <li className='container max-width'>

                                    <Link to='userPage' className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="text-info fs-6 bi bi-house"></i> <span className="text-info ms-1 d-none d-sm-inline">Principal</span>
                                        </div>
                                    </Link>

                                </li>
                                <li className='container max-width'>

                                    <Link to='addUser' className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textAdd fs-6 bi bi-plus-circle"></i> <span className="textAdd ms-1 d-none d-sm-inline">Add</span>
                                        </div>
                                    </Link>

                                </li>
                            </ul>
                        </li>

                        <li>
                            <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                <i className="textOption fs-3 bi bi-building-fill-gear"></i> <span className="textOption d-none d-sm-inline">Hotel</span>
                            </a>
                            <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                <li className='container max-width'>

                                    <Link to='hotelPage' className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="text-info fs-6 bi bi-house"></i> <span className="text-info ms-1 d-none d-sm-inline">Principal</span>
                                        </div>
                                    </Link>

                                </li>
                                <li className="container max-width">

                                    <Link to='addHotel' className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textAdd fs-6 bi bi-plus-circle"></i> <span className="textAdd ms-1 d-none d-sm-inline">Add</span>
                                        </div>
                                    </Link>

                                </li>

                            </ul>
                        </li>



                        <li>
                            <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                <i className="textOption fs-3 bi bi-telephone-outbound"></i> <span className="textOption ms-1 d-none d-sm-inline">Reservation</span>
                            </a>
                            <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                                <li className='container max-width'>

                                    <Link to='reservationPage' className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="text-info fs-6 bi bi-house"></i> <span className="text-info ms-1 d-none d-sm-inline">Principal</span>
                                        </div>
                                    </Link>

                                </li>
                                <li className='container max-width'>

                                    <Link to='addReservation' className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textAdd fs-6 bi bi-plus-circle"></i> <span className="textAdd ms-1 d-none d-sm-inline">Add</span>
                                        </div>
                                    </Link>

                                </li>
                            </ul>
                        </li>


                        <li>
                            <a href="#submenu8" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                <i className="textOption fs-3 bi bi-journal-text"></i> <span className="textOption d-none d-sm-inline">Bill</span>
                            </a>
                            <ul className="collapse nav flex-column ms-1" id="submenu8" data-bs-parent="#menu">
                                <li className='container max-width'>

                                    <Link to='billPage' className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="text-info fs-6 bi bi-house"></i> <span className="text-info ms-1 d-none d-sm-inline">Principal</span>
                                        </div>
                                    </Link>

                                </li>
                                
                            </ul>
                        </li>

                    </ul>

                </div>

                <hr />

                <div className="dropdown pb-4">

                    <Link href="#" className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={photo || photoError} onError={handleImageError} crossOrigin='anonymous' alt="userFoto" width="30" height="30" className="rounded-circle me-1" />
                        <span className="d-none d-sm-inline mx-1">{dataUser.username}</span>
                    </Link>

                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><Link className="dropdown-item" to='settings'>Settings</Link></li>
                        <li><Link className="dropdown-item disabled" href="#">Role: {dataUser.role}</Link></li>

                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><Link onClick={logOut} className="dropdown-item" href="#">Log Out</Link></li>
                    </ul>

                </div>

            </div>
        </>

    )
}
