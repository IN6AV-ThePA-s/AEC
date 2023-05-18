import React, { useEffect, useState } from 'react'
import { CardReservation } from '../../components/CardReservation'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export const UpdateReservationPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [reservation,setResevation] = useState({})
    const [rooms,setRooms] = useState([{}])
    const getReservation = async() =>{
        try {
            const { data } = await axios(`http://localhost:3022/reservation/getId/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
            setResevation(data.existsReserv);
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: 'error',
                showConfirmButton: true,
            });
        }
    };

    const changeValues = () =>{
        if(reservation.room){
            if(rooms[0]._id != undefined){
                document.getElementById('room').value = reservation.room._id
                document.getElementById('noPeople').value = reservation.numberOfPeople
                document.getElementById('noNights').value = reservation.numberOfNight
            }
        }
    }

    const mostarPre = () =>{
        if(reservation.room != undefined) {
            return(
                <option value={reservation.room._id}>{'Code:'+reservation.room.cod +'-'+reservation.room.hotel.name}</option>
            )
        }else{
            return(
                <></>
            ) 
        }

    }

    const getRooms = async() =>{
        try {
            const { data } = await axios(`http://localhost:3022/room/getA`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
            setRooms(data.rooms);
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: 'error',
                showConfirmButton: true,
            });
        }
    }

    const updateReservation = async() =>{
        try {
            let form = {}
            if(reservation.room._id == document.getElementById('room').value){
                form = {
                    numberOfPeople: document.getElementById('noPeople').value,
                    numberOfNight: document.getElementById('noNights').value,
                }
            }else{
                form = {
                    room: document.getElementById('room').value,
                    numberOfPeople: document.getElementById('noPeople').value,
                    numberOfNight: document.getElementById('noNights').value,
                }
            }
            const { data } = await axios.put(`http://localhost:3022/reservation/update/${id}`, form ,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token'),
                },
            });
            Swal.fire({
                title: `${data.message}`,
                icon:'success',
                showConfirmButton: true,
            });
            navigate('/dashboard/reservationPage')
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
        getReservation()
        getRooms()
    },[])

    useEffect(()=>{
        changeValues()
    },[reservation])

    return (
        <div className="main-content">
            <div className="container">

                <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white'>

                    <h1 className='h1TE text-center'>Update Reservation</h1>

                </div>

                <div className="row justify-content-center mt-4">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                            <div className="hotel-card_info p-4">

                                <div className=" align-items-center">

                                    <div className="d-flex flex-column text-center p-3">

                                        <div className="card">
                                            <div className="row g-0">
                                                <div className="">
                                                    <div className="card-body">
                                                        <div className='row'>
                                                        <div className='row mt-2'>
                                                            <div className='col-md-4'>
                                                                <h4 className='text-center'>Room</h4>
                                                                <select className="form-control selectpicker show-menu-arrow" name='user' 
                                                                id='room' data-style="form-control" data-live-search="true">
                                                                    {    
                                                                        rooms[0]._id != undefined ? rooms.map(({_id, cod, hotel}, i)=>{
                                                                            return(
                                                                                <option key={i} value={_id}>{'Code:'+cod +' '+'Hotel:'+hotel.name}</option>
                                                                            )
                                                                        }) : (
                                                                            <option>No rooms available</option>
                                                                        )
                                                                    }
                                                                    {
                                                                        mostarPre()
                                                                    }
                                                                </select> 
                                                            </div>
                                                            <div className='col-md-4'>
                                                                <h4 className='text-center'>No. People</h4>
                                                                <input type="text" placeholder='Name' id='noPeople' className='form-control textNormalHotel' style={{ background: 'transparent' }}  />
                                                            </div>
                                                            <div className='col-md-4'>
                                                                <h4 className='text-center'>No. Nights</h4>
                                                                <input type="text" placeholder='Name' id='noNights' className='form-control textNormalHotel' style={{ background: 'transparent' }}  />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button className="btn btn-warning me-1 mt-4" onClick={()=>updateReservation()}>Update Reservation</button>
                                                        </div>
                                                        <Link to='/dashboard/reservationPage'>
                                                            <button className="btn btn-danger me-1 mt-4">Cancel</button>
                                                        </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}