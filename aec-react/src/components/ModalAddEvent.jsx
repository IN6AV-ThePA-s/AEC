import React from 'react'
import { Link } from 'react-router-dom'

export const ModalAddEvent = () => {
    return (
        <div className="modal fade" id="modalAddEvent" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Add Event</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <div className='row'>
                            <div className='col-md-7'>
                                <h4 className='text-center'>Name</h4>
                                <input type="text" placeholder='Name' className='form-control textNormalHotel' />
                            </div>
                            <div className='col-md-5'>
                                <h4 className='text-center'>Type</h4>
                                <input type="text" placeholder='Name' className='form-control textNormalHotel' />
                            </div>

                        </div>

                        <div className='row mt-2'>
                            <div className='col-md-8'>
                                <h4 className='text-center'>Capacity Persons</h4>
                                <input type="text" placeholder='Name' className='form-control textNormalHotel' />
                            </div>
                            <div className='col-md-4'>
                                <h4 className='text-center'>Price</h4>
                                <input type="text" placeholder='Name' className='form-control textNormalHotel' />
                            </div>
                        </div>

                        <div className='mt-2'>
                            <h4 className='text-center'>Description</h4>
                            <textarea className="form-control textNormalHotel" placeholder='Description' aria-label="With textarea"></textarea>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal">Add Event</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
