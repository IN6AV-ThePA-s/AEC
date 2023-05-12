import React from 'react'
import { Link } from 'react-router-dom'
import photo from '../assets/foto.png'

export const Sidebar = () => {
    return (
        <>
            <div className="sticky-top d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100 shadow-lg">

                <div className='text-center align-items-center ps-auto'>
                    <h1 className="textAec d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none">
                        <span className="dashTitle d-flex text-center d-sm-inline">Aec</span> {/* d-none */}
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

                                    <Link href="#" className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textAdd fs-6 bi bi-plus-circle"></i> <span className="textAdd ms-1 d-none d-sm-inline">Add</span>
                                        </div>
                                        
                                    </Link>

                                </li>
                                <li className='container max-width'>

                                    <Link href="#" className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textUpdate fs-6 bi bi-pencil  "></i> <span className="textUpdate ms-1 d-none d-sm-inline">Update</span>
                                        </div>
                                    </Link>

                                </li>
                            </ul>
                        </li>

                        <li>
                            <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                <i className="textOption fs-3 bi bi-building-fill-gear"></i> <span className="textOption d-none d-sm-inline">Hotel</span>
                            </a>
                            <ul className="collapse nav flex-column" id="submenu2" data-bs-parent="#menu">
                                <li className='container max-width'>

                                    <Link href="#" className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textAdd fs-6 bi bi-plus-circle"></i> <span className="textAdd ms-1 d-none d-sm-inline">Add</span>
                                        </div>
                                        
                                    </Link>

                                </li>
                                <li className='container max-width'>

                                    <Link href="#" className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textUpdate fs-6 bi bi-pencil  "></i> <span className="textUpdate ms-1 d-none d-sm-inline">Update</span>
                                        </div>
                                    </Link>

                                </li>
                            </ul>
                        </li>

                        <li>
                            <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                <i className="textOption fs-3 bi bi-briefcase"></i> <span className="textOption d-none d-sm-inline">Service</span>
                            </a>
                            <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                                <li className='container max-width'>

                                    <Link href="#" className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textAdd fs-6 bi bi-plus-circle"></i> <span className="textAdd ms-1 d-none d-sm-inline">Add</span>
                                        </div>
                                        
                                    </Link>

                                </li>
                                <li className='container max-width'>

                                    <Link href="#" className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textUpdate fs-6 bi bi-pencil  "></i> <span className="textUpdate ms-1 d-none d-sm-inline">Update</span>
                                        </div>
                                    </Link>

                                </li>
                            </ul>
                        </li>

                        <li>
                            <a href="#submenu4" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                                <i className="textOption fs-3 bi bi-moon-stars"></i> <span className="textOption d-none d-sm-inline">Room</span>
                            </a>
                            <ul className="collapse nav flex-column ms-1" id="submenu4" data-bs-parent="#menu">
                                <li className='container max-width'>

                                    <Link href="#" className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textAdd fs-6 bi bi-plus-circle"></i> <span className="textAdd ms-1 d-none d-sm-inline">Add</span>
                                        </div>
                                        
                                    </Link>

                                </li>
                                <li className='container max-width'>

                                    <Link href="#" className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textUpdate fs-6 bi bi-pencil  "></i> <span className="textUpdate ms-1 d-none d-sm-inline">Update</span>
                                        </div>
                                    </Link>

                                </li>
                            </ul>
                        </li>

                        <li>
                            <a href="#submenu5" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                <i className="textOption fs-3 bi bi-calendar4-event"></i> <span className="textOption d-none d-sm-inline">Event</span>
                            </a>
                            <ul className="collapse nav flex-column ms-1" id="submenu5" data-bs-parent="#menu">
                                <li className='container max-width'>

                                    <Link href="#" className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textAdd fs-6 bi bi-plus-circle"></i> <span className="textAdd ms-1 d-none d-sm-inline">Add</span>
                                        </div>
                                        
                                    </Link>

                                </li>
                                <li className='container max-width'>

                                    <Link href="#" className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textUpdate fs-6 bi bi-pencil  "></i> <span className="textUpdate ms-1 d-none d-sm-inline">Update</span>
                                        </div>
                                    </Link>

                                </li>
                            </ul>
                        </li>

                        <li>
                            <a href="#submenu6" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                <i className="textOption fs-3 bi bi-cart3"></i> <span className="textOption d-none d-sm-inline">Consumables</span>
                            </a>
                            <ul className="collapse nav flex-column ms-1" id="submenu6" data-bs-parent="#menu">
                                <li className='container max-width'>

                                    <Link href="#" className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textAdd fs-6 bi bi-plus-circle"></i> <span className="textAdd ms-1 d-none d-sm-inline">Add</span>
                                        </div>
                                        
                                    </Link>

                                </li>
                                <li className='container max-width'>

                                    <Link href="#" className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textUpdate fs-6 bi bi-pencil  "></i> <span className="textUpdate ms-1 d-none d-sm-inline">Update</span>
                                        </div>
                                    </Link>

                                </li>
                            </ul>
                        </li>

                        <li>
                            <a href="#submenu7" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                <i className="textOption fs-3 bi bi-telephone-outbound"></i> <span className="textOption d-none d-sm-inline">Reservation</span>
                            </a>
                            <ul className="collapse nav flex-column ms-1" id="submenu7" data-bs-parent="#menu">
                                <li className='container max-width'>

                                    <Link href="#" className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textAdd fs-6 bi bi-plus-circle"></i> <span className="textAdd ms-1 d-none d-sm-inline">Add</span>
                                        </div>
                                        
                                    </Link>

                                </li>
                                <li className='container max-width'>

                                    <Link href="#" className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textUpdate fs-6 bi bi-pencil  "></i> <span className="textUpdate ms-1 d-none d-sm-inline">Update</span>
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
                                <li className="w-100">

                                    <Link href="#" className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textAdd fs-6 bi bi-plus-circle"></i> <span className="textAdd ms-1 d-none d-sm-inline">Add</span>
                                        </div>
                                        
                                    </Link>

                                </li>
                                <li>

                                    <Link href="#" className="nav-link px-0">
                                        <div className='container bg-light p-2 rounded-4 shadow'>
                                            <i className="textUpdate fs-6 bi bi-pencil  "></i> <span className="textUpdate ms-1 d-none d-sm-inline">Update</span>
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
                        <img src={photo} alt="hugenerd" width="30" height="30" className="rounded-circle me-1" />
                        <span className="d-none d-sm-inline mx-1">gmatta</span>
                    </Link>

                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><Link className="dropdown-item" href="#">Profile</Link></li>
                        <li><Link className="dropdown-item" to='settings'>Settings</Link></li>
                        <li><Link className="dropdown-item disabled" href="#">Role: ADMIN</Link></li>

                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><Link className="dropdown-item" href="#">Log Out</Link></li>
                    </ul>

                </div>

            </div>
        </>

    )
}
