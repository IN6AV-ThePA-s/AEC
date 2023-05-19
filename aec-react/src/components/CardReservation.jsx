import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const CardReservation = ({id, numberRes, client, room, numberOfPeople, numberOfNight,additionalServices, events, total, status}) => {
    const navigator = useNavigate()

    /*const viewEventos = () =>{
        if(Array.isArray(events)){
            for(let event of events){
                return(
                    <input type="text" placeholder='Name' value={event.name} className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                )
            }
        }else{
            <input type="text" placeholder='Name' value={events.name} className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
        }
    }
    const viewServicios = () =>{
        if(Array.isArray(additionalServices)){
            for(let serv of additionalServices){
            }
        }else{
            <input type="text" placeholder='Name' value={additionalServices.service} className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
        }
    }*/

    const compete = async() =>{
        try {
            
            let form = {}
            const { data } = await axios.put(`http://localhost:3022/reservation/complete/${id}`,form, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
            Swal.fire({
                title: `${data.message}`,
                icon: 'success',
                showConfirmButton: true,
            });
            navigator('/dashboard/billPage')
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: 'error',
                showConfirmButton: true,
            });
        }
    }

    const cancelReserv = async() =>{
        try {
            let form = {}
            const { data } = await axios.put(`http://localhost:3022/reservation/cancel/${id}`,form, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
            Swal.fire({
                title: `${data.message}`,
                icon: 'success',
                showConfirmButton: true,
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: 'error',
                showConfirmButton: true,
            });
        }
    }
 
    useEffect(()=>{
        //viewEventos()
        //viewServicios()
        console.log(additionalServices);
    },[])

    return (
        <div className="card mt-3">
            <div className="row g-0">
                <div className="">
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-md-4'>
                                <h4 className='text-center'>No. Reservation</h4>
                                <input type="text" placeholder='Name' value={numberRes} className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                            </div>
                            <div className='col-md-8'>
                                <h4 className='text-center'>Client</h4>
                                    {
                                        client != undefined ? (
                                            <input type="text" placeholder='Name' value={`${client.name} ${client.surname}`} className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                                        ) : (
                                            <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                                        )
                                    }
                            </div>

                        </div>

                        <div className='row mt-2'>
                            <div className='col-md-4'>
                                <h4 className='text-center'>Room</h4>
                                    {
                                        room != undefined ? (
                                            <input type="text" placeholder='Name' value={`${room.cod} of ${room.hotel.name}`} className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                                        ) : (
                                            <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                                        )
                                    }    
                                {/* <input type="text" placeholder='Name' value={`${room.cod} of ${room.hotel.name}`} className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly /> */}
                            </div>
                            <div className='col-md-4'>
                                <h4 className='text-center'>No. People</h4>
                                {
                                    room != undefined ? (
                                        <input type="text" placeholder='Name' value={numberOfPeople} className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                                    ) : (
                                        <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                                    )
                                } 
                                {/* <input type="text" placeholder='Name' value={numberOfPeople} className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly /> */}
                            </div>
                            <div className='col-md-4'>
                                <h4 className='text-center'>No. Nights</h4>
                                {
                                        room != undefined ? (
                                            <input type="text" placeholder='Name' value={numberOfNight} className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                                        ) : (
                                            <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                                        )
                                    } 
                                {/* <input type="text" placeholder='Name' value={numberOfNight} className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly /> */}
                            </div>
                        </div>

                        <div className='row mt-2'>
                            <div className='col-md-6'>
                                <h4 className='text-center'>Additionals Services</h4>
                                <select className="form-control selectpicker show-menu-arrow" name='additionalServices' 
                                data-style="form-control" data-live-search="true">
                                    {   
                                        additionalServices != undefined /*&& additionalServices[0].service != undefined*/ ? additionalServices.map(({_id,service}, i)=>{
                                            return(
                                                <option key={i} value={_id}>{service}</option>
                                            )
                                        }) : (
                                            <option>No services available</option>
                                        )
                                    }
                                </select> 
                            </div>
                            <div className='col-md-6'>
                                <h4 className='text-center'>Events</h4>
                                <select className="form-control selectpicker show-menu-arrow" name='events' 
                                data-style="form-control" data-live-search="true">
                                    {   
                                        events != undefined /*&& events[0]._id != undefined*/ ? events.map(({_id,name}, i)=>{
                                            return(
                                                <option key={i} value={_id}>{name}</option>
                                            )
                                        }) : 
                                            <option>No events available</option>
                                    }
                                </select> 
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className='col-md-9'>
                                <h4 className='text-center'>Total</h4>
                                <input type="text" placeholder='Name' value={total} className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                            </div>
                        </div>

                        <div className='mt-3 '>
                            <Link to={`/dashboard/updateReservation/${id}`}>
                                <button className="btn btn-warning bi bi-pencil me-1" type="button"> Update reservation</button>
                            </Link>
                            <Link>
                                <button className="btn btn-danger bi bi-trash me-1" onClick={()=>cancelReserv()} type="button"> Cancel reservation</button>
                            </Link>
                            <Link to={`/dashboard/addOrRemEvent/${id}`}>
                                <button className="btn btn-primary bi bi-pencil me-1" type="button"> Remove or Add Event</button>
                            </Link>
                            <Link to={`/dashboard/updateReservation/${id}`}>
                                <button className="btn btn-primary bi bi-pencil me-1" type="button"> Remove or Add Service</button>
                            </Link>
                            <button className="btn btn-success bi bi-pencil me-1" onClick={()=>compete()} type="button"> Complete Reservation</button>
                        </div>
                
                    </div>
                </div>
            </div>
        </div>
    )
}
