import React from 'react'

export const UpdateUserPage = () => {
    return (
        <div className="main-content">
            <div className="container">

                <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white mb-4'>

                    <h1 className='h1TE text-center'>Update User</h1>

                </div>

                <div className="row justify-content-center">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                            <div className="hotel-card_info p-4">
                                <h1 className='text-center'>User Information</h1>

                                <div className=" align-items-center mb-2">

                                    <h5 className=" mr-2">Name</h5>
                                    <input type="text" className="form-control" />

                                    <h5 className=" mr-2">Surname</h5>
                                    <input type="text" className="form-control" />

                                    <h5 className=" mr-2">Phone</h5>
                                    <input type="text" className="form-control" />

                                    <h5 className=" mr-2">Email</h5>
                                    <input type="text" className="form-control" />

                                    <h5 className=" mr-2">Username</h5>
                                    <input type="text" className="form-control" />

                                    <h5 className=" mr-2">Password</h5>
                                    <input type="password" className="form-control" />

                                    <h5 className=" mr-2">Role</h5>
                                    <select name="state" className='form-select'>

                                        <option value={null}>ADMIN</option>
                                        <option value={null}>CLIENT</option>

                                    </select>

                                    <h5 className=" mr-2">Photo</h5>
                                    <input type="file" className="form-control" />




                                </div>

                                <button className="btn btn-primary me-1 mt-4">Save Changes</button>
                                <button className="btn btn-danger me-1 mt-4">Cancel</button>

                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}
