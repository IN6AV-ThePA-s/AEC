import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../index'
import { CardRoomClientPage } from '../../components/CardRoomClientPage'
import { ModalCheckServicesClient } from '../../components/ModalCheckServicesClient'

export const RoomPageClient = () => {

    const { id } = useParams()
    const navigate = useNavigate();
    
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

    
    const [allRooms, setAllRooms] = useState([{}])
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getAllRooms = async ()=>{
        try {
            const { data } = await axios(
                `http://localhost:3022/room/get`,
                {
                    headers: headers
                }
            )
            setAllRooms(data.rooms, console.log(data.rooms))

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllRooms()
    }, [])
    

    return (
        <>
            <div
                style={{ backgroundColor: '#ffffff', borderRadius: '15px' }}
                className="text-black shadow-lg"
            >
                <h1 className="h1TE text-center">Rooms</h1>
            </div>

            <div className="row justify-content-start mb-4 mt-3">
                <div className="col-md-5">
                    <select id='selectOption' name="state" className="form-select">
                        <option value={null}>FILTER</option>
                        <option value='name'>NAME</option>
                        <option value='addresss'>ADDRESS</option>
                    </select>
                </div>
                <div className="col-md-7">
                    <input
                        type="text"
                        placeholder="Search"
                        className="form-control"


                    />
                </div>
            </div>

            {
                allRooms.map(({ _id, code, status, type, price, beds, photos, services }, index) => {
                    return (
                        <>

                            <ModalCheckServicesClient id={_id} idRoom={_id} listServices={services} />
                            <CardRoomClientPage
                                key={`CR-${index}`}
                                _id={_id}
                                code={code}
                                status={status}
                                type={type}
                                price={price}
                                beds={beds}
                                photos={photos}
                                i={index}
                                
                            />
                            
                        </>
                    )
                })
            }
        </>
    )
}
