import React from 'react'
import { CardReservation } from '../../components/CardReservation'
import { Link } from 'react-router-dom'

export const AddReservationPage = () => {
    return (
        <div className="main-content">
            <div className="container">

                <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white'>

                    <h1 className='h1TE text-center'>Add Reservation</h1>

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
                                                            <div className='col-md-4'>
                                                                <h4 className='text-center'>No. Reservation</h4>
                                                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }}  />
                                                            </div>
                                                            <div className='col-md-8'>
                                                                <h4 className='text-center'>Client</h4>
                                                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }}  />
                                                            </div>

                                                        </div>

                                                        <div className='row mt-2'>
                                                            <div className='col-md-4'>
                                                                <h4 className='text-center'>Room</h4>
                                                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }}  />
                                                            </div>
                                                            <div className='col-md-4'>
                                                                <h4 className='text-center'>No. People</h4>
                                                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }}  />
                                                            </div>
                                                            <div className='col-md-4'>
                                                                <h4 className='text-center'>No. Nights</h4>
                                                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }}  />
                                                            </div>
                                                        </div>

                                                        <div className='row mt-2'>
                                                            <div className='col-md-6'>
                                                                <h4 className='text-center'>Additionals Services</h4>
                                                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }}  />
                                                            </div>
                                                            <div className='col-md-6'>
                                                                <h4 className='text-center'>Events</h4>
                                                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }}  />
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-md-3'>
                                                                <h4 className='text-center'>Status</h4>
                                                                <select name="state" className='form-select' style={{ background: 'transparent' }}>

                                                                    <option value={null}>PROGRESS</option>
                                                                    <option value={null}>COMPLETED</option>

                                                                </select>
                                                            </div>
                                                            <div className='col-md-9'>
                                                                <h4 className='text-center'>Total</h4>
                                                                <input type="text" placeholder='Name' className='form-control textNormalHotel'/>
                                                            </div>

                                                        </div>

                                                        <button className="btn btn-success me-1 mt-4">Add Reservation</button>
                                                        <button className="btn btn-danger me-1 mt-4">Cancel</button>

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