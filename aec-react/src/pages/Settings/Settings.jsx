import React from 'react'
import photo from '../../assets/foto.png'
import './styleSettings.css'

export const Settings = () => {
    return (
        <div className="bodySettings container rounded bg-white">

            <div className="row justify-content-center">

                <div className="col-md-3 border-right ">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">

                        <img className="rounded-circle mt-5" width="150px" src={photo} />
                        <span className="textSUser font-weight-bold mt-1">gmatta</span>
                        <span className="textSEmail text-black-50">gmatta-2021223@kinal.edu.gt</span>

                    </div>
                </div>

                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="titleProfile text-right">Profile Settings</h4>
                        </div>

                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="labels">Names</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label className="labels">Surnames</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-md-12 mt-3">
                                <label className="labels">Phone</label>
                                <input type="text" className="form-control" />
                            </div>

                            <div className="col-md-12 mt-3">
                                <label className="labels">Email</label>
                                <input type="text" className="form-control" />
                            </div>

                        </div>

                        <div className="text-center mt-3">

                            <button className="btn btn-danger me-1" type="button">Delete Account</button>
                            <button className="btn btn-primary ms-1" type="button">Save Profile</button>

                        </div>

                    </div>

                </div>
                {/* <div className="col-md-4">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center experience">
                            <h4>Change Password</h4>
                        </div>
                        <br />
                        <div className="col-md-12">
                            <label className="labels">Actual Password</label>
                            <input type="text" className="form-control" />
                        </div> 
                        <br />
                        <div className="col-md-12">
                            <label className="labels">New Password</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary profile-button" type="button">Save Password</button>
                    </div>
                </div> */}
            </div>
        </div>

    )
}
