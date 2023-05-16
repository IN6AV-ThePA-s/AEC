import React from 'react'
import { Link } from 'react-router-dom'

export const UpdateBillPage = () => {
    return (
        <div className="main-content">
            <div className="container">

                <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white'>

                    <h1 className='h1TE text-center'>Update Bill</h1>

                </div>

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

                <div className="row justify-content-center mt-4">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                            <div className="hotel-card_info p-4">

                                <div className=" align-items-center">

                                    <div className="d-flex flex-column text-center p-3">

                                        <div className="card">
                                            <div className="row g-0">
                                                <div className="">
                                                    <div className="card-body">
                                                        <div className='row'>
                                                            <div className='col-md-6'>
                                                                <h4 className='text-center'>No. Bill</h4>
                                                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }}  />
                                                            </div>
                                                            <div className='col-md-6'>
                                                                <h4 className='text-center'>Reservation</h4>
                                                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }}  />
                                                            </div>

                                                        </div>

                                                        <div className='mt-3'>
                                                            <Link>
                                                                <button className="btn btn-warning bi bi-pencil me-1" type="button"> Update</button>
                                                            </Link>
                                                            <Link>
                                                                <button className="btn btn-danger ms-1" type="button"> Cancel</button>
                                                            </Link>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

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