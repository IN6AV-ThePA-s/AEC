import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sweeta from 'sweetalert2'
import '../../pages/Hotel/styleCardHotelPage.css'
import { ModalUpdateRoom } from '../../components/ModalUpdateRoom'
import { CardRoomPage } from '../../components/CardRoomPage'
import { CardHotelServices } from '../../components/CardHotelServices'
import { CardHotelEvents } from '../../components/CardHotelEvents'
import { ModalAddRoom } from '../../components/ModalAddRoom'
import { ModalCheckServices } from '../../components/ModalCheckServices'
import { ModalAddService } from '../../components/ModalAddService'
import { ModalAddEvent } from '../../components/ModalAddEvent'
import { ModalAddServiceHotel } from '../../components/ModalAddServiceHotel'

import axios from 'axios';
import Swal from 'sweetalert2'

export const CheckHotelPage = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
    const [hotel, setHotel] = useState({})
    const [imgs, setImgs] = useState()

    const handleChange = (e) => {
        setHotel({
            ...hotel,
            [e.target.name]: e.target.value
        })
    }

    const handleImages = (e) => {
        let f = new FormData()
        for (let img of e.target.files) {
            f.append('images', img)
        }
        setImgs(f)
    }

    const validateData = (data) => {
        let keys = Object.keys(data), msg = ''
        for (const key of keys) {
            if (data[key] !== null &&
                data[key] !== undefined &&
                data[key] !== ''
            ) continue
            msg += ` ${key.toUpperCase()},`
        }
        const a = `${msg}`
        return a.trim()
    }

    const getHotel = async () => {
        try {
            const { data } = await axios(
                `http://localhost:3022/hotel/get/${id}`,
                {
                    headers: headers
                }
            )
            setHotel(data.hotel)
        } catch (err) {
            console.error(err);
            Sweeta.fire({
                title: `${err.response.data.message}`,
                icon: 'error',
                showConfirmButton: true
            })
        }
    }

    const upda = async (e) => {
        try {
            e.preventDefault()
            let msg = validateData(hotel)
            if (msg)
                return Sweeta.fire({
                    title: `PARAMS REQUIRED`,
                    text: msg,
                    icon: 'warning',
                    iconColor: 'orange',
                    showConfirmButton: true
                })
            const { data } = await axios.put(
                `http://localhost:3022/hotel/update/${id}`,
                hotel,
                {
                    headers: headers
                }
            )
            if (imgs) {
                await axios.put(
                    `http://localhost:3022/hotel/upload-imgs/${id}`,
                    imgs,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': localStorage.getItem('token')
                        }
                    }
                )
            }
            Sweeta.fire({
                title: `HOTEL UPDATED`,
                text: `${data.message}`,
                icon: 'success',
                timer: 2500,
                showConfirmButton: false
            })
            navigate('/dashboard/hotelPage')
        } catch (err) {
            console.error(err);
            if (err.response.data.error) {
                return Sweeta.fire({
                    title: `Ya existe un hotel con el nombre ${hotel.name.toUpperCase()}`,
                    icon: 'error',
                    showConfirmButton: true
                })
            }
            Sweeta.fire({
                title: `${err.response.data.message}`,
                icon: 'error',
                showConfirmButton: true
            })
        }
    }

    const del = async (e) => {
        try {
            e.preventDefault()
            const { isConfirmed } = await Sweeta.fire({
                title: `Are you sure to delete this hotel?`,
                text: `When doing this, all those rooms associated with the hotel will be eliminated altogether.`,
                icon: 'question',
                showConfirmButton: true,
                showDenyButton: true
            })
            if (isConfirmed) {
                const { data } = await axios.delete(
                    `http://localhost:3022/hotel/delete/${id}`,
                    {
                        headers: headers
                    }
                )
                Sweeta.fire({
                    title: `HOTEL DELETED`,
                    text: `${data.message}`,
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false
                })
                navigate('/dashboard/hotelPage')
            }
        } catch (err) {
            console.error(err);
            Sweeta.fire({
                title: `${err.response.data.message}`,
                icon: 'error',
                showConfirmButton: true
            })
        }
    }

    /* ---------------- EVENTOS ----------------------- */

    const [event, setEvent] = useState([{}])

    const getEventsByHotel = async () => {
        try {
            const { data } = await axios(`http://localhost:3022/event/getByHotel/${id}`)
            setEvent(data.events)
        } catch (err) {
            Swal.fire(err.response.data.message, '', 'error')
            console.error(err)
        }
    }

    const deleteEvents = async (id) => {
        try {
            Swal.fire({
                title: 'Are you sure to delete this event?',
                text: 'This action is irreversible',
                icon: 'question',
                showConfirmButton: true,
                showDenyButton: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await axios.delete(`http://localhost:3022/event/delete/${id}`).catch(
                        (err) => {
                            Swal.fire(err.response.data.message, '', 'error')
                        })
                    getEventsByHotel()
                    Swal.fire(`${data.message}`, '', 'success')
                } else {
                    Swal.fire('No worries!', '', 'success')
                }
            })
        } catch (err) {
            Swal.fire(err.response.data.message, '', 'error')
            console.error(err)
        }
    }

    /* ---------------- ROOMs ----------------------- */
    const [rooms, setRooms] = useState([{}])
    const [room, setRoom] = useState({})
    const [servicesRooms, setServicesRooms] = useState([{}])

    const getRooms = async () => {
        try {
            const { data } = await axios(
                `http://localhost:3022/room/get-by-hotel/${id}`,
                {
                    headers: headers
                }
            )
            console.log(data);
            setRooms(data.rooms)
        } catch (err) {
            console.error(err);
        }
    }

    const getRoom = async (a) => {
        try {
            const { data } = await axios(
                `http://localhost:3022/room/get/${a}`,
                {
                    headers: headers
                }
            )
            setRoom(data.room)
        } catch (err) {
            console.error(err);
        }
    }

    const getServicesRoom = async (i) => {
        try {
            const { data } = await axios(
                `http://localhost:3022/room/get-services-room/${i}`,
                {
                    headers: headers
                }
            )
            setServicesRooms(data.services)
        } catch (err) {
            console.error(err);
        }
    }

    const delRoom = async (i) => {
        try {
            const { isConfirmed } = await Sweeta.fire({
                title: `Are you sure to delete this room?`,
                icon: 'question',
                showConfirmButton: true,
                showDenyButton: true
            })
            if (isConfirmed) {
                const { data } = await axios.delete(
                    `http://localhost:3022/room/delete/${id}`,
                    {
                        headers: headers
                    }
                )
                getRooms()
                Sweeta.fire({
                    title: `ROOM DELETED`,
                    text: `${data.message}`,
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false
                })
            }
        } catch (err) {
            console.error(err);
            Sweeta.fire({
                title: `${err.response.data.message}`,
                icon: 'error',
                showConfirmButton: true
            })
        }
    }

    useEffect(() => {
        getEventsByHotel()
        getHotel()
        getRooms()
    }, [])

    return (

        <div className="main-content">
            <div className="container">

                <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white mb-4'>

                    <h1 className='h1TE text-center'>Check Hotel</h1>

                </div>

                <div className="row justify-content-center">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                            <div className="hotel-card_info p-4">
                                <h1 className='text-center'>Hotel Information</h1>

                                <div className=" align-items-center mb-2">

                                    <h5 className=" mr-2 mt-3">Name</h5>
                                    <input type="text" className="form-control" defaultValue={hotel.name} name='name' onChange={handleChange} />
                                    <h5 className=" mr-2 mt-3">Address</h5>
                                    <input type="text" className="form-control" defaultValue={hotel.address} name='address' onChange={handleChange} />
                                    <h5 className=" mr-2 mt-3">Phone</h5>
                                    <input type="text" className="form-control" defaultValue={hotel.phone} name='phone' onChange={handleChange} />
                                    <h5 className=" mr-2 mt-3">Email</h5>
                                    <input type="text" className="form-control" defaultValue={hotel.email} name='email' onChange={handleChange} />
                                    <h5 className=" mr-2 mt-3">Photos</h5>
                                    <label htmlFor="note">*este campo no es requerido, ya que modifica todas las fotos</label>
                                    <div className='d-flex'>
                                        <input type="file" className="form-control" name='images' multiple accept='image/png, image/jpg, image/jpeg' onChange={(e) => handleImages(e)} />
                                    </div>


                                </div>

                                <button className="btn btn-warning me-1 mt-4 bi bi-pencil" onClick={(e) => upda(e)}> Update</button>
                                <button className="btn btn-danger me-1 mt-4 bi bi-trash" onClick={(e) => del(e)}> Delete</button>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-4">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                            <div className="hotel-card_info p-4">
                                <h1 className='text-center'>Services</h1>

                                <div className=" align-items-center">

                                    <div className="d-flex flex-column text-center mb-1">

                                        <ModalAddServiceHotel />

                                        <CardHotelServices />
                                        <CardHotelServices />

                                        <button className="btn btn-success me-1" type="button" data-bs-toggle="modal" data-bs-target="#modalAddServiceHotel">Add Service</button>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-4">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                            <div className="hotel-card_info p-4">
                                <h1 className='text-center'>Events</h1>

                                <div className=" align-items-center mb-2">

                                    <div className="d-flex flex-column text-center p-3">

                                        <ModalAddEvent hotel={id} />
                                        {
                                            event.length > 0 ? (
                                                event.map((i, index) => (
                                                    <CardHotelEvents
                                                        key={index}
                                                        name={i.name}
                                                        description={i.description}
                                                        type={i.type}
                                                        maxPersons={i.maxPersons}
                                                        price={i.price}
                                                        hotel={id}
                                                        id={i._id}
                                                        butDelete={() => deleteEvents(i._id)}
                                                        butEdit={``}
                                                    />
                                                ))
                                            ) : (
                                                <p className='textNormalHotel'>No events available</p>
                                            )
                                        }


                                        <button className="btn btn-success me-1" type="button" data-bs-toggle="modal" data-bs-target="#modalAddEvent">Add Event</button>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mt-4">

                    <div className="col-sm-9 col-md-9 col-lg-9 mt-2">

                        <h1 className='text-center'>Rooms</h1>

                        <div className='row justify-content-start mt-3'>

                            <div className='col-md-5'>

                                <select name="state" className='form-select'>

                                    <option value={null}>FILTER</option>

                                </select>

                            </div>

                            <div className='col-md-7'>

                                <input type="text" placeholder='Search' className='form-control' />

                            </div>

                            <div className='mt-3'>
                                <button className="btn btn-success col-md-12" type="button" data-bs-toggle="modal" data-bs-target="#modalAddRoom">Add Room</button>
                            </div>

                        </div>

                    </div>

                    <div className="col-sm-9 col-md-9 col-lg-9 mt-2">

                        <ModalAddRoom id={id} getRooms={getRooms} />

                        {
                            rooms.map(({ _id, code, status, type, price, beds, photos, services }, index) => {
                                return (
                                    <>

                                        <CardRoomPage
                                            key={`CR-${index}`}
                                            _id={_id}
                                            code={code}
                                            status={status}
                                            type={type}
                                            price={price}
                                            beds={beds}
                                            photos={photos}
                                            i={index}
                                            butRoom={() => delRoom(_id)}
                                            butUpda={() => getRoom(_id)}
                                            butSerRoom={() => getServicesRoom(_id)}
                                            butGetRoom={getRooms}
                                        />
                                        <ModalCheckServices
                                            key={`MCS-${index}`}
                                            id={_id}
                                            services={services}
                                            getRooms={getRooms}

                                        />
                                        <ModalAddService
                                            key={`MAD-${index}`}
                                            id={_id}
                                            services={servicesRooms}
                                            getRooms={getRooms}
                                            getServices={() => getServicesRoom(_id)}
                                        />
                                        <ModalUpdateRoom
                                            key={`MU-${index}`}
                                            id={_id}
                                            code={room?.code}
                                            status={room?.status}
                                            price={room?.price}
                                            type={room?.type}
                                            beds={room?.beds}
                                            hotel={id}
                                            getRooms={getRooms}
                                        />
                                    </>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </div>

    )
}
