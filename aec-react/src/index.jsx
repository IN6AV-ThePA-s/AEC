import React, { useEffect, useState, createContext } from 'react'
import { createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom'
import App from './App'
import { HomePage } from './pages/Home/HomePage'
import {Dashboard} from './pages/Dashboard/Dashboard'
import { Settings } from './pages/Settings/Settings'
import { EventsPage } from './pages/Events/EventsPage'
import { UpdateEvent } from './pages/Events/UpdateEvent'
import { AddEvent } from './pages/Events/AddEvent'
import { HotelPage } from './pages/Hotel/HotelPage'
import { CheckHotelPage } from './pages/Hotel/CheckHotelPage'
import { AddHotelPage } from './pages/Hotel/AddHotelPage'
import { UserPage } from './pages/User/UserPage'
import { AddUserPage } from './pages/User/AddUserPage'
import { UpdateUserPage } from './pages/User/UpdateUserPage'
import { NotFound } from './pages/NotFound/NotFound'
import { LoginPage } from './pages/Home/LoginPage'
import { RegisterPage } from './pages/Home/RegisterPage'
import { AboutUsPage } from './pages/Home/AboutUsPage'
import { ReservationPage } from './pages/Reservation/ReservationPage'
import { BillPage } from './pages/Bill/BillPage'
import { AddReservationPage } from './pages/Reservation/AddReservationPage'
import { UpdateReservationPage } from './pages/Reservation/UpdateReservationPage'
import { UpdateBillPage } from './pages/Bill/UpdateBillPage'
import { ClientPage } from './pages/Client/ClientPage'
import { HotelPageClient } from './pages/Client/HotelPageClient'
import { RoomPageClient } from './pages/Client/RoomPageClient'

export const AuthContext = createContext();

export const Index = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [dataUser, setDataUser] = useState()

    useEffect(() => {
        let token = localStorage.getItem('token')
        let user = localStorage.getItem('user')

        if(token) setLoggedIn(true)
        if(user) setDataUser(JSON.parse(user))
        
    }, [])

    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement: <NotFound/>,
            children: [
                {
                    path: '/',
                    element: <HomePage />
                },
                {
                    path:'/login',
                    element: <LoginPage/>
                },{
                    path: '/register',
                    element: <RegisterPage/>
                },{
                    path: '/about',
                    element: <AboutUsPage/>
                },
                {
                    path: '/home',
                    element: loggedIn ? <ClientPage/> : <LoginPage/>,
                    children: [
                        {
                            path: 'hotels',
                            element: <HotelPageClient/>
                        },
                        {
                            path: 'rooms',
                            element: <RoomPageClient/>
                        },
                        {
                            path: 'settings',
                            element: <Settings/>
                        },
                        {
                            path: 'checkHotel',
                            element: <CheckHotelPage/>
                        }
                    ]
                },
                {
                    path: '/dashboard',
                    element: loggedIn ? <Dashboard/> : <LoginPage/>,
                    children: [
                        {
                            path: 'home',
                            element: <HomePage/>
                        },{
                            path: 'settings',
                            element: <Settings/>
                        },
                        {
                            path: 'eventsPage',
                            element: <EventsPage/>
                        },
                        {
                            path: 'addEvent',
                            element: <AddEvent/>
                        },
                        {
                            path: 'updateEvent/:id',
                            element: <UpdateEvent/>
                        },
                        {
                            path: 'hotelPage',
                            element: <HotelPage/>
                        },
                        {
                            path: 'checkHotel/:id',
                            element: <CheckHotelPage/>
                        },
                        {
                            path: 'addHotel',
                            element: <AddHotelPage/>
                        },
                        {
                            path: 'userPage',
                            element: <UserPage/>
                        },
                        {
                            path: 'addUser',
                            element: <AddUserPage/>
                        },
                        {
                            path: 'updateUser/:id',
                            element: <UpdateUserPage/>
                        },
                        {
                            path: 'reservationPage',
                            element: <ReservationPage/>
                        },
                        {
                            path: 'addReservation',
                            element: <AddReservationPage/>
                        },
                        {
                            path: 'updateReservation',
                            element: <UpdateReservationPage/>
                        },
                        {
                            path: 'billPage',
                            element: <BillPage/>
                        },
                        {
                            path: 'updateBill',
                            element: <UpdateBillPage/>
                        }
                    ]
                }
            ]
        }
    ])

    return (
        <AuthContext.Provider value={{loggedIn, setLoggedIn, dataUser, setDataUser}}>
            <RouterProvider router={routes} />
        </AuthContext.Provider>
    )
}
