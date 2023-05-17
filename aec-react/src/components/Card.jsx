import React from 'react'
import { Link } from 'react-router-dom'

export const Card = ({ index }) => {
    return (
        <div className="card ms-4 mt-2 shadow p-3 mb-5 bg-body rounded" style={{ width: '18rem' }}>
            <div id={`carouselExampleDark${index}`} className="carousel carousel-dark slide" data-bs-ride="carousel">
                <div className='rounded  d-flex justify-content-between '>
                    <div className="carousel-inner rounded " style={{ maxHeight: '18rem', maxWidth: '18rem' }} >
                        <div className="carousel-item active" data-bs-interval="3000">
                            <img src="https://a0.muscache.com/im/pictures/miso/Hosting-53588636/original/5390aba5-3036-4485-82fd-9c2e862b0592.jpeg?im_w=1200" className="d-block w-100" />
                            <div className="carousel-caption d-none d-md-block">
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="3000">
                            <img src="https://a0.muscache.com/im/pictures/miso/Hosting-53588636/original/7dc0166f-b740-4cd7-9ca9-81f3d3bd6fb5.jpeg?im_w=720" className="d-block w-100" />
                            <div className="carousel-caption d-none d-md-block">
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="3000">
                            <img src="https://a0.muscache.com/im/pictures/miso/Hosting-53588636/original/86da4972-ed9e-4b26-9740-c41ebe412768.jpeg?im_w=720" className="d-block w-100" />
                            <div className="carousel-caption d-none d-md-block">
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">nombre</h5>
                <p className="card-text">description</p>
                <Link to={'/login'}>
                    <button className="btn me-md-2" type="button" style={{ backgroundColor: '#82BDCD' ,
                    borderRadius: '30px'                
                }}>
                        <i className="fa-solid fa-info text-light"></i>
                    </button>
                </Link>
            </div>
        </div >
    )
}
