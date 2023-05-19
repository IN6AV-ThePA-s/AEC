import React, { useContext, useEffect, useState } from 'react'
import { CardReservation } from '../../components/CardReservation'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

export const AddReservationPageAdmin = () => {
    const navigator = useNavigate()
    const [rooms, setRooms] = useState([{}])
    const [hotelAdmin,setHotelAdmin] = useState(null)
    let user = (JSON.parse(localStorage.getItem('user')))
    let form

    const getHotelUser = async() =>{
        if(user.role == 'ADMIN') {
            const { data } = await axios(`http://localhost:3022/hotel/getAd`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token'),
                    },
                });
                setHotelAdmin(data.existsHotel);
        } 
    }
    
    const getRooms = async () => {
        try {
            if (hotelAdmin != null && hotelAdmin != undefined) {
                const { data } = await axios(`http://localhost:3022/room/get-by-hotel/${hotelAdmin._id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token'),
                    },
                });
                //console.log(data.rooms);
                setRooms(data.rooms);
            }
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
        if(room!= null && room!= undefined){
            document.getElementById('room').value=room._id

        }
    }
    
    const add = async() =>{
        //console.log(form);
        form = {
            client: user.sub,
            room: document.getElementById('room').value,
            numberOfPeople: document.getElementById('nPeople').value,
            numberOfNight:  document.getElementById('nNights').value
        }
        try {
            form = {
                client: user.sub,
                room: document.getElementById('room').value,
                numberOfPeople: document.getElementById('nPeople').value,
                numberOfNight:  document.getElementById('nNights').value
            }
            if (form.room != null && form.room != undefined) {
                const { data } = await axios.post(`http://localhost:3022/reservation/add`, form, {
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
            }
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

    useEffect(() => {
        getHotelUser()
    }, [])

    useEffect(() => {
        getRooms()
    }, [hotelAdmin])

    useEffect(() => {
        console.log(rooms);
    }, [])

    return (
        <div className="main-content">
            <div className="container">

                <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white'>
                    <h1 className='h1TE text-center'>Add Reservation</h1>
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
                                                        </div>

                                                        <div className='row mt-2'>
                                                        <div className='col-md-6'>
                                                                <h4 className='text-center'>Room</h4>
                                                                <select className="form-control selectpicker show-menu-arrow" name='room' id='room'
                                                                    data-style="form-control" data-live-search="true" >
                                                                    {
                                                                        rooms[0] != undefined/*&& additionalServices[0].service != undefined*/  ? rooms.map(({ _id, cod, hotel }, i) => {
                                                                            return (
                                                                                <option key={i} value={_id}>{'Code:'+cod}</option>
                                                                            )
                                                                        }) : (
                                                                            <option>No rooms available</option>
                                                                        )
                                                                    }
                                                                </select>
                                                        </div>
                                                            <div className='col-md-4'>
                                                                <h4 className='text-center'>No. People</h4>
                                                                <input type="text" placeholder='Name' id='nPeople' className='form-control textNormalHotel' style={{ background: 'transparent' }} />
                                                            </div>
                                                            <div className='col-md-4'>
                                                                <h4 className='text-center'>No. Nights</h4>
                                                                <input type="text" placeholder='Name' id='nNights' className='form-control textNormalHotel' style={{ background: 'transparent' }} />
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-success me-1 mt-4" onClick={()=>add()}>Add Reservation</button>
                                                        <Link to='/home/hotels'>
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
    )
}