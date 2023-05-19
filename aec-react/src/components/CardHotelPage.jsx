import React, { useContext, useEffect, useState } from 'react'
import '../pages/Hotel/styleCardHotelPage.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../index'

export const CardHotelPage = ({ _id, index, name, address, email, phone, photos }) => {
    const { dataUser } = useContext(AuthContext)
    const [route, setRoute] = useState(`dashboard`)

    useEffect(() => {
      if(dataUser.role === 'CLIENT'){
        setRoute(`home`)
      }
    }, [])
    
    
    return (
        <>

            <div className="row justify-content-center mt-2 mb-1">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                        <div className="hotel-card_images">
                            <div id={`bootstrapCarousel${index}`} className="carousel slide" data-ride="carousel" style={{height:'324px', width:'487px'}}>
                                <div className="carousel-inner h-100">

                                    {
                                        photos?.map((name, index) => {
                                            return (

                                                <div key={index} className={`carousel-item h-100 ${index === 0 ? 'active':''}`}>
                                                    <img crossOrigin='anonymous' src={`http://localhost:3022/hotel/get-img/${name}`} className="d-block w-100" alt="Hotel Image" />
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                                <a className="carousel-control-prev" href={`#bootstrapCarousel${index}`} role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href={`#bootstrapCarousel${index}`} role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                        <div className="hotel-card_info p-4">
                            <div className="d-flex align-items-center mb-2">
                                <h5 className="mb-0 mr-2">{name}</h5>
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
                                        <i className="fas fa-map-marker-alt"></i> {address}
                                    </div>

                                    <div className="mb-2 mt-3">
                                        <span className="badge badge-primary">{phone}</span>

                                    </div>
                                    <div className="mb-2">
                                        <span className="badge badge-secondary">{email}</span>

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
                            <Link to={`/${route}/checkHotel/${_id}`}>
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
