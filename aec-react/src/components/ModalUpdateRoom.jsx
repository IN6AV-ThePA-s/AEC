import { useEffect, useState } from 'react'
import axios from 'axios'
import Sweeta from 'sweetalert2'
import '../pages/Hotel/styleModalUpdateRoom.css'

export const ModalUpdateRoom = ({ id, hotel, code, type, status, price, beds, getRooms }) => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
    const [imgs, setImgs] = useState()

    const handleImages = (e) => {
        let fU = new FormData()
        for (let img of e.target.files) {
            fU.append('images', img)
        }
        setImgs(fU)
    }

    const upda = async () => {
        try {
            const roomInfo = {
                hotel: hotel,
                code: document.getElementById('code').value,
                type: document.getElementById('type').value,
                status: document.getElementById('status').value,
                price: document.getElementById('price').value,
                beds: {
                    name: document.getElementById('name').value,
                    cant: document.getElementById('cant').value,
                    capacity: document.getElementById('capacity').value
                }
            }
            if (imgs) {
                await axios.put(
                    `http://localhost:3022/room/upload-imgs/${id}`,
                    imgs,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': localStorage.getItem('token')
                        }
                    }
                )
            }
            const { data } = await axios.put(`http://localhost:3022/room/update/${id}`, roomInfo, { headers: headers })
            getRooms()
            Sweeta.fire({
                title: `ROOM UPDATED`,
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
        <div className="modal fade" id={`modalUpdateRoom${id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">Update Room {id}</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h5 className="form-label">Code</h5>
                        <input type="text" className="form-control" defaultValue={code} id='code' />

                        <h5 className="form-label mt-2">Status</h5>
                        <select className="form-control" id='status' defaultValue={status} >

                            <option>Select Option</option>
                            <option value='AVALIABLE'>AVALIABLE</option>
                            <option value='BUSY'>BUSY</option>

                        </select>

                        <h5 className="form-label mt-2">Price</h5>
                        <input type="number" className="form-control" id='price' defaultValue={price} />

                        <h5 className="form-label mt-2">Type</h5>
                        <input type="text" className="form-control" id='type' defaultValue={type} />
                        <div className='row'>
                            <h5 className="form-label mt-2">Beds</h5>
                            <div className='col-md-4'>
                                <h6 className="form-label ">Name</h6>
                                <input type="text" className="form-control" id='name' defaultValue={beds?.name} />
                            </div>
                            <div className='col-md-4'>
                                <h6 className="form-label ">Amount</h6>
                                <input type="text" className="form-control" id='cant' defaultValue={beds?.cant} />
                            </div>
                            <div className='col-md-4'>
                                <h6 className="form-label ">Capacity</h6>
                                <input type="text" className="form-control" id='capacity' defaultValue={beds?.capacity} />
                            </div>

                        </div>

                        <h5 className="form-label mt-2">Photos</h5>
                        <label htmlFor="note">*este campo no es requerido, ya que modifica las imagenes existentes</label>
                        <input type="file" className="form-control" name='images' multiple accept='image/png, image/jpg, image/jpeg' onChange={(e) => handleImages(e)} />

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={(e) => { e.preventDefault(); upda() }}>Update Room</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
