import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useRef } from 'react'


export const CardHotelEvents = ({ name, description, type, maxPersons, price, hotel, butDelete, butEdit, id }) => {

    const navigate = useNavigate()

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const updateEvents = async (idEvent) => {
        try {

            const name = document.getElementById(`inputNameEvent${idEvent}`)
            const description = document.getElementById(`inputDescriptionEvent${idEvent}`)
            const type = document.getElementById(`inputTypeEvent${idEvent}`)
            const maxPersons = document.getElementById(`inputMaxCapEvent${idEvent}`)
            const price = document.getElementById(`inputPriceEvent${idEvent}`)

            const formEvent = {
                name: name.value,
                description: description.value,
                type: type.value,
                maxPersons: maxPersons.value,
                price: price.value,
                hotel: hotel
            }

            const { data } = await axios.put(`http://localhost:3022/event/update/${idEvent}`, formEvent, { headers: headers })

            if (data.message) {
                Swal.fire({
                    title: `Event updated`,
                    text: `${data.message}`,
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false
                })
            }


        } catch (err) {
            Swal.fire(err.response.data.message, '', 'error')
            console.error(err)
        }
    }

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="">
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-md-7'>
                                <h4 className='text-center'>Name</h4>
                                <input type="text" id={`inputNameEvent${id}`} defaultValue={name} name='name' className='form-control textNormalHotel' />
                            </div>
                            <div className='col-md-5'>
                                <h4 className='text-center'>Type</h4>
                                <select className="form-control textNormalHotel" id={`inputTypeEvent${id}`} defaultValue={type} name='type' >

                                    <option value='Social'>Social</option>
                                    <option value='Cultural'>Cultural</option>
                                    <option value='Deportivo'>Deportivo</option>
                                    <option value='Empresarial'>Empresarial</option>
                                    <option value='Académico'>Académico</option>
                                    <option value='Religioso'>Religioso</option>
                                    <option value='Otro'>Otro</option>

                                </select>
                                {/* <input type="text" id={`inputTypeEvent${id}`} defaultValue={type} name='type' className='form-control textNormalHotel' /> */}
                            </div>

                        </div>

                        <div className='row mt-2'>
                            <div className='col-md-8'>
                                <h4 className='text-center'>Capacity Persons</h4>
                                <input type="text" id={`inputMaxCapEvent${id}`} defaultValue={maxPersons} name='maxPersons' className='form-control textNormalHotel' />
                            </div>
                            <div className='col-md-4'>
                                <h4 className='text-center'>Price</h4>
                                <input type="text" id={`inputPriceEvent${id}`} defaultValue={price} name='price' className='form-control textNormalHotel' />
                            </div>
                        </div>

                        <div className='mt-2'>
                            <h4 className='text-center'>Description</h4>
                            <textarea id={`inputDescriptionEvent${id}`} className="form-control textNormalHotel" name='description' defaultValue={description} aria-label="With textarea"></textarea>
                        </div>

                        <div className='mt-3'>
                            <Link>
                                <button className="btn btn-warning bi bi-pencil me-1" type="button" onClick={(e) => { e.preventDefault(); updateEvents(id) }}> Update</button>
                            </Link>
                            <Link>
                                <button className="btn btn-danger bi bi-trash ms-1" type="button" onClick={(e) => { e.preventDefault(); butDelete() }}> Delete</button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
