import { useEffect, useState } from 'react'
import axios from 'axios'
import './homeStyle.css'
import { Card } from '../../components/Card'
import { NavbarHome } from '../../components/NavbarHome'


export const HomePage = () => {

    const [hotels, setHotels] = useState([{}])

    const getHotels = async () => {
        try {
            const { data } = await axios('http://localhost:3022/hotel/hotels');
            setHotels(data.hotels)
        } catch (err) {
            console.error(err);
        }
    }

    const [searchOption, setSearchOption] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredHotels = hotels.filter((hotel) => {

        if (!searchOption || searchOption === 'name') {

            return hotel.name?.toLowerCase().includes(searchTerm.toLowerCase());

        } else if (searchOption === 'address') {

            return hotel.address?.toLowerCase().includes(searchTerm.toLowerCase());

        }



    });

    useEffect(() => {
        getHotels();
    }, [])

    return (
        <div className="text-center" >
            <div className='d-flex mx-5 py-2 flex-column text-center conLogin'>

                <NavbarHome />
            </div>
            {<div className="p-5 bg-image" style={{
                height: '250px',
                backgroundImage: `url('https://img.freepik.com/free-photo/fantastic-blue-sky_1203-1929.jpg?w=996&t=st=1683838238~exp=1683838838~hmac=488e0f00855dd85560dee7eaa798f29a16699300c15d4e3f4e9edcad98586d8c')`,
                backgroundSize: 'cover'

            }} >
            </div>}

            <div className="card mx-4 mx-md-5 shadow-5-strong" style={{
                marginTop: '-175px',
                background: `transparent`,
                backdropFilter: `blur(30px)`,
                border: 'none'
            }}>
                <div className="card-body py-5 px-md-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8">
                            <h2 className="fw-bold mb-5">Home</h2>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mb-4 mt-3 text-dark">
                    <div className="col-md-4">
                        <select id='selectOption' name="state" className="form-select" onChange={(e) => setSearchOption(e.target.value)}>
                            <option value='name'>NAME</option>
                            <option value='address'>ADDRESS</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            placeholder="Search"
                            className="form-control"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className='d-flex justify-content-center flex-wrap mb-3 mt-3 mx-3 '>
                    {
                        filteredHotels.map(({ _id, name, address, photos }, index) => {
                            return (
                                <Card
                                    key={index}
                                    id={_id}
                                    name={name}
                                    descripion={address}
                                    photos={photos}
                                    index={index}
                                />
                            )
                        })
                    }
                    {/*  {
                    hotel.map((b, index) => {
                        return (
                            <Card 
                            />
                        )
                    })
                } */}
                </div>
            </div>
            <footer className="mt-auto">
                <p className='text-dark'>Arc-En-Ciel®</p>
            </footer>
        </div>


    )
}
