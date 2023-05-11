import React, { useEffect, useState, createContext } from 'react'
import { createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom'
import App from './App'
import { HomePage } from './pages/Home/HomePage'
import {Dashboard} from './pages/Dashboard/Dashboard'
import { Settings } from './pages/Settings/Settings'
import { EventsPage } from './pages/Events/EventsPage'
import { UpdateEvent } from './pages/Events/UpdateEvent'
import { AddEvent } from './pages/Events/AddEvent'

export const AuthContext = createContext();

export const Index = () => {

    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: '/',
                    element: <HomePage />
                },{
                    path: '/dashboard',
                    element: <Dashboard/>,
                    children: [
                        {
                            path: 'home',
                            element: <HomePage/>
                        },
                        {
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
                        }
                    ]
                }
            ]
        }
    ])

    return (
        <AuthContext.Provider value={null}>
            <RouterProvider router={routes} />
        </AuthContext.Provider>
    )
}
