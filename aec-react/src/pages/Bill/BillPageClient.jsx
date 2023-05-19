import React, { useContext, useEffect, useState } from 'react'
import { CardBill } from '../../components/CardBill'
import { AuthContext } from '../..'
import Swal from 'sweetalert2'
import axios from 'axios'


export const BillPageClient = () => {
    const [bills,setBills] = useState([{}])
    const [reservations,setReservations] = useState([{}])
    const [hotelAdmin,setHotelAdmin] = useState(null)
    const { dataUser } = useContext(AuthContext)
    
    const getReservation = async () => {
        try {
            const { data } = await axios(`http://localhost:3022/reservation/history`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
            setReservations(data.existsReservs);
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: 'error',
                showConfirmButton: true,
            });
        }
    };
    
    const getBill = async() =>{
        try {
            if(reservations[0]._id != undefined){
                let datos = []
                for(let reserv of reservations){
                    const { data } = await axios(`http://localhost:3022/bill/get/${reserv._id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token'),
                        },
                    });
                    datos.push(data.existsBills)
                }
                console.log(datos);
                setBills(datos);
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

    useEffect(()=>{
        getBill()
        console.log(bills);
    },[reservations])

    useEffect(()=>{
        getReservation()
    },[hotelAdmin])

    return (
        <div className="main-content">
            <div className="container">

                <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white'>

                    <h1 className='h1TE text-center'>Bill</h1>

                </div>
                <div className="row justify-content-center mt-4">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                            <div className="hotel-card_info p-4">

                                <div className=" align-items-center">

                                    <div className="d-flex flex-column text-center p-3">
                                    {
                                        bills[0]._id != undefined ? bills.map(({numberBill,reservation},i)=>{
                                            return(
                                                <CardBill 
                                                key={i}
                                                numberBill={numberBill} 
                                                numberRes={reservation.numberRes} 
                                                client={reservation.client} 
                                                room={reservation.room} 
                                                numberOfPeople ={reservation.numberOfPeople} 
                                                numberOfNight={reservation.numberOfNight} 
                                                additionalServices ={reservation.additionalServices} 
                                                events={reservation.events} 
                                                total={reservation.total}
                                                hotel={reservation.room.hotel} />
                                            )
                                        }) : (
                                            <h1>They are not bills yet</h1>
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