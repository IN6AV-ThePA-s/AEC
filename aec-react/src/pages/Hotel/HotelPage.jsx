import React from 'react'
import './styleHotelPage.css'
import foto from '../../assets/foto.png'
import { Link } from 'react-router-dom'
import hotel1 from '../../assets/hotel1.jpg'
import hotel2 from '../../assets/hotel2.jpg'
import hotel3 from '../../assets/hotel3.jpg'
import { ModalService } from '../../components/ModalService'


export const HotelPage = () => {
    return (
        <div className="container">

            <div className='row justify-content-start mb-3'>

                <div className='col-md-5'>

                    <select name="state" className='form-select'>

                        <option value={null}>FILTER</option>

                    </select>

                </div>

                <div className='col-md-7'>

                    <input type="text" placeholder='Search' className='form-control' />

                </div>


            </div>

            <div className="row justify-content-center border border-dark">

                <h1 className="titlesHotelPage mt-2">Hotel Casa del Parque</h1>
                <h5 className="textNormalHotel">Antigua Guatemala, Guatemala</h5>


                <div id="carouselExampleControls" className="carousel slide mb-3 mt-4" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={hotel1} className="d-block w-100" style={{ height: '30rem' }} />
                        </div>
                        <div className="carousel-item">
                            <img src={hotel2} className="d-block w-100" style={{ height: '30rem' }} />
                        </div>
                        <div className="carousel-item">
                            <img src={hotel3} className="d-block w-100" style={{ height: '30rem' }} />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                <div className='col-md-12 border-top border-dark'>
                    <div className="d-flex flex-column text-center p-3 ">
                        <h1 className="titlesHotelPage font-weight-bold mb-4">Information</h1>
                        <ul className='listInformationHotel textNormalHotel'>
                            <li><b>Nombre:</b> Gerson Matta</li>
                            <li><b>Dirección:</b> 4th Ave Norte # 5 Antigua Guatemala, 03001</li>
                            <li><b>Telefono:</b> 7832 0961</li>
                            <li><b>Email:</b> hotelcasadelparque@gmail.com</li>

                        </ul>
                    </div>
                    <div className='text-center mb-3'>
                        <button className="btn btn-warning bi bi-pencil me-1" type="button" > Update</button>
                        <button className="btn btn-danger bi bi-trash ms-1" type="button" > Delete</button>
                    </div>
                </div>



                

                <div className="col-md-7 border-start border-top border-dark">
                    <div className="p-3 py-5">

                        <div className="d-flex mb-3">
                            <h1 className="titleProfile fs-2 me-1">Q443 GTQ </h1> <p className='textNight'> night</p>
                        </div>

                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="labels">Check-In</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label className="labels">Check-Out</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-md-12 mt-3">
                                <label className="labels">Guests</label>
                                <input type="text" className="form-control" />
                            </div>

                        </div>

                        <div className="text-center mt-3">

                            <button className="btn btn-primary ms-1 ps-5 pe-5 fs-5" type="button">Reserve</button>

                        </div>

                    </div>

                </div>

                <ModalService/>
                
                <div className='col-md-12 border-top border-dark'>
                    <div className="d-flex flex-column text-center p-3 ">
                        <h1 className="titlesHotelPage font-weight-bold mb-4">Rooms</h1>
                        <table className="table align-middle mb-0 bg-white textNormalHotel">
                            <thead className="bg-light">
                                <tr>
                                    <th>Code</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Price</th>
                                    <th>Beds</th>
                                    <th>Services</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>

                                    <td><p className="fw-bold mb-1">A022</p></td>
                                    <td><p className="fw-normal mb-1">Suite</p></td>
                                    <td><span className="badge rounded-pill text-bg-success">Avaliable</span></td>
                                    <td>443</td>
                                    <td>3</td>
                                    <td>
                                        <button className="btn btn-warning bi bi-pencil me-1" type="button" data-bs-toggle='modal' data-bs-target='#serviceModal'> Services</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-warning bi bi-pencil me-1" type="button"> Update</button>
                                        <button className="btn btn-danger bi bi-trash ms-1" type="button"> Delete</button>
                                    </td>

                                </tr>

                                <tr>

                                    <td><p className="fw-bold mb-1">A022</p></td>
                                    <td><p className="fw-normal mb-1">Suite</p></td>
                                    <td><span className="badge rounded-pill text-bg-success">Avaliable</span></td>
                                    <td>443</td>
                                    <td>3</td>
                                    <td>
                                        <button className="btn btn-warning bi bi-pencil me-1" type="button"> Update</button>
                                        <button className="btn btn-danger bi bi-trash ms-1" type="button"> Delete</button>
                                    </td>

                                </tr>

                                <tr>

                                    <td><p className="fw-bold mb-1">A022</p></td>
                                    <td><p className="fw-normal mb-1">Suite</p></td>
                                    <td><span className="badge rounded-pill text-bg-warning">Unavailable</span></td>
                                    <td>443</td>
                                    <td>3</td>
                                    <td>
                                        <button className="btn btn-warning bi bi-pencil me-1" type="button"> Update</button>
                                        <button className="btn btn-danger bi bi-trash ms-1" type="button"> Delete</button>
                                    </td>

                                </tr>

                                <tr>

                                    <td><p className="fw-bold mb-1">A022</p></td>
                                    <td><p className="fw-normal mb-1">Suite</p></td>
                                    <td><span className="badge rounded-pill text-bg-success">Avaliable</span></td>
                                    <td>443</td>
                                    <td>3</td>
                                    <td>
                                        <button className="btn btn-warning bi bi-pencil me-1" type="button"> Update</button>
                                        <button className="btn btn-danger bi bi-trash ms-1" type="button"> Delete</button>
                                    </td>

                                </tr>

                                <tr>

                                    <td><p className="fw-bold mb-1">A022</p></td>
                                    <td><p className="fw-normal mb-1">Suite</p></td>
                                    <td><span className="badge rounded-pill text-bg-success">Avaliable</span></td>
                                    <td>443</td>
                                    <td>3</td>
                                    <td>
                                        <button className="btn btn-warning bi bi-pencil me-1" type="button"> Update</button>
                                        <button className="btn btn-danger bi bi-trash ms-1" type="button"> Delete</button>
                                    </td>

                                </tr>

                            </tbody>
                        </table>
                        
                    </div>

                    <div className='text-center'>
                    <button className="btn btn-success mb-3" type="button">Add Room</button>
                    </div>
                    
                </div>


            </div>

        

        </div>
    )
}
