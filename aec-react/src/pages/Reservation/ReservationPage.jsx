import React, { useEffect, useState } from 'react'
import { CardReservation } from '../../components/CardReservation'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

export const ReservationPage = () => {
    const [resevations,setResevations] = useState([{}])
    const getReservation = async () => {
        try {
            let user = (JSON.parse(localStorage.getItem('user')))
            const { data } = await axios(`http://localhost:3022/reservation/getUser/${user.sub}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
            //console.log(data.existsReservs);
            setResevations(data.existsReservs);
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: 'error',
                showConfirmButton: true,
            });
        }
    };

    useEffect(() => {
        getReservation();
    }, []);


    return (
        <div className="main-content">
            <div className="container">

                <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white'>

                    <h1 className='h1TE text-center'>Reservation</h1>

                </div>

                <div className='row justify-content-start mb-4 mt-3'>

                    {/*<div className='col-md-5'>

                        <select name="state" className='form-select'>

                            <option value={null}>FILTER</option>

                        </select>

                    </div>

                    <div className='col-md-7'>

                        <input type="text" placeholder='Search' className='form-control' />

                    </div>*/}


                </div>

                <div className="row justify-content-center mt-4">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                            <div className="hotel-card_info p-4">

                                <div className=" align-items-center">

                                    <div className="d-flex flex-column text-center p-3">
                                        {  
                                            resevations.length > 0 ? resevations.map(
                                                ({_id,numberRes, client, room, numberOfPeople, numberOfNight,
                                                    additionalServices, events, total, status},index)=>{
                                                    
                                                return(
                                                    <CardReservation
                                                    key={index}
                                                    id={_id}
                                                    numberRes={numberRes}
                                                    client={client}
                                                    room={room}
                                                    numberOfPeople={numberOfPeople}
                                                    numberOfNight={numberOfNight}
                                                    additionalServices={additionalServices}
                                                    events={events}
                                                    total={total}
                                                    status={status} />  
                                                )
                                            }) : (
                                                <h1>You have not make any reservations yet</h1>
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