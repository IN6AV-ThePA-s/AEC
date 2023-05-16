import React from 'react'
import { Link } from 'react-router-dom'
import { CardModalCheckServices } from './CardModalCheckServices'

export const ModalCheckServices = () => {
    return (

        <div className="modal fade" id="modalCheckServices" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Room Services</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">

                        <CardModalCheckServices/>
                        <CardModalCheckServices/>

                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal">Save Services</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
