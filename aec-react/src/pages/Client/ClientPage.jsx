import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../index'
import { CardHotelPage } from '../../components/CardHotelPage'
import room1 from '../../assets/room1.jpg'
import room2 from '../../assets/room2.jpg'
import room3 from '../../assets/room3.jpg'
import foto from '../../assets/foto.png'
import { NavbarClient } from '../../components/NavbarClient'

export const ClientPage = () => {

    return (
        <>
            <div className='container' style={{ marginTop: '6rem' }}>
                
                <div>
                    <NavbarClient/>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12">

                    <Outlet/>

                </div>

            </div>

        </>
    )
}
