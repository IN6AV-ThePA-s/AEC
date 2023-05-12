import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

export const AddHotelPage = () => {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'asdasd' }
    const [images, setImages] = useState();
    const [form, setForm] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        admin: ''
    })

    const validateData = (data) => {
        let keys = Object.keys(data), msg = ''
        for (let key of keys) {
            if (
                data[key] !== null &&
                data[key] !== undefined &&
                data[key] !== ''
            ) continue
            msg += ` "${key.toUpperCase()}",`
        }
        const a = `Param ${msg} is required`
        return a.trim();
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleImages = (e) => {
        let f = new FormData();
        f.append('images', e.target.files);
        setImages(f);
    }

    const add = async (e) => {
        try {
            e.preventDefault()
            let msg = validateData(form)
            if (msg)
                return Swal.fire({
                    title: `${msg}`,
                    icon: 'warning',
                })
            const { data } = await axios.post('http://localhost:3022/hotel/save', form, { headers: headers})
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        console.log(form);
    }, [form])

    return (
        <>
            <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white ms-2 me-4'>
                <h1 className='h1TE text-center'>Add Hotel</h1>
            </div>

            <hr />

            <div className="row justify-content-center "> {/* ms-4 me-4 mb-4 */}

                <div className="col-md-8">
                    <div className="">

                        <div className="row">

                            <div className="col-md-12 mt-3">
                                <label className="labels">Name</label>
                                <input onChange={handleChange} name='name' type="text" maxLength='150' className="form-control" />
                            </div>

                            <div className="col-md-12 mt-3">
                                <label className="labels">Address</label>
                                <input onChange={handleChange} name='address' type="text" className="form-control" />
                            </div>

                            <div className="col-md-12 mt-3">
                                <label className="labels">Phone</label>
                                <input onChange={handleChange} name='phone' type="text" className="form-control" />
                            </div>

                            <div className="col-md-12 mt-3">
                                <label className="labels">Email</label>
                                <input onChange={handleChange} name='email' type="email" className="form-control" />
                            </div>

                            <div className="col-md-12 mt-3">
                                <label className="labels">Email</label>
                                <input onChange={handleChange} name='admin' type="text" className="form-control" />
                            </div>

                            <div className="col-md-12 mt-3">
                                <label className="labels">Imagenes</label>
                                <input onChange={handleImages} name='images' type="file" className="form-control" multiple accept='image/*' />
                            </div>
                        </div>

                        <div className="text-center mt-3">

                            <button onClick={(e) => add(e)} className="btn btn-success me-1" type="button">Add Event</button>

                            <Link to='/dashboard/hotelPage'>
                                <button className="btn btn-danger ms-1" type="button">Cancel</button>
                            </Link>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}