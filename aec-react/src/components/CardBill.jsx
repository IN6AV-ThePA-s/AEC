import React from 'react'
import { Link } from 'react-router-dom'

export const CardBill = () => {
    return (
        <div className="card">
            <div className="row g-0">
                <div className="">
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-md-6'>
                                <h4 className='text-center'>No. Bill</h4>
                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                            </div>
                            <div className='col-md-6'>
                                <h4 className='text-center'>Reservation</h4>
                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                            </div>

                        </div>

                        <div className='mt-3'>
                            <Link to='/dashboard/updateBill'>
                                <button className="btn btn-warning bi bi-pencil me-1" type="button"> Update</button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
