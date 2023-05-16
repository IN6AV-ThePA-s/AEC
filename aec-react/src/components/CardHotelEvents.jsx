import React from 'react'
import { Link } from 'react-router-dom'

export const CardHotelEvents = ({ name, description, type, maxPersons, price, hotel, butDelete, butEdit }) => {
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="">
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-md-7'>
                                <h4 className='text-center'>Name</h4>
                                <input type="text" defaultValue={name} className='form-control textNormalHotel' />
                            </div>
                            <div className='col-md-5'>
                                <h4 className='text-center'>Type</h4>
                                <input type="text" defaultValue={type} className='form-control textNormalHotel' />
                            </div>

                        </div>

                        <div className='row mt-2'>
                            <div className='col-md-8'>
                                <h4 className='text-center'>Capacity Persons</h4>
                                <input type="text" defaultValue={maxPersons} className='form-control textNormalHotel' />
                            </div>
                            <div className='col-md-4'>
                                <h4 className='text-center'>Price</h4>
                                <input type="text" defaultValue={price} className='form-control textNormalHotel' />
                            </div>
                        </div>

                        <div className='mt-2'>
                            <h4 className='text-center'>Description</h4>
                            <textarea className="form-control textNormalHotel" defaultValue={description} aria-label="With textarea"></textarea>
                        </div>

                        <div className='mt-3'>
                            <Link>
                                <button className="btn btn-warning bi bi-pencil me-1" type="button"> Update</button>
                            </Link>
                            <Link>
                                <button className="btn btn-danger bi bi-trash ms-1" type="button" onClick={(e) => { e.preventDefault(); butDelete() }}> Delete</button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
