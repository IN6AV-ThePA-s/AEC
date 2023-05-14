import React from 'react'
import '../pages/Hotel/styleModalUpdateRoom.css'

export const ModalUpdateRoom = () => {
    return (
        <div className="modal fade" id="modalUpdateRoom" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Update Room</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h5 className="form-label">Code</h5>
                        <input type="text" className="form-control" />

                        <h5 className="form-label mt-2">Status</h5>
                        <select className="form-control" id="inputUser" name='user' >

                            <option value={null}>AVALIABLE</option>
                            <option value={null}>BUSY</option>

                        </select>

                        <h5 className="form-label mt-2">Price</h5>
                        <input type="number" className="form-control" />
                        <div className='row'>
                            <h5 className="form-label mt-2">Beds</h5>
                            <div className='col-md-4'>
                                <h6 className="form-label ">Name</h6>
                                <input type="text" className="form-control" />
                            </div>
                            <div className='col-md-4'>
                                <h6 className="form-label ">Amount</h6>
                                <input type="text" className="form-control" />
                            </div>
                            <div className='col-md-4'>
                                <h6 className="form-label ">Capacity</h6>
                                <input type="text" className="form-control" />
                            </div>

                        </div>

                        <h5 className="form-label mt-2">Photos</h5>
                        <input type="file" className="form-control" />
                        <input type="file" className="form-control mt-1" />
                        <input type="file" className="form-control mt-1" />

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Update Room</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
