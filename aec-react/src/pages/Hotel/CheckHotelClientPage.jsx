import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
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
import { AuthContext } from '../../index'

export const CheckHotelClientPage = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const { dataUser } = useContext(AuthContext)
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
    const [hotel, setHotel] = useState({})
    const [imgs, setImgs] = useState()
    const [photos, setPhotos] = useState()

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
            setPhotos(data.hotel.photos)
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
            const { data } = await axios(
                `http://localhost:3022/event/getByHotel/${id}`
                , { headers: headers }
            )
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
                    const { data } = await axios.delete(`http://localhost:3022/event/delete/${id}`, { headers: headers }).catch(
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

    /* ---------------- Services ----------------------- */
    const [service, setService] = useState([{}])

    const getServicesByHotel = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3022/service/get-hotel-service/${id}`, { headers: headers })

            setService(data.services)

        } catch (err) {
            Swal.fire(err.response.data.message, '', 'error')
            console.error(err)
        }
    }

    const deleteService = async (service) => {
        try {
            Swal.fire({
                title: 'Are you sure about delete this service?',
                text: 'This action is irreversible',
                icon: 'question',
                showConfirmButton: true,
                showDenyButton: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await axios.delete(`http://localhost:3022/service/delete/${service}`, { headers: headers }).catch((err) => {
                        Swal.fire(err.response.data.message, '', 'error')
                    })
                    getServicesByHotel()
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
                    `http://localhost:3022/room/delete/${i}`,
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
        getServicesByHotel()
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
                                <h1 className='text-center'>{hotel.name}'s Information</h1>

                                <div className=" align-items-center mb-2">

                                    <h5 className=" mr-2 mt-3">Name</h5>
                                    <input type="text" readOnly className="form-control" defaultValue={hotel.name} name='name' onChange={handleChange} />
                                    <h5 className=" mr-2 mt-3">Address</h5>
                                    <input type="text" readOnly className="form-control" defaultValue={hotel.address} name='address' onChange={handleChange} />
                                    <h5 className=" mr-2 mt-3">Phone</h5>
                                    <input type="text" readOnly className="form-control" defaultValue={hotel.phone} name='phone' onChange={handleChange} />
                                    <h5 className=" mr-2 mt-3">Email</h5>
                                    <input type="text" readOnly className="form-control" defaultValue={hotel.email} name='email' onChange={handleChange} />
                                    <h5 className=" mr-2 mt-3">Photos</h5>
                                    <div id={`bootstrapCarousel`} className="carousel slide h-100" data-ride="carousel">
                                        <div className="carousel-inner h-100">
                                            {
                                                photos?.map((name, index) => {
                                                    return (
                                                        <div key={index} className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}>
                                                            <img crossOrigin='anonymous' src={`http://localhost:3022/hotel/get-img/${name}`} className="d-block w-100" alt="Hotel Image" />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <a className="carousel-control-prev" href={`#bootstrapCarousel`} role="button" data-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-control-next" href={`#bootstrapCarousel`} role="button" data-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Next</span>
                                        </a>
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
                                <h1 className='text-center'>Services</h1>

                                <div className=" align-items-center">

                                    <div className="d-flex flex-column text-center mb-1">

                                        
                                        {
                                            service.length > 0 ? (
                                                service.map(({ service, description, price, hotel, _id }, index) => {
                                                    return (
                                                        <CardHotelServices
                                                            key={index}
                                                            name={service}
                                                            description={description}
                                                            price={price}
                                                            hotel={hotel}
                                                            id={_id}
                                                            dataUser={dataUser.role}
                                                            butDel={() => deleteService(_id)}
                                                            butEdit={``}
                                                        />
                                                    )
                                                })
                                            ) : (
                                                <p className='textNormalHotel'>No services available</p>
                                            )
                                        }


                                        

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
                                                        dataUser={dataUser.role}
                                                        butDelete={() => deleteEvents(i._id)}
                                                        butEdit={``}
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


                        </div>

                    </div>

                    <div className="col-sm-9 col-md-9 col-lg-9 mt-2">


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
                                            dataUser={dataUser.role}
                                            butRoom={() => delRoom(_id)}
                                            butUpda={() => getRoom(_id)}
                                            butSerRoom={() => getServicesRoom(_id)}
                                            butGetRoom={getRooms}
                                        />
                                        <ModalCheckServices
                                            key={`MCS-${index}`}
                                            id={_id}
                                            dataUser={dataUser.role}
                                            services={services}
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
