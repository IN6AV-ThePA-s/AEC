import React from 'react'
import hotel1 from '../../assets/hotel1.jpg'
import hotel2 from '../../assets/hotel2.jpg'
import hotel3 from '../../assets/hotel3.jpg'
import room1 from '../../assets/room1.jpg'
import room2 from '../../assets/room2.jpg'
import room3 from '../../assets/room3.jpg'
import '../../pages/Hotel/styleCardHotelPage.css'
import { Link } from 'react-router-dom'

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

                                    <h5 className=" mr-2">Name</h5>
                                    <input type="text" className="form-control" />

                                    <h5 className=" mr-2">Address</h5>
                                    <input type="text" className="form-control" />

                                    <h5 className=" mr-2">Phone</h5>
                                    <input type="text" className="form-control" />

                                    <h5 className=" mr-2">Email</h5>
                                    <input type="text" className="form-control" />

                                    <h5 className=" mr-2">Photos</h5>
                                    <div className='d-flex'>

                                        <input type="file" className="form-control" />
                                        <input type="file" className="form-control ms-1" />
                                        <input type="file" className="form-control ms-1" />
                                    </div>


                                </div>

                                <button className="btn btn-warning me-1 mt-4">Update Hotel</button>
                                <button className="btn btn-danger me-1 mt-4">Delete Hotel</button>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-4">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                            <div className="hotel-card_info p-4">
                                <h1 className='text-center'>Services</h1>

                                <div className=" align-items-center mb-2">

                                    <div className="d-flex flex-column text-center p-3">


                                        <div className="card mb-3">
                                            <div className="row g-0">
                                                <div className="">
                                                    <div className="card-body">
                                                        <h3 className='text-center'>Name</h3>
                                                        <h4 className='text-center'>Price</h4>
                                                        <p className="card-text textNormalHotel">Descripcion de lo que trata el servicio asd asdas dasdas</p>
                                                        <button className="btn btn-warning bi bi-pencil me-1" type="button"> Update</button>
                                                        <button className="btn btn-danger bi bi-trash ms-1" type="button"> Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card mb-3">
                                            <div className="row g-0">
                                                <div className="">
                                                    <div className="card-body">
                                                        <h3 className='text-center'>Name</h3>
                                                        <h4 className='text-center'>Price</h4>
                                                        <p className="card-text textNormalHotel">Descripcion de lo que trata el servicio asd asdas dasdas</p>
                                                        <button className="btn btn-warning bi bi-pencil me-1" type="button"> Update</button>
                                                        <button className="btn btn-danger bi bi-trash ms-1" type="button"> Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-success me-1" type="button">Add Service</button>
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


                                        <div className="card mb-3">
                                            <div className="row g-0">
                                                <div className="">
                                                    <div className="card-body">
                                                        <h3 className='text-center'>Name</h3>
                                                        <h5 className='text-center'>Type</h5>
                                                        <h5 className='text-center'>Capacity Persons</h5>
                                                        <h5 className='text-center'>Price</h5>
                                                        <p className="card-text textNormalHotel">Descripcion de lo que trata el evento asd asdas dasdas</p>
                                                        <button className="btn btn-warning bi bi-pencil me-1" type="button"> Update</button>
                                                        <button className="btn btn-danger bi bi-trash ms-1" type="button"> Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card mb-3">
                                            <div className="row g-0">
                                                <div className="">
                                                    <div className="card-body">
                                                        <h3 className='text-center'>Name</h3>
                                                        <h5 className='text-center'>Type</h5>
                                                        <h5 className='text-center'>Capacity Persons</h5>
                                                        <h5 className='text-center'>Price</h5>
                                                        <p className="card-text textNormalHotel">Descripcion de lo que trata el evento asd asdas dasdas</p>
                                                        <button className="btn btn-warning bi bi-pencil me-1" type="button"> Update</button>
                                                        <button className="btn btn-danger bi bi-trash ms-1" type="button"> Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-success me-1" type="button">Add Event</button>
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


                                        <div className="card mb-3">
                                            <div className="row g-0">
                                                <div className="">
                                                    <div className="card-body">
                                                        <h3 className='text-center'>Name</h3>
                                                        <h5 className='text-center'>Type</h5>
                                                        <h5 className='text-center'>Capacity Persons</h5>
                                                        <h5 className='text-center'>Price</h5>
                                                        <p className="card-text textNormalHotel">Descripcion de lo que trata el evento asd asdas dasdas</p>
                                                        <button className="btn btn-warning bi bi-pencil me-1" type="button"> Update</button>
                                                        <button className="btn btn-danger bi bi-trash ms-1" type="button"> Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card mb-3">
                                            <div className="row g-0">
                                                <div className="">
                                                    <div className="card-body">
                                                        <h3 className='text-center'>Name</h3>
                                                        <h5 className='text-center'>Type</h5>
                                                        <h5 className='text-center'>Capacity Persons</h5>
                                                        <h5 className='text-center'>Price</h5>
                                                        <p className="card-text textNormalHotel">Descripcion de lo que trata el evento asd asdas dasdas</p>
                                                        <button className="btn btn-warning bi bi-pencil me-1" type="button"> Update</button>
                                                        <button className="btn btn-danger bi bi-trash ms-1" type="button"> Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-success me-1" type="button">Add Event</button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mt-4">

                    <div className="col-sm-9 col-md-9 col-lg-9 mt-2">

                        <h1 className='text-center'>Rooms</h1>

                        <div className='row justify-content-start mb-4 mt-3'>

                            <div className='col-md-5'>

                                <select name="state" className='form-select'>

                                    <option value={null}>FILTER</option>

                                </select>

                            </div>

                            <div className='col-md-7'>

                                <input type="text" placeholder='Search' className='form-control' />

                            </div>


                        </div>

                        <div className="hotel-card bg-white rounded-lg shadow overflow-hidden d-block d-lg-flex">

                            <div className="hotel-card_images">

                                <div id="bootstrapCarousel" className="carousel slide h-100" data-ride="carousel">
                                    <div className="carousel-inner h-100">
                                        <div className="carousel-item h-100 active">
                                            <img src={room1} className="d-block w-100" alt="Hotel Image" />
                                        </div>
                                        <div className="carousel-item h-100">
                                            <img src={hotel1} className="d-block w-100" alt="Hotel Image" />
                                        </div>
                                        <div className="carousel-item h-100">
                                            <img src={room2} className="d-block w-100" alt="Hotel Image" />
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
                                                <span className="badge badge-success">Status</span>

                                            </div>
                                            <div className="mb-2 ms-1">
                                                <span className="badge badge-secondary">Type</span>

                                            </div>
                                        </div>

                                        
                                        <div className="amnities d-flex mb-3 mt-3">
                                            <Link>
                                                <button className="btn btn-primary me-1 mt-4">Check Services</button>
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
                                <Link>
                                    <button className="btn btn-warning me-1 mt-4">Update Room</button>
                                </Link>
                                <Link>
                                    <button className="btn btn-danger me-1 mt-4">Delete Room</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-9 col-md-9 col-lg-9 mt-2">

                        <div className="hotel-card bg-white rounded-lg shadow overflow-hidden d-block d-lg-flex">

                            <div className="hotel-card_images">

                                <div id="bootstrapCarousel" className="carousel slide h-100" data-ride="carousel">
                                    <div className="carousel-inner h-100">
                                        <div className="carousel-item h-100 active">
                                            <img src={room1} className="d-block w-100" alt="Hotel Image" />
                                        </div>
                                        <div className="carousel-item h-100">
                                            <img src={hotel1} className="d-block w-100" alt="Hotel Image" />
                                        </div>
                                        <div className="carousel-item h-100">
                                            <img src={room2} className="d-block w-100" alt="Hotel Image" />
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
                                                <span className="badge badge-success">Avaliable</span>

                                            </div>
                                            <div className="mb-2 ms-1">
                                                <span className="badge badge-secondary">Suite</span>

                                            </div>
                                        </div>

                                        <div className="amnities d-flex mb-3 mt-3">
                                            <Link>
                                                <button className="btn btn-primary me-1 mt-4">Check Services</button>
                                            </Link>
                                        </div>

                                    </div>
                                    <div className="hotel-card_pricing text-center">
                                        <h3>Q1,900</h3>
                                        {/* <div className="d-flex">
                                            <h6 className="text-striked text-muted mr-2">Q1,999</h6>
                                            <h6 className="text-success">32% off</h6>
                                        </div>
                                        <button className="btn btn-primary">Check Rooms</button> */}
                                    </div>

                                </div>
                                <Link>
                                    <button className="btn btn-warning me-1 mt-4">Update Room</button>
                                </Link>
                                <Link>
                                    <button className="btn btn-danger me-1 mt-4">Delete Room</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-9 col-md-9 col-lg-9 mt-2">

                        <div className="hotel-card bg-white rounded-lg shadow overflow-hidden d-block d-lg-flex">

                            <div className="hotel-card_images">

                                <div id="bootstrapCarousel" className="carousel slide h-100" data-ride="carousel">
                                    <div className="carousel-inner h-100">
                                        <div className="carousel-item h-100 active">
                                            <img src={room1} className="d-block w-100" alt="Hotel Image" />
                                        </div>
                                        <div className="carousel-item h-100">
                                            <img src={hotel1} className="d-block w-100" alt="Hotel Image" />
                                        </div>
                                        <div className="carousel-item h-100">
                                            <img src={room2} className="d-block w-100" alt="Hotel Image" />
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
                                                <span className="badge badge-warning">Occupied</span>

                                            </div>
                                            <div className="mb-2 ms-1">
                                                <span className="badge badge-secondary">Presidential</span>

                                            </div>
                                        </div>

                                        <div className="amnities d-flex mb-3 mt-3">
                                            <Link>
                                                <button className="btn btn-primary me-1 mt-4">Check Services</button>
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
                                <Link>
                                    <button className="btn btn-warning me-1 mt-4">Update Room</button>
                                </Link>
                                <Link>
                                    <button className="btn btn-danger me-1 mt-4">Delete Room</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>




    )
}
