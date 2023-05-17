import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Sweeta from 'sweetalert2'

export const AddHotelPage = () => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
    const navigate = useNavigate()
    const [imgs, setImgs] = useState()
    const [admins, setAdmins] = useState([{}])
    const [form, setForm] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        admin: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
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

    const getAdmins = async () => {
        try {
            const { data } = await axios('http://localhost:3022/hotel/get-admins', { headers: headers });
            if (data.admins)
                setAdmins(data.admins)
            console.log(data);
        } catch (err) {
            console.error(err);
            Sweeta.fire({
                title: `${err.response.data.message}`,
                icon: 'error',
                showConfirmButton: true
            })
        }
    }

    const add = async (e) => {
        try {
            e.preventDefault()
            let msg = validateData(form)
            if (msg)
                return Sweeta.fire({
                    title: `PARAMS REQUIRED`,
                    text: msg,
                    icon: 'warning',
                    iconColor: 'orange',
                    showConfirmButton: true
                })
            if (!imgs)
                return Sweeta.fire({
                    title: `IMAGE REQUIRED`,
                    text: `Se requiere como minimo una imagen`,
                    icon: 'warning',
                    iconColor: 'orange',
                    showConfirmButton: true
                })
            const { data } = await axios.post('http://localhost:3022/hotel/save', form, { headers: headers })
            await axios.put(
                `http://localhost:3022/hotel/upload-imgs/${data.HI}`,
                imgs,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': localStorage.getItem('token')
                    }
                }
            )
            Sweeta.fire({
                title: `HOTEL CREATED`,
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
                    title: `Ya existe un hotel con el nombre ${form.name.toUpperCase()}`,
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

    useEffect(() => {
        getAdmins()
    }, [form])

    return (
        <div className="main-content">
            <div className="container">

                <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white mb-4'>

                    <h1 className='h1TE text-center'>Add Hotel</h1>

                </div>

                <div className="row justify-content-center">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                            <div className="hotel-card_info p-4">
                                <h1 className='text-center'>Hotel Information</h1>

                                <div className=" align-items-center mb-2">
                                    <h5 className=" mr-2 mt-3">Name</h5>
                                    <input type="text" className="form-control" name='name' onChange={handleChange} />
                                    <h5 className=" mr-2 mt-3">Address</h5>
                                    <input type="text" className="form-control" name='address' onChange={handleChange} />
                                    <h5 className=" mr-2 mt-3">Phone</h5>
                                    <input type="text" className="form-control" name='phone' onChange={handleChange} />
                                    <h5 className=" mr-2 mt-3">Email</h5>
                                    <input type="text" className="form-control" name='email' onChange={handleChange} />
                                    <h5 className=" mr-2 mt-3">Admin</h5>
                                    <select className="form-select" name="admin" onChange={handleChange}>
                                        <option>Select Admin</option>
                                        {
                                            admins.map(({ _id, name, surname }, index) => {
                                                return (
                                                    <option key={index} value={_id}>{`${name} ${surname}`}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <h5 className=" mr-2 mt-3">Photos</h5>
                                    <label htmlFor="note">*se necesita como minimo una imagen</label>
                                    <div className='d-flex'>
                                        <input type="file" className="form-control" name='images' multiple accept='image/png, image/jpg, image/jpeg' onChange={(e) => handleImages(e)} />
                                    </div>
                                </div>

                                <button className="btn btn-success me-1 mt-4" onClick={(e) => add(e)}>Add Hotel</button>
                                <Link to={'/dashboard/hotelPage'}>
                                    <button className="btn btn-danger me-1 mt-4">Cancel</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
