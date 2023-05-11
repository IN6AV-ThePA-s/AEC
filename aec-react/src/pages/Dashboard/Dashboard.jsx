import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './styleDashboard.css'
import {Sidebar} from '../../components/Sidebar'

export const Dashboard = () => {
    return (

        <>
            <div className="container-fluid">
                
                <div className="row flex-nowrap">

                    <div className="bgDash col-auto col-md-3 col-xl-2 px-0 sticky">
                        
                        <Sidebar/>

                    </div>

                    <div className="col py-3">

                       {/* CONTENIDO */}
                        <Outlet/>

                    </div>

                </div>

            </div>

        </>

    )

}
