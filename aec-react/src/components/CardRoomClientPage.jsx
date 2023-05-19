import React from 'react'
import { Link } from 'react-router-dom'

export const CardRoomClientPage = ({ _id, code, status, type, price, beds, photos, i, butRoom, butUpda, butSerRoom, butGetRoom }) => {
    return (

        <div className="hotel-card bg-white rounded-lg shadow overflow-hidden d-block d-lg-flex mt-2 mb-1">

            <div className="hotel-card_images">

                <div id={`bootstrapCarousel${i}`} className="carousel slide" data-ride="carousel"  style={{height:'324px', width:'487px'}} >
                    <div className="carousel-inner h-100">

                        {
                            photos?.map((name, index) => {
                                return (
                                    <div key={index} className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}>
                                        <img crossOrigin='anonymous' src={`http://localhost:3022/room/get-img/${name}`} className="d-block w-100" alt="Hotel Image" />
                                    </div>
                                )
                            })
                        }

                    </div>
                    <a className="carousel-control-prev" href={`#bootstrapCarousel${i}`} role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href={`#bootstrapCarousel${i}`} role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
            <div className="hotel-card_info p-4">
                <div className="d-flex align-items-center mb-2">

                    <h5 className="mb-0 mr-2">{code}</h5>

                </div>
                <div className="d-flex justify-content-between align-items-end">
                    <div className="hotel-card_details">
                        <div className="text-muted mb-2"><i className="fas fa-bed"></i> Beds: ({`Type: ${beds?.name}, Amount: ${beds?.cant}, Capacity: ${beds?.capacity} ${beds?.capacity > 1 ? 'persons' : 'person'}`})</div>

                        <div className='d-flex'>
                            <div className="mb-2 me-1">
                                <span className={`badge ${status == 'BUSY' ? 'badge-warning' : 'badge-success'}`}>{status}</span>

                            </div>
                            <div className="mb-2 ms-1">
                                <span className="badge badge-secondary">{type?.toUpperCase()}</span>

                            </div>
                        </div>
                        <div className="amnities d-flex mb-3 mt-3">
                            <Link>
                                <button className="btn btn-primary me-1 mt-4 bi bi-list" data-bs-toggle="modal" data-bs-target={`#modalCheckServices${_id}`}> Check Services</button>
                            </Link>
                            <Link>
                                <button className="btn btn-success me-1 mt-4 bi bi-card-checklist" data-bs-toggle="modal" /* data-bs-target={`#modalCheckServices${_id}`} onClick={(e)=> { e.preventDefault(); butGetRoom()}} */> Make reservation</button>
                            </Link>
                            
                        </div>
                        
                    </div>
                    <div className="hotel-card_pricing text-center">
                        <h3>{`${new Intl.NumberFormat('es-GT', { style: 'currency', currency: 'GTQ' }).format(price)}`}</h3>

                    </div>

                </div>

                
            </div>
        </div>

    )
}
