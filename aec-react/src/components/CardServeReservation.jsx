import axios from 'axios'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


export const CardServeReservation = ({ id, service, price,already, idReserv }) => {
    const navigator = useNavigate()
    const addServ = async() =>{
        try {
            let idr = idReserv._id
            let form = {}
            console.log(localStorage.getItem('token'));
            const { data } = await axios.put(`http://localhost:3022/reservation/addService/${idr}/${id}`,form ,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
            Swal.fire({
                title: `${data.message}`,
                icon:'success',
                showConfirmButton: true,
            });
            navigator('/home/reservationPage')
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: 'error',
                showConfirmButton: true,
            });
        }
    }

    const remServ = async() =>{
        try {
            let form = {}
            const { data } = await axios.put(`http://localhost:3022/reservation/remService/${idReserv._id}/${id}`,form ,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                }
            });
            Swal.fire({
                title: `${data.message}`,
                icon:'success',
                showConfirmButton: true,
            });
            navigator('/home/reservationPage')
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: 'error',
                showConfirmButton: true,
            });
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

                        <div className='mt-3'>
                            {
                                already == 1 ? (
                                        <button className="btn btn-danger bi bi-trash ms-1" type="button" onClick={()=>remEvent()} > Delete</button>
                                ) : (
                                        <button className="btn btn-success bi bi-pencil me-1" type="button" onClick={()=>addEvent()} > Add</button>
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )   
}
