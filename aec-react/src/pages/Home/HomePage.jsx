import React from 'react'
import './homeStyle.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { NavbarHome } from '../../components/NavbarHome'


export const HomePage = () => {

    return (
        <div className="text-center" >
            <div className='d-flex mx-5 py-2 flex-column text-center conLogin'>

                <NavbarHome />
            </div>
            {<div className="p-5 bg-image" style={{
                height: '250px',
                backgroundImage: `url('https://img.freepik.com/free-photo/fantastic-blue-sky_1203-1929.jpg?w=996&t=st=1683838238~exp=1683838838~hmac=488e0f00855dd85560dee7eaa798f29a16699300c15d4e3f4e9edcad98586d8c')`,
                backgroundSize: 'cover'

            }} >
            </div>}

            <div className="card mx-4 mx-md-5 shadow-5-strong" style={{
                marginTop: '-175px',
                background: `transparent`,
                backdropFilter: `blur(30px)`,
                border: 'none'
            }}>
                <div className="card-body py-5 px-md-5">

                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8">
                            <h2 className="fw-bold mb-5">Home</h2>
                            

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
