import React from 'react'
import hotel1 from '../assets/hotel1.jpg'
import hotel2 from '../assets/hotel2.jpg'
import hotel3 from '../assets/hotel3.jpg'
import '../pages/Hotel/styleCardHotelPage.css'
import { Link } from 'react-router-dom'

import bell from '../assets/desk-bell.svg'
import single from '../assets/single-bed.svg'
import towels from '../assets/towels.svg'
import wifi from '../assets/wifi.svg'

export const CardHotelPage = () => {
    return (
        <>

            <div className="row justify-content-center">
                <div className="col-sm-9 col-md-9 col-lg-9">
                    <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                        <div className="hotel-card_images">
                            <div id="bootstrapCarousel" className="carousel slide h-100" data-ride="carousel">
                                <div className="carousel-inner h-100">
                                    <div className="carousel-item h-100 active">
                                        <img src={hotel1} className="d-block w-100" alt="Hotel Image" />
                                    </div>
                                    <div className="carousel-item h-100">
                                        <img src={hotel2} className="d-block w-100" alt="Hotel Image" />
                                    </div>
                                    <div className="carousel-item h-100">
                                        <img src={hotel3} className="d-block w-100" alt="Hotel Image" />
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
                                <h5 className="mb-0 mr-2">Name</h5>
                                {/* <div>
                                            <i className="fa fa-star text-warning"></i>
                                            <i className="fa fa-star text-warning"></i>
                                            <i className="fa fa-star text-warning"></i>
                                            <i className="fa fa-star text-warning"></i>
                                            <i className="fa fa-star text-warning"></i>
                                        </div> */}

                            </div>
                            <div className="d-flex justify-content-between align-items-end">
                                <div className="hotel-card_details">

                                    <div className="text-muted mb-2">
                                        <i className="fas fa-map-marker-alt"></i> Address
                                    </div>

                                    <div className="mb-2 mt-3">
                                        <span className="badge badge-primary">57841073</span>

                                    </div>
                                    <div className="mb-2">
                                        <span className="badge badge-secondary">gmatta-2021223@kinal.edu.gt</span>

                                    </div>

                                    {/* <div className="amnities d-flex mb-3">
                                                <i className="fa fa-list text-success"> Services: </i>
                                            </div>

                                            <ul className="hotel-checklist pl-0 mb-0">
                                                <li><i className="fa fa-check text-success"></i> Lorem ipsum dolor</li>
                                                <li><i className="fa fa-check text-success"></i> Cras lectus purus, </li>
                                                <li><i className="fa fa-check text-success"></i> ornare eget congue</li>
                                                <li><i className="fa fa-check text-success"></i> ornare eget congue</li>
                                                <li><i className="fa fa-check text-success"></i> ornare eget congue</li>
                                            </ul> */}

                                </div>


                            </div>
                            <Link to='/dashboard/checkHotel'>
                                <button className="btn btn-primary me-1 mt-4">Check Hotel</button>
                            </Link>

                            {/* <button className="btn btn-primary ms-1 me-1 mt-4">Check Rooms</button>
                            <button className="btn btn-warning me-1 ms-1 mt-4">Update Hotel</button>
                            <button className="btn btn-danger ms-1 mt-4">Delete Hotel</button> */}
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}
