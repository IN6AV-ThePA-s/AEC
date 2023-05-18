import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Sweeta from 'sweetalert2'
import '../pages/Hotel/styleModalUpdateRoom.css'

export const ModalAddRoom = ({id, getRooms}) => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
    const navigate = useNavigate()
    const [imgs, setImgs] = useState()
    const [form, setForm] = useState({
        hotel: id,
        code: '',
        type: '',
        status: '',
        price: '',
        beds: {
            name: '',
            cant: '',
            capacity: ''
        }
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleObjectBeds = (e)=>{
        setForm({
            ...form,
            beds: {
                ...form.beds,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleImages = (e) => {
        let fA = new FormData()
        for (let img of e.target.files) {
            fA.append('images', img)
        }
        setImgs(fA)
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
            const { data } = await axios.post('http://localhost:3022/room/add', form, { headers: headers })
            await axios.put(
                `http://localhost:3022/room/upload-imgs/${data.RI}`,
                imgs,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': localStorage.getItem('token')
                    }
                }
            )
            getRooms()
            Sweeta.fire({
                title: `ROOM CREATED`,
                text: `${data.message}`,
                icon: 'success',
                timer: 2500,
                showConfirmButton: false
            })
        } catch (err) {
            console.error(err);
            if (err.response.data.error) {
                return Sweeta.fire({
                    title: `Ya existe una habitacion con el nombre ${form.name.toUpperCase()}`,
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
    }, [])

    return (
        <div className="modal fade" id="modalAddRoom" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Add Room</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h5 className="form-label">Code</h5>
                        <input type="text" className="form-control" name='code' onChange={handleChange}/>

                        <h5 className="form-label mt-2">Status</h5>
                        <select className="form-control" name='status' onChange={handleChange}>

                            <option value={null}>Select Option</option>
                            <option value={null}>AVALIABLE</option>
                            <option value={null}>BUSY</option>

                        </select>

                        <h5 className="form-label mt-2">Price</h5>
                        <input type="number" className="form-control" name='price' onChange={handleChange}/>
                        
                        <h5 className="form-label mt-2">Type</h5>
                        <input type="text" className="form-control" name='type' onChange={handleChange}/>
                        <div className='row'>
                            <h5 className="form-label mt-2">Beds</h5>
                            <div className='col-md-4'>
                                <h6 className="form-label ">Name</h6>
                                <input type="text" className="form-control" name='name' onChange={handleObjectBeds}/>
                            </div>
                            <div className='col-md-4'>
                                <h6 className="form-label ">Amount</h6>
                                <input type="text" className="form-control" name='cant' onChange={handleObjectBeds}/>
                            </div>
                            <div className='col-md-4'>
                                <h6 className="form-label ">Capacity</h6>
                                <input type="text" className="form-control" name='capacity' onChange={handleObjectBeds}/>
                            </div>

                        </div>

                        <h5 className="form-label mt-2">Photos</h5>
                        <label htmlFor="note">*se necesita como minimo una imagen</label>
                        <input type="file" className="form-control" name='images' multiple accept='image/png, image/jpg, image/jpeg' onChange={(e) => handleImages(e)} />

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={(e)=>add(e)}>Add Room</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
