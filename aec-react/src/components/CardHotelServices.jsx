import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export const CardHotelServices = ({ name, description, price, hotel, butDel, id }) => {
    const navigate = useNavigate()
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
    
    const updateService = async() => {
        try {
            const name = document.getElementById(`name${id}`).value
            const price = document.getElementById(`price${id}`).value
            const description = document.getElementById(`desc${id}`).value

            const form = {
                service: name,
                price: price,
                description: description,
                hotel: hotel
            }

            const { data } = await axios.put(`http://localhost:3022/service/update/${id}`, form, { headers: headers })
            if (data.updateService) {
                Swal.fire({
                    title: 'Service updated',
                    text: `${data.message}`,
                    icon: 'success',
                    timer: 2000,
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
                                <input id={`name${id}`} defaultValue={name} type="text" placeholder='Name' className='form-control textNormalHotel' />
                            </div>
                            <div className='col-md-5'>
                                <h4 className='text-center'>Price</h4>
                                <input id={`price${id}`} defaultValue={price} type="number" placeholder='Price' className='form-control textNormalHotel' />
                            </div>

                        </div>

                        <div>
                            <h4 className='text-center mt-3'>Description</h4>
                            <textarea id={`desc${id}`} defaultValue={description} className="form-control textNormalHotel" aria-label="With textarea"></textarea>
                        </div>

                        <div className='mt-3'>
                            <button onClick={(e)=>{e.preventDefault(); updateService()}} className="btn btn-warning bi bi-pencil me-1" type="button"> Update</button>
                            <button onClick={(e)=>{e.preventDefault(); butDel()}} className="btn btn-danger bi bi-trash ms-1" type="button"> Delete</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
