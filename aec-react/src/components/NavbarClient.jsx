import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../index'


export const NavbarClient = () => {

    const navigate = useNavigate()
    const { dataUser } = useContext(AuthContext)
    const [photo, setPhoto] = useState()
    const [user, setUser] = useState({})
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const logOut = ()=> {
        localStorage.clear()
        navigate('/')
    }

    const handleImageError = (e) => {
        e.target.src = photoError;
    };

    const getUser = async () => {
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
        
            <nav className="navbar bg-light fixed-top shadow-lg">
                <div className="container-fluid">
                    <span className=" navTitle">AEC</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Welcome to Arc En Ciel</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 text-black textNormalHotel" aria-current="page" to='hotels'><i className='fas fa-hotel'></i> Hotels</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 text-black textNormalHotel" to='rooms'><i className='fas fa-bed'></i> Rooms</Link>
                                </li>
                                <div className="dropdown pb-4 ">
                                    <Link href="#" className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img crossOrigin='anonymous' src={photo} alt="hugenerd" width="30" height="30" className="rounded-circle me-1" />
                                        <span className="d-none d-sm-inline mx-1">{dataUser.username}</span>
                                    </Link>
                                    <ul className="dropdown-menu dropdown-menu-dark text-small ">
                                        <li><Link className="dropdown-item" to='settings'>Settings</Link></li>
                                        <li><Link className="dropdown-item disabled" href="#">Role: {dataUser.role}</Link></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><Link className="dropdown-item" onClick={logOut}>Log Out</Link></li>
                                    </ul>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        
    )
}
