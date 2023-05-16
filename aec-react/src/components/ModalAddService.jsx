import React from 'react'
import { Link } from 'react-router-dom'

export const ModalAddService = () => {
    return (
        <div className="modal fade" id="modalAddService" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Add Service</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="">
                                    <div className="card-body">

                                        <div className='row'>
                                            <div className='col-md-7'>
                                                <h5 className='text-center'>Name</h5>
                                                <input type="text" placeholder='Name' className='form-control textNormalHotel' />
                                            </div>
                                            <div className='col-md-5'>
                                                <h5 className='text-center'>Price</h5>
                                                <input type="number" placeholder='Price' className='form-control textNormalHotel' />
                                            </div>

                                        </div>

                                        <div>
                                            <h5 className='text-center mt-3'>Description</h5>
                                            <textarea className="form-control textNormalHotel" placeholder='Description' aria-label="With textarea"></textarea>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal">Add Service</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
