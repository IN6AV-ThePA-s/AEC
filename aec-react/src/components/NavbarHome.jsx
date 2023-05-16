import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

export const NavbarHome = () => {
    return (
        <>
            <header>
                <div>
                    <h3 className="h3247 float-md-start mb-0"><img src={logo} width='50rem' height='50rem' /></h3>
                    <nav className="nav nav-masthead justify-content-center float-md-end">
                        <Link className="nav-link fw-bold py-1 px-0" style={{color: 'black'}} to='/'>Home</Link>
                        <Link className="nav-link fw-bold py-1 px-0" style={{color: 'black'}} to='/about' >About Us</Link>
                        <Link className="nav-link fw-bold py-1 px-0" style={{color: 'black'}} to='/login'>Login</Link>
                    </nav>
                </div>
            </header>
        </>
    )
}
