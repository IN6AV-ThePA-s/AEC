import React from 'react'
import hotel1 from '../../assets/hotel1.jpg'
import hotel2 from '../../assets/hotel2.jpg'
import hotel3 from '../../assets/hotel3.jpg'
import room1 from '../../assets/room1.jpg'
import room2 from '../../assets/room2.jpg'
import room3 from '../../assets/room3.jpg'
import '../../pages/Hotel/styleCardHotelPage.css'
import { ModalUpdateRoom } from '../../components/ModalUpdateRoom'
import { Link } from 'react-router-dom'
import { CardRoomPage } from '../../components/CardRoomPage'
import { CardHotelServices } from '../../components/CardHotelServices'
import { CardHotelEvents } from '../../components/CardHotelEvents'
import { ModalAddRoom } from '../../components/ModalAddRoom'
import { ModalCheckServices } from '../../components/ModalCheckServices'
import { ModalAddService } from '../../components/ModalAddService'
import { ModalAddEvent } from '../../components/ModalAddEvent'
import { ModalAddServiceHotel } from '../../components/ModalAddServiceHotel'

export const CheckHotelPage = () => {
    return (

        <div className="main-content">
            <div className="container">

                <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white mb-4'>

                    <h1 className='h1TE text-center'>Check Hotel</h1>

                </div>

                <div className="row justify-content-center">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                            <div className="hotel-card_info p-4">
                                <h1 className='text-center'>Hotel Information</h1>

                                <div className=" align-items-center mb-2">

                                    <h5 className="mr-2 mt-3">Name</h5>
                                    <input type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Address</h5>
                                    <input type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Phone</h5>
                                    <input type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Email</h5>
                                    <input type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Photos</h5>
                                    <div className='d-flex'>

                                        <input type="file" className="form-control" />
                                        <input type="file" className="form-control ms-1" />
                                        <input type="file" className="form-control ms-1" />
                                    </div>


                                </div>

                                <button className="btn btn-warning me-1 mt-4 bi bi-pencil"> Update</button>
                                <button className="btn btn-danger me-1 mt-4 bi bi-trash"> Delete</button>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-4">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                            <div className="hotel-card_info p-4">
                                <h1 className='text-center'>Services</h1>

                                <div className=" align-items-center">

                                    <div className="d-flex flex-column text-center mb-1">

                                        <ModalAddServiceHotel/>

                                        <CardHotelServices />
                                        <CardHotelServices />

                                        <button className="btn btn-success me-1" type="button" data-bs-toggle="modal" data-bs-target="#modalAddServiceHotel">Add Service</button>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-4">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                            <div className="hotel-card_info p-4">
                                <h1 className='text-center'>Events</h1>

                                <div className=" align-items-center mb-2">

                                    <div className="d-flex flex-column text-center p-3">

                                        <ModalAddEvent/>
                                        <CardHotelEvents />

                                        <button className="btn btn-success me-1" type="button" data-bs-toggle="modal" data-bs-target="#modalAddEvent">Add Event</button>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mt-4">

                    <div className="col-sm-9 col-md-9 col-lg-9 mt-2">

                        <h1 className='text-center'>Rooms</h1>

                        <div className='row justify-content-start mt-3'>

                            <div className='col-md-5'>

                                <select name="state" className='form-select'>

                                    <option value={null}>FILTER</option>

                                </select>

                            </div>

                            <div className='col-md-7'>

                                <input type="text" placeholder='Search' className='form-control' />

                            </div>

                            <div className='mt-3'>
                                <button className="btn btn-success col-md-12" type="button" data-bs-toggle="modal" data-bs-target="#modalAddRoom">Add Room</button>
                            </div>

                        </div>

                    </div>

                    <div className="col-sm-9 col-md-9 col-lg-9 mt-2">

                        <ModalAddRoom />
                        <ModalUpdateRoom />

                        <ModalCheckServices />
                        <ModalAddService />

                        <CardRoomPage />

                    </div>

                </div>
            </div>
        </div>

    )
}
