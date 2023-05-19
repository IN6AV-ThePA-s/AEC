import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { CardEventReservation } from '../../components/CardEventReservation'

export const AddOrRemoveServicePage = () => {
    const {idReserv} = useParams()
    const [services,setServices] = useState([{}])
    const [reserv,setReserv] = useState(null)
    
    const getResrv = async() =>{
        try {
            const { data } = await axios(`http://localhost:3022/reservation/getId/${idReserv}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
            setReserv(data.existsReserv);
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: 'error',
                showConfirmButton: true,
            });
        }
    }

    const getEvents = async() =>{
        if(reserv != null){
        try {   
            if(reserv.room.hotel != undefined) {   
                let idH = reserv.room.hotel._id
                console.log(idH);
                const { data } = await axios(`http://localhost:3022/event/getByHotel/${idH}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token'),
                    },
                });
                setEvents(data.events);
            }
            } catch (err) {
                console.error(err);
                Swal.fire({
                    title: `${err.response.data.message}`,
                    icon: 'error',
                    showConfirmButton: true,
                });
            }
        }
    }

    const alreadyEx = (id) =>{
        let al = 0
        if(reserv != undefined){
            for(let eve of reserv.events){
                if(eve._id == id) { 
                    return al = 1
                }else{ 
                    al = 0 
                }
            }
        }
        return al
    }

    useEffect(()=>{
        getEvents()
        getResrv()
    },[])

    useEffect(()=>{
        getEvents()
        console.log(events);
    },[reserv])
  return(
        <div className="main-content">
            <div className="container">

                <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white mb-4'>

                    <h1 className='h1TE text-center'>Events of reservation</h1>

                </div>
                <div className="row justify-content-center mt-4">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                            <div className="hotel-card_info p-4">
                                <h1 className='text-center'>Events</h1>

                                <div className=" align-items-center mb-2">

                                    <div className="d-flex flex-column text-center p-3">
                                        {
                                            events.length >0 ? (
                                                events.map((i, index) => (
                                                    //name, description, type, maxPersons, price, id, idReserv 
                                                    <CardEventReservation
                                                        key={index}
                                                        name={i.name}
                                                        description={i.description}
                                                        type={i.type}
                                                        maxPersons={i.maxPersons}
                                                        price={i.price}
                                                        already={alreadyEx(i._id)}
                                                        idReserv={reserv}
                                                        id={i._id}
                                                    />
                                                ))
                                            ) : (
                                                <p className='textNormalHotel'>No events available</p>
                                            )
                                        }
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
