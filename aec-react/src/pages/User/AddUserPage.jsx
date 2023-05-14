import React from 'react'

export const AddUserPage = () => {
    return (
        <div className="main-content">
            <div className="container">

                <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white mb-4'>

                    <h1 className='h1TE text-center'>Add User</h1>

                </div>

                <div className="row justify-content-center">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                            <div className="hotel-card_info p-4">
                                <h1 className='text-center'>User Information</h1>

                                <div className=" align-items-center mb-2">

                                    <h5 className="mr-2 mt-3">Name</h5>
                                    <input type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Surname</h5>
                                    <input type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Phone</h5>
                                    <input type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Email</h5>
                                    <input type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Username</h5>
                                    <input type="text" className="form-control" />

                                    <h5 className="mr-2 mt-3">Password</h5>
                                    <input type="password" className="form-control" />

                                    <h5 className=" mr-2 mt-3">Role</h5>
                                    <select name="state" className='form-select'>

                                        <option value={null}>ADMIN</option>
                                        <option value={null}>CLIENT</option>

                                    </select>

                                    <h5 className="mr-2 mt-3">Photo</h5>
                                    <input type="file" className="form-control" />




                                </div>

                                <button className="btn btn-success me-1 mt-4">Add User</button>
                                <button className="btn btn-danger me-1 mt-4">Cancel</button>

                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}
