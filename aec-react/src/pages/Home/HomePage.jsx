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
                <div class="container h-100">
                    <div class="d-flex justify-content-center h-100">
                        <div class="searchbar">
                            <input class="search_input" type="text" name="" placeholder="Search..." />
                            <a href="#" class="search_icon"><i class="fas fa-search"></i></a>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center flex-wrap mb-3 mt-3 mx-3 '>
                    {
                        hotels.map(({_id, name, address,photos},index) => {
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
