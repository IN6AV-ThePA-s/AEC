import React from 'react'
import { Link } from 'react-router-dom'

export const UpdateEvent = () => {
    return (
        <>

            <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white ms-2 me-4'>
                <h1 className='h1TE text-center'>Update Event</h1>
            </div>

            <hr />

            <div className="row justify-content-center "> {/* ms-4 me-4 mb-4 */}

                <div className="col-md-8">
                    <div className="">

                        <div className="row">

                            <div className="col-md-12 mt-3">
                                <label className="labels">Name</label>
                                <input type="text" className="form-control" />
                            </div>

                            <div className="col-md-12 mt-3">
                                <label className="labels">Type</label>
                                <input type="text" className="form-control" />
                            </div>

                            <div className="col-md-12 mt-3">
                                <label className="labels">Capacity</label>
                                <input type="text" className="form-control" />
                            </div>

                            <div className="col-md-12 mt-3">
                                <label className="labels">Price</label>
                                <input type="text" className="form-control" />
                            </div>

                        </div>

                        <div className="text-center mt-3">

                            <button className="btn btn-success me-1" type="button">Add Event</button>

                            <Link to='/dashboard/eventsPage'>
                                <button className="btn btn-danger ms-1" type="button">Cancel</button>
                            </Link>
                           
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
