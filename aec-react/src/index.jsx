import React, { useEffect, useState, createContext } from 'react'
import { createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom'
import App from './App'
import { HomePage } from './pages/Home/HomePage'
import {Dashboard} from './pages/Dashboard/Dashboard'
import { Settings } from './pages/Settings/Settings'
import { LoginPage } from './pages/Home/LoginPage'
import { NotFound } from './pages/NotFound/NotFound'
import { RegisterPage} from './pages/Home/RegisterPage'
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
                    element: <Dashboard/>,
                    children: [
                        {
                            path: 'home',
                            element: <HomePage/>
                        },{
                            path: 'settings',
                            element: <Settings/>
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
