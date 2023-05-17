import React from 'react'
import { Link } from 'react-router-dom'

export const Card = ({ index, id, name, descripion, photos }) => {
    return (
        <div className="card ms-4 mt-2 shadow p-3 mb-5 bg-body rounded" style={{ width: '18rem' }}>
            <div id={`carouselExampleDark${index}`} className="carousel carousel-dark slide" data-bs-ride="carousel">
                <div className='rounded  d-flex justify-content-between '>
                    <div className="carousel-inner rounded " style={{ maxHeight: '18rem', maxWidth: '18rem' }} >

                        {
                            photos?.map((name, index) => {
                                return (
                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="3000">
                                        <img crossOrigin='anonymous' src={`http://localhost:3022/hotel/get-img/${name}`} className="d-block" style={{height: '173px', width: '254px'}}/>
                                        <div className="carousel-caption d-none d-md-block">
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{descripion}</p>
                <Link to={'/login'}>
                    <button className="btn me-md-2" type="button" style={{
                        backgroundColor: '#82BDCD',
                        borderRadius: '30px'
                    }}>
                        <i className="fa-solid fa-info text-light"></i>
                    </button>
                </Link>
            </div>
        </div >
    )
}
