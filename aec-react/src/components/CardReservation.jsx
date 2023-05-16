import React from 'react'
import { Link } from 'react-router-dom'

export const CardReservation = () => {
    return (
        <div className="card">
            <div className="row g-0">
                <div className="">
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-md-4'>
                                <h4 className='text-center'>No. Reservation</h4>
                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                            </div>
                            <div className='col-md-8'>
                                <h4 className='text-center'>Client</h4>
                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                            </div>

                        </div>

                        <div className='row mt-2'>
                            <div className='col-md-4'>
                                <h4 className='text-center'>Room</h4>
                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                            </div>
                            <div className='col-md-4'>
                                <h4 className='text-center'>No. People</h4>
                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                            </div>
                            <div className='col-md-4'>
                                <h4 className='text-center'>No. Nights</h4>
                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                            </div>
                        </div>

                        <div className='row mt-2'>
                            <div className='col-md-6'>
                                <h4 className='text-center'>Additionals Services</h4>
                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                            </div>
                            <div className='col-md-6'>
                                <h4 className='text-center'>Events</h4>
                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className='col-md-3'>
                                <h4 className='text-center'>Status</h4>
                                <select name="state" className='form-select' style={{ background: 'transparent' }} disabled>

                                    <option value={null}>PROGRESS</option>
                                    <option value={null}>COMPLETED</option>

                                </select>
                            </div>
                            <div className='col-md-9'>
                                <h4 className='text-center'>Total</h4>
                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                            </div>
                        </div>

                        <div className='mt-3'>
                            <Link to='/dashboard/updateReservation'>
                                <button className="btn btn-warning bi bi-pencil me-1" type="button"> Update</button>
                            </Link>
                            <Link>
                                <button className="btn btn-danger bi bi-trash ms-1" type="button"> Delete</button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
