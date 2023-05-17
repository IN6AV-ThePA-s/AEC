import React from 'react'
import user from '../assets/user.jpg'
import { Link } from 'react-router-dom'
import photoError from '../assets/userDefault.png'

export const CardUserPage = ({ name, surname, username, photo, phone, email, id, role, butDel }) => {

    const handleImageError = (e) => {
        e.target.src = photoError;
    };

    return (
        <div className="row justify-content-center mt-2">
            <div className="col-sm-9 col-md-9 col-lg-9">
                <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                    <div className="hotel-card_images">
                        <div id="bootstrapCarousel" className="carousel  h-100" data-ride="carousel">
                            <div className="carousel-inner h-100">
                                <div className="carousel-item h-100 active">
                                    <img crossOrigin="anonymous"
                                        src={photo || photoError}
                                        className="d-block w-100"
                                        alt="User Image"
                                        onError={handleImageError} />
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="hotel-card_info p-4">
                        <div className="d-flex align-items-center mb-2">

                            <h5 className="mb-0 mr-2">{name}</h5>
                            <h5 className="mb-0 mr-2">{surname}</h5>

                        </div>
                        <div className="d-flex justify-content-between align-items-end">
                            <div className="hotel-card_details">

                                <div className="text-muted mb-2">
                                    <i className="fas fa-phone"></i> {phone}
                                </div>

                                <div className="mb-2 mt-3">
                                    <span className="badge badge-primary">{username} (username)</span>

                                </div>
                                <div className="mb-2">
                                    <span className="badge badge-secondary">{email}</span>

                                </div>

                                <div className="mb-2">
                                    <span className="badge badge-success">{role}</span>

                                </div>



                            </div>


                        </div>
                        <Link to={`/dashboard/updateUser/${id}`}>
                            <button className="btn btn-warning me-1 ms-1 mt-4">Update User</button>
                        </Link>

                        <button onClick={(e) => { e.preventDefault(), butDel() }} className="btn btn-danger me-1 ms-1 mt-4">Delete User</button>

                    </div>
                </div>
            </div>
        </div>
    )
}
