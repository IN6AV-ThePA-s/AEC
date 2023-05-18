import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../index'
import { CardHotelPage } from '../../components/CardHotelPage'


export const HotelPageClient = () => {

    /* -------------------- HOTEL ------------------------- */

    const navigate = useNavigate()
    const { dataUser } = useContext(AuthContext)
    const [photo, setPhoto] = useState()
    const [user, setUser] = useState({})

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const handleImageError = (e) => {
        e.target.src = photoError;
    };

    const [hotels, setHotels] = useState([{}]);
    const [searchTerm, setSearchTerm] = useState('');

    const getHotels = async () => {
        try {
            const { data } = await axios('http://localhost:3022/hotel/get', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token'),
                },
            });
            setHotels(data.hotels);
        } catch (err) {
            console.error(err);
            Sweeta.fire({
                title: `${err.response.data.message}`,
                icon: 'error',
                showConfirmButton: true,
            });
        }
    };

    const [searchOption, setSearchOption] = useState(null);

    const filteredHotels = hotels.filter((hotel) => {

        if (!searchOption || searchOption === 'name') {

            return hotel.name?.toLowerCase().includes(searchTerm.toLowerCase());

        } else if (searchOption === 'address') {

            return hotel.address?.toLowerCase().includes(searchTerm.toLowerCase());

        }

        return false;

    });

    useEffect(() => {
        getHotels();
    }, [])

    return (
        <>
            <div
                style={{ backgroundColor: '#ffffff', borderRadius: '15px' }}
                className="text-black shadow-lg"
            >
                <h1 className="h1TE text-center">Hotels</h1>
            </div>

            <div className="row justify-content-start mb-4 mt-3">
                <div className="col-md-5">
                    <select id='selectOption' name="state" className="form-select" onChange={(e) => setSearchOption(e.target.value)}>
                        <option value={null}>FILTER</option>
                        <option value='name'>NAME</option>
                        <option value='address'>ADDRESS</option>
                    </select>
                </div>
                <div className="col-md-7">
                    <input
                        type="text"
                        placeholder="Search"
                        className="form-control"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {
                filteredHotels.map(
                    ({ _id, name, address, email, phone, photos }, index) => {
                        return (
                            <CardHotelPage
                                key={index}
                                _id={_id}
                                name={name}
                                address={address}
                                email={email}
                                phone={phone}
                                photos={photos}
                                index={index}
                            />
                        );
                    }
                )
            }
        </>
    )
}
