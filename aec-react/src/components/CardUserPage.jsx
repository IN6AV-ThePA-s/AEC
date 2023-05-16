import React from 'react'
import user from '../assets/user.jpg'
import { Link } from 'react-router-dom'

export const CardUserPage = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-sm-9 col-md-9 col-lg-9">
                <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                    <div className="hotel-card_images">
                        <div id="bootstrapCarousel" className="carousel  h-100" data-ride="carousel">
                            <div className="carousel-inner h-100">
                                <div className="carousel-item h-100 active">
                                    <img src={user} className="d-block w-100" alt="Hotel Image" />
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="hotel-card_info p-4">
                        <div className="d-flex align-items-center mb-2">

                            <h5 className="mb-0 mr-2">Name</h5>
                            <h5 className="mb-0 mr-2">Surname</h5>

                        </div>
                        <div className="d-flex justify-content-between align-items-end">
                            <div className="hotel-card_details">

                                <div className="text-muted mb-2">
                                    <i className="fas fa-phone"></i> 57841073
                                </div>

                                <div className="mb-2 mt-3">
                                    <span className="badge badge-primary">gmatta (username)</span>

                                </div>
                                <div className="mb-2">
                                    <span className="badge badge-secondary">gmatta-2021223@kinal.edu.gt</span>

                                </div>

                                <div className="mb-2">
                                    <span className="badge badge-success">ADMIN</span>

                                </div>



                            </div>


                        </div>
                        <Link to='/dashboard/updateUser'>
                            <button className="btn btn-warning me-1 ms-1 mt-4">Update User</button>
                        </Link>
                        <Link>
                            <button className="btn btn-danger me-1 ms-1 mt-4">Delete User</button>
                        </Link>

                        {/* <button className="btn btn-primary ms-1 me-1 mt-4">Check Rooms</button>
                            <button className="btn btn-warning me-1 ms-1 mt-4">Update Hotel</button>
                            <button className="btn btn-danger ms-1 mt-4">Delete Hotel</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
