import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { CardModalCheckServices } from './CardModalCheckServices'

export const ModalCheckServicesClient = ({ id, idRoom, listServices }) => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const [services, setServices] = useState([])
    const testServices = async()=>{
        
        setServices(listServices)
    }
    
    /* const getServiceByid = async(id)=>{
        try {
            const {data} = await axios(`http://localhost:3022/service/get/${id}`, {headers: headers})
            console.log(data.service)
            setServices(data.service)
        } catch (err) {
            console.log(err)
        }
    } */

    useEffect(() => {
      
        
        testServices()
      
    }, [])
    

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
                            listServices?.map(({ _id,service }, index) => {
                                
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
