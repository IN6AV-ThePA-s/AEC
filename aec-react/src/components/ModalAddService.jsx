import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

export const ModalAddService = ({ id, services, getRooms, getServices }) => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
    const addService = async (i) => {
        try {
            const form = {
                service: i
            }
            const { data } = await axios.put(
                `http://localhost:3022/room/add-service/${id}`,
                form,
                {
                    headers: headers
                }
            )
            getServices()
            getRooms()
            Swal.fire({
                title: `${data.message}`,
                icon: 'success'
            })
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
    }, [])


    return (
        <div className="modal fade" id={`modalAddService${id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Add Service</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        {
                            services?.map(({ _id, service, price, description }, index) => {
                                return (
                                    <div key={index} className="card mb-3">
                                        <div className="row g-0">
                                            <div className="">
                                                <div className="card-body">

                                                    <div className='row'>
                                                        <div className='col-md-7'>
                                                            <h5 className='text-center'>Name</h5>
                                                            <input type="text" placeholder='Name' defaultValue={service} className='form-control textNormalHotel' disabled />
                                                        </div>
                                                        <div className='col-md-5'>
                                                            <h5 className='text-center'>Price</h5>
                                                            <input type="number" placeholder='Price' defaultValue={price} className='form-control textNormalHotel' disabled />
                                                        </div>

                                                    </div>

                                                    <div>
                                                        <h5 className='text-center mt-3'>Description</h5>
                                                        <textarea className="form-control textNormalHotel" placeholder='Description' defaultValue={description} aria-label="With textarea" disabled></textarea>
                                                    </div>

                                                    <button type="button" className="btn btn-success mt-3" data-bs-dismiss="modal" onClick={(e) => { e.preventDefault(); addService(_id) }}>Add Service</button>

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
