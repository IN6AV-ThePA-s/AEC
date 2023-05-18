import React from 'react'
import { Link } from 'react-router-dom'

export const CardBill = ({numberBill, numberRes, client, room, numberOfPeople, numberOfNight,additionalServices, events, total,hotel}) => {
    
    return (
        <div className="card">
            <div className="row g-0">
                <div className="">
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-md-6'>
                                <h4 className='text-center'>No. Bill</h4>
                                <input type="text" placeholder='Name' value={numberBill} className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                            </div>
                            <div className='col-md-4'>
                                <h4 className='text-center'>No. Reservation</h4>
                                <input type="text" placeholder='Name' value={numberRes} className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                            </div>
                            <div className='col-md-8'>
                                <h4 className='text-center'>Client</h4>
                                <input type="text" placeholder='Name' value={`${client.name} ${client.surname}`} className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                            </div>


                        <div className='row mt-2'>
                            <div className='col-md-4'>
                                <h4 className='text-center'>Room</h4>
                                <input type="text" placeholder='Name' value={`${room.cod} of ${room.hotel.name}`} className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                            </div>
                            <div className='col-md-4'>
                                <h4 className='text-center'>No. People</h4>
                                <input type="text" placeholder='Name' value={numberOfPeople} className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                            </div>
                            <div className='col-md-4'>
                                <h4 className='text-center'>No. Nights</h4>
                                <input type="text" placeholder='Name' value={numberOfNight} className='form-control textNormalHotel' style={{ background: 'transparent' }} readOnly />
                            </div>
                        </div>

                        <div className='row mt-2'>
                            <div className='col-md-6'>
                                <h4 className='text-center'>Additionals Services</h4>
                                <select className="form-control selectpicker show-menu-arrow" name='additionalServices' 
                                data-style="form-control" data-live-search="true">
                                    {    
                                        additionalServices != undefined /*&& additionalServices[0].service != undefined*/ ? (additionalServices.map(({_id,service}, i)=>{
                                            return(
                                                <option key={i} value={_id}>{service}</option>
                                            )
                                        }) ): (
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
                        </div>

                        <div className='mt-3'>
                            <Link to='/dashboard/updateBill'>
                                <button className="btn btn-warning bi bi-pencil me-1" type="button"> Update</button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
