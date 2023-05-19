import React, { useContext, useEffect, useState } from 'react'
import { CardBill } from '../../components/CardBill'
import { AuthContext } from '../..'
export const BillPage = () => {
    const [bills,setBills] = useState([{}])
    const [reservations,setReservations] = useState([{}])
    const { dataUser } = useContext(AuthContext)
    const getReservation = async () => {
        try {
            let user = (JSON.parse(localStorage.getItem('user')))

            if(dataUser.role == 'MASTER') {
                const { data } = await axios(`http://localhost:3022/reservation/get`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token'),
                    },
                });
                setReservations(data.reservations);
            } else {
                const { data } = await axios(`http://localhost:3022/reservation/history/${user.sub}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token'),
                    },
                });
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
    
    const getBill = async() =>{
        try {
            if(reservations != undefined){
                let data = []
                for(let reserv of reservations){
                    data.push(reserv._id)
                }
                const { datos } = await axios('http://localhost:3022/bill/get', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token'),
                    },
                });
                setBills(datos.existsReservs);
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
        getReservation()
        getBill()
    },[])

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

                                        <CardBill 
                                        numberBill={bills.numberBill} 
                                        numberRes={bills.reservation.numberRes} 
                                        client={bills.reservation.client} 
                                        room={bills.reservation.room} 
                                        numberOfPeople ={bills.reservation.numberOfPeople} 
                                        numberOfNight={bills.reservation.numberOfNight} 
                                        additionalServices ={bills.reservation.additionalServices} 
                                        events={bills.reservation.events} 
                                        total={bills.reservation.total}
                                        hotel={bills.reservation.room.hotel} />

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