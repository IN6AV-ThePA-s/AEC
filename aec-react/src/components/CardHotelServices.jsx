import React from 'react'
import { Link } from 'react-router-dom'

export const CardHotelServices = () => {
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="">
                    <div className="card-body">

                        <div className='row'>
                            <div className='col-md-7'>
                                <h4 className='text-center'>Name</h4>
                                <input type="text" placeholder='Name' className='form-control textNormalHotel' />
                            </div>
                            <div className='col-md-5'>
                                <h4 className='text-center'>Price</h4>
                                <input type="number" placeholder='Price' className='form-control textNormalHotel' />
                            </div>

                        </div>

                        <div>
                            <h4 className='text-center mt-3'>Description</h4>
                            <textarea className="form-control textNormalHotel" aria-label="With textarea"></textarea>
                        </div>

                        <div className='mt-3'>
                            <Link>
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
