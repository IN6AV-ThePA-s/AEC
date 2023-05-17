import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { CardModalCheckServices } from './CardModalCheckServices'

export const ModalCheckServices = ({ id, services,getRooms }) => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
    const delService = async(i)=>{
        try {
            console.log(i);
            const form = {
                service: i
            }
            const { data } = await axios.put(
                `http://localhost:3022/room/delete-service/${id}`,
                form,
                {
                    headers: headers
                }
            )
            getRooms()
            Swal.fire({
                title: `${data.message}`,
                icon: 'success'
            })
        } catch (err) {
            console.error(err);
        }
    }

    return (

        <div className="modal fade" id={`modalCheckServices${id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Room Services</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">

                        {
                            services?.map(({ _id,service }, index) => {
                                return (
                                    <div key={index} className="card mb-3">
                                        <div className="row g-0">
                                            <div className="">
                                                <div className="card-body">

                                                    <div className='row'>
                                                        <div className='col-md-7'>
                                                            <h5 className='text-center'>Name</h5>
                                                            <input type="text" placeholder='Name' defaultValue={service?.service} className='form-control textNormalHotel' disabled />
                                                        </div>
                                                        <div className='col-md-5'>
                                                            <h5 className='text-center'>Price</h5>
                                                            <input type="number" placeholder='Price' defaultValue={service?.price} className='form-control textNormalHotel' disabled />
                                                        </div>

                                                    </div>

                                                    <div>
                                                        <h5 className='text-center mt-3'>Description</h5>
                                                        <textarea className="form-control textNormalHotel" placeholder='Description' defaultValue={service?.description} aria-label="With textarea" disabled></textarea>
                                                    </div>

                                                    <button type="button" className="btn btn-danger mt-3" data-bs-dismiss="modal" onClick={(e) => { e.preventDefault(); delService(service?._id) }}>Delete Service</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}
