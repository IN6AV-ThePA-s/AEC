import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios';
import Swal from 'sweetalert2'

export const ModalAddEvent = ({hotel}) => {

    const navigate = useNavigate()

    const [formEvent, setFormEvent] = useState({
        name: '',
        description: '',
        type: '',
        maxPersons: '',
        price: '',
        hotel: {hotel}
    })

    const handleFormEvent = (e) => {
        setFormEvent({
            ...formEvent,
            [e.target.name]: e.target.value
        })
    }

    const addEvent = async () => {
        try {
            const { data } = await axios.post('http://localhost:3022/event/add', formEvent)
            if (data.message) {
                Swal.fire({
                    title: data.message,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })

                navigate('/dashboard/eventsPage')
            }
        } catch (err) {
            Swal.fire(err.response.data.message, '', 'error')
            console.error(err)
        }
    }

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
                                <input onChange={handleFormEvent} type="text" name='name' placeholder='Name' className='form-control textNormalHotel' />
                            </div>
                            <div className='col-md-5'>
                                <h4 className='text-center'>Type</h4>
                                <input onChange={handleFormEvent} type="text" name='type' placeholder='Type' className='form-control textNormalHotel' />
                            </div>

                        </div>

                        <div className='row mt-2'>
                            <div className='col-md-8'>
                                <h4 className='text-center'>Capacity Persons</h4>
                                <input onChange={handleFormEvent} type="text" name='maxPersons' placeholder='Capacity Persons' className='form-control textNormalHotel' />
                            </div>
                            <div className='col-md-4'>
                                <h4 className='text-center'>Price</h4>
                                <input onChange={handleFormEvent} type="text" name='price' placeholder='Price' className='form-control textNormalHotel' />
                            </div>
                        </div>

                        <div className='mt-2'>
                            <h4 className='text-center'>Description</h4>
                            <textarea onChange={handleFormEvent} name='description' className="form-control textNormalHotel" placeholder='Description' aria-label="With textarea"></textarea>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button onClick={()=>{addEvent()}} type="button" className="btn btn-success" data-bs-dismiss="modal">Add Event</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
