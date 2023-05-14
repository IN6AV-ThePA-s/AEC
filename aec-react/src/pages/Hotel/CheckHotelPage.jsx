import React from 'react'
import hotel1 from '../../assets/hotel1.jpg'
import hotel2 from '../../assets/hotel2.jpg'
import hotel3 from '../../assets/hotel3.jpg'
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
            </div>
        </div>




    )
}
