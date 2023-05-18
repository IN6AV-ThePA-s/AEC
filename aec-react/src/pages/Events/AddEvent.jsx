import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useState } from 'react'
import axios from 'axios'

export const AddEvent = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: '',
        type: '',
        maxPersons: '',
        price: ''
    })

    const handleForm = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const addEvent = async()=>{
        try {
            const {data} = await axios.post('http://localhost:3022/event/add', form)
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

        <>
            <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white ms-2 me-4'>
                <h1 className='h1TE text-center'>Add Event</h1>
            </div>

            <hr />

            <div className="row justify-content-center "> {/* ms-4 me-4 mb-4 */}

                <div className="col-md-8">
                    <div className="">

                        <div className="row">

                            <div className="col-md-12 mt-3">
                                <label className="labels">Name</label>
                                <input onChange={handleForm} name='name' type="text" maxLength='100' className="form-control" />
                            </div>

                            <div className="col-md-12 mt-3">
                                <label className="labels">Type</label>
                                <input onChange={handleForm} name='type' maxLength='100' type="text" className="form-control" />
                            </div>

                            <div className="col-md-12 mt-3">
                                <label className="labels">Capacity</label>
                                <input onChange={handleForm} name='maxPersons' type="number" className="form-control" />
                            </div>

                            <div className="col-md-12 mt-3">
                                <label className="labels">Price</label>
                                <input onChange={handleForm} name='price' type="number" className="form-control" />
                            </div>

                        </div>

                        <div className="text-center mt-3">

                            <button onClick={()=>{addEvent()}} className="btn btn-success me-1" type="button">Add Event</button>

                            <Link to='/dashboard/eventsPage'>
                                <button className="btn btn-danger ms-1" type="button">Cancel</button>
                            </Link>
                           
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}