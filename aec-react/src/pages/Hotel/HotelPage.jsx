import { useEffect, useState, useContext } from 'react'
import './styleHotelPage.css'
import { Link, useNavigate } from 'react-router-dom'
import { CardHotelPage } from '../../components/CardHotelPage'
import axios from 'axios'
import Sweeta from 'sweetalert2'


export const HotelPage = () => {
    const navigate = useNavigate();
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

    useEffect(() => {
        getHotels();
    }, []);

    const filteredHotels = hotels.filter((hotel) =>

        hotel.name?.toLowerCase().includes(searchTerm.toLowerCase())

    );

    return (
        <>
            <div className="main-content">
                <div className="container">
                    <div
                        style={{ backgroundColor: '#04135d', borderRadius: '15px' }}
                        className="sticky-top text-white"
                    >
                        <h1 className="h1TE text-center">Hotels</h1>
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
                </div>
            </div>
        </>
    );
};
