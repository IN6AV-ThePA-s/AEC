import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export const ModalAddServiceHotel = ({ hotel }) => {
    const [form, setForm] = useState({
        service: '',
        description: '',
        price: '',
        hotel: hotel
    })
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const add = async() => {
        try {
            const { data } = await axios.post('http://localhost:3022/service/add', form, { headers: headers })
            if (data.service) {
                Swal.fire({
                    title: data.message,
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
        <div className="modal fade" id="modalAddServiceHotel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Add Service (General)</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='row'>
                            <div className='col-md-7'>
                                <h4 className='text-center'>Name</h4>
                                <input onChange={handleForm} type="text" placeholder='Name' className='form-control textNormalHotel' name='service' />
                            </div>
                            <div className='col-md-5'>
                                <h4 className='text-center'>Price</h4>
                                <input onChange={handleForm} type="number" placeholder='Price' className='form-control textNormalHotel' name='price' />
                            </div>

                        </div>


                        <div className='mt-2'>
                            <h4 className='text-center'>Description</h4>
                            <textarea onChange={handleForm} className="form-control textNormalHotel" placeholder='Description' aria-label="With textarea" name='description'></textarea>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button onClick={()=>{add()}} type="button" className="btn btn-success" data-bs-dismiss="modal">Add Service</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
