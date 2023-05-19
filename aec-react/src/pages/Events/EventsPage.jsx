import React, { useEffect, useState } from 'react'
import { TableBodyEvents } from '../../components/TableBodyEvents'
import axios from 'axios';
import Swal from 'sweetalert2'
import { TableHeadEvents } from '../../components/TableHeadEvents';

export const EventsPage = () => {

    const [event, setEvent] = useState([{}])

    const getEvents = async () => {
        try {
            const { data } = await axios('http://localhost:3022/event/get')
            setEvent(data.events)
        } catch (err) {
            console.error(err)

        }
    }

    const deleteEvents = async(id)=>{
        try {
            Swal.fire({
                title: 'Are you sure to delete this user?',
                text: 'This action is irreversible',
                icon: 'question',
                showConfirmButton: true,
                showDenyButton: true
            }).then(async(result)=>{
                if (result.isConfirmed) {
                    const {data} = await axios.delete(`http://localhost:3022/event/delete/${id}`).catch(
                        (err)=>{
                            Swal.fire(err.response.data.message, '', 'error')
                        })
                    getEvents()
                    Swal.fire(`${data.message}`, '', 'success')
                }else{
                    Swal.fire('No worries!', '', 'success')
                }
            })
        } catch (err) {
            Swal.fire(err.response.data.message, '', 'error')
            console.error(err)
        }
    }

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <>
            <section className="bodyTableEvent intro">
                <div className="bg-image h-100">
                    <div className="mask d-flex align-items-center h-100">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12">

                                    <div style={{backgroundColor: '#04135d', borderRadius: '15px'}} className='sticky-top text-white'>

                                        <h1 className='h1TE text-center'>Events</h1>
                                    </div>

                                    <hr />

                                    <div className="card">
                                        <div className="card-body p-0">
                                            <div className="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: 'auto' }}> {/* 700px */}
                                                <table className="tableEvent table table-striped mb-0">

                                                    <TableHeadEvents />

                                                    {
                                                        event.map((i, index) => {
                                                            return (
                                                                <TableBodyEvents
                                                                    key={index}
                                                                    name={i.name}
                                                                    type={i.type}
                                                                    maxPersons={i.maxPersons}
                                                                    price={i.price}
                                                                    id={i._id}
                                                                    butDelete={()=>deleteEvents(i._id)}
                                                                    butEdit={`/dashboard/updateEvent/${i._id}`}
                                                                />
                                                            )
                                                        })

                                                    }

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
