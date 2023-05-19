import React from 'react'
import { CardReservation } from '../../components/CardReservation'
import { Link } from 'react-router-dom'

export const AddReservationPage = () => {
    
    const getRoom = async () => {
        try {
            let user = (JSON.parse(localStorage.getItem('user')))
            const { data } = await axios(`http://localhost:3022/reservation/getUser/${user.sub}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
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

    const getUser = async () => {
        try {
            let user = (JSON.parse(localStorage.getItem('user')))
            const { data } = await axios(`http://localhost:3022/reservation/getUser/${user.sub}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
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

    const getServices = async () => {
        try {
            let user = (JSON.parse(localStorage.getItem('user')))
            const { data } = await axios(`http://localhost:3022/reservation/getUser/${user.sub}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
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

    const getEvents = async () => {
        try {
            let user = (JSON.parse(localStorage.getItem('user')))
            const { data } = await axios(`http://localhost:3022/reservation/getUser/${user.sub}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
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
                                                            <div className='col-md-8'>
                                                                <h4 className='text-center'>Client</h4>
                                                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }}  />
                                                            </div>
        
                                                        </div>

                                                        <div className='row mt-2'>
                                                            <div className='col-md-4'>
                                                                <h4 className='text-center'>Room</h4>
                                                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }}  />
                                                            </div>
                                                            <div className='col-md-4'>
                                                                <h4 className='text-center'>No. People</h4>
                                                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }}  />
                                                            </div>
                                                            <div className='col-md-4'>
                                                                <h4 className='text-center'>No. Nights</h4>
                                                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }}  />
                                                            </div>
                                                        </div>

                                                        <div className='row mt-2'>
                                                            <div className='col-md-6'>
                                                                <h4 className='text-center'>Additionals Services</h4>
                                                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }}  />
                                                            </div>
                                                            <div className='col-md-6'>
                                                                <h4 className='text-center'>Events</h4>
                                                                <input type="text" placeholder='Name' className='form-control textNormalHotel' style={{ background: 'transparent' }}  />
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-success me-1 mt-4">Add Reservation</button>
                                                        <Link to='/dashboard'>
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