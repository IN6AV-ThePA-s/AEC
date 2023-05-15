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

export const AuthContext = createContext();

export const Index = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [dataUser, setDataUser] = useState({
        names: '',
        username: '',
        role: ''
    })

    useEffect(() => {
        let token = localStorage.getItem('token')
        if(token) setLoggedIn(true)
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
                            path: 'checkHotel',
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
                            path: 'updateUser',
                            element: <UpdateUserPage/>
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
