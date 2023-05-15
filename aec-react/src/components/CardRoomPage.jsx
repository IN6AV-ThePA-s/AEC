import React from 'react'
import room1 from '../assets/room1.jpg'
import room2 from '../assets/room2.jpg'
import room3 from '../assets/room3.jpg'
import { Link } from 'react-router-dom'

export const CardRoomPage = () => {
    return (

        <div className="hotel-card bg-white rounded-lg shadow overflow-hidden d-block d-lg-flex mt-3">

            <div className="hotel-card_images">

                <div id="bootstrapCarousel" className="carousel slide h-100" data-ride="carousel">
                    <div className="carousel-inner h-100">
                        <div className="carousel-item h-100 active">
                            <img src={room1} className="d-block w-100" alt="Hotel Image" />
                        </div>
                        <div className="carousel-item h-100">
                            <img src={room2} className="d-block w-100" alt="Hotel Image" />
                        </div>
                        <div className="carousel-item h-100">
                            <img src={room3} className="d-block w-100" alt="Hotel Image" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#bootstrapCarousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#bootstrapCarousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
            <div className="hotel-card_info p-4">
                <div className="d-flex align-items-center mb-2">

                    <h5 className="mb-0 mr-2">Id Room</h5>

                </div>
                <div className="d-flex justify-content-between align-items-end">
                    <div className="hotel-card_details">
                        <div className="text-muted mb-2"><i className="fas fa-bed"></i> Beds: (name, cant, capacity)</div>

                        <div className='d-flex'>
                            <div className="mb-2 me-1">
                                <span className="badge badge-warning">Busy</span>

                            </div>
                            <div className="mb-2 ms-1">
                                <span className="badge badge-secondary">Presidential</span>

                            </div>
                        </div>

                        <div className="amnities d-flex mb-3 mt-3">
                            <Link>
                                <button className="btn btn-primary me-1 mt-4 bi bi-list" data-bs-toggle="modal" data-bs-target="#modalCheckServices"> Check Services</button>
                            </Link>
                            <Link>
                                <button className="btn btn-success me-1 mt-4 bi bi-plus-circle" data-bs-toggle="modal" data-bs-target="#modalAddService"> Add Service</button>
                            </Link>
                        </div>
                    </div>
                    <div className="hotel-card_pricing text-center">
                        <h3>Q1,300</h3>
                        {/* <div className="d-flex">
                            <h6 className="text-striked text-muted mr-2">Q1,999</h6>
                            <h6 className="text-success">32% off</h6>
                        </div>
                        <button className="btn btn-primary">Check Rooms</button> */}
                    </div>

                </div>

                <button className="btn btn-warning me-1 mt-4 bi bi-pencil" data-bs-toggle="modal" data-bs-target="#modalUpdateRoom"> Update Room</button>

                <Link>
                    <button className="btn btn-danger me-1 mt-4 bi bi-trash"> Delete Room</button>
                </Link>
            </div>
        </div>
        
    )
}
