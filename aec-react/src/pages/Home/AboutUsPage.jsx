import React from 'react'
import { NavbarHome } from '../../components/NavbarHome.jsx'
import './homeStyle.css'

export const AboutUsPage = () => {
    return (
        <div className="text-center" >
            <div className='d-flex mx-5 py-2 flex-column text-center conLogin'>

                <NavbarHome />
            </div>
            {<div className="p-5 bg-image" style={{
                height: '250px',
                backgroundImage: `url('https://img.freepik.com/free-photo/fantastic-blue-sky_1203-1929.jpg?w=996&t=st=1683838238~exp=1683838838~hmac=488e0f00855dd85560dee7eaa798f29a16699300c15d4e3f4e9edcad98586d8c')`,
                backgroundSize: 'cover'

            }} >
            </div>}

            <div className="card mx-4 mx-md-5 shadow-5-strong" style={{
                marginTop: '-175px',
                background: `transparent`,
                backdropFilter: `blur(30px)`,
                border: 'none'
            }}>
                <div className="card-body py-5 px-md-5">

                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8">
                            <h2 className="fw-bold mb-5">About Us</h2>
                            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                                <div className='rounded  d-flex justify-content-between '>
                                    <div className="carousel-inner rounded " style={{ maxHeight: '40rem', maxWidth: '40rem' }} >
                                        <div className="carousel-item active" data-bs-interval="100">
                                            <img src="https://a0.muscache.com/im/pictures/miso/Hosting-53588636/original/5390aba5-3036-4485-82fd-9c2e862b0592.jpeg?im_w=1200" className="d-block w-100" />
                                            <div className="carousel-caption d-none d-md-block">
                                            </div>
                                        </div>
                                        <div className="carousel-item" data-bs-interval="100">
                                            <img src="https://a0.muscache.com/im/pictures/miso/Hosting-53588636/original/7dc0166f-b740-4cd7-9ca9-81f3d3bd6fb5.jpeg?im_w=720" className="d-block w-100" />
                                            <div className="carousel-caption d-none d-md-block">
                                            </div>
                                        </div>
                                        <div className="carousel-item" data-bs-interval="100">
                                            <img src="https://a0.muscache.com/im/pictures/miso/Hosting-53588636/original/86da4972-ed9e-4b26-9740-c41ebe412768.jpeg?im_w=720" className="d-block w-100" />
                                            <div className="carousel-caption d-none d-md-block">
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                    <div className='rounded' style={{ 
                                        backgroundColor: 'rgba(184, 172, 172, 0.5)',
                    
                                        }}>
                                        <h1>dcbgbn</h1>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
