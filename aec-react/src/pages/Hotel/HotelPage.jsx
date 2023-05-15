import React from 'react'
import './styleHotelPage.css'
import foto from '../../assets/foto.png'
import { Link } from 'react-router-dom'
import hotel1 from '../../assets/hotel1.jpg'
import hotel2 from '../../assets/hotel2.jpg'
import hotel3 from '../../assets/hotel3.jpg'
import { CardHotelPage } from '../../components/CardHotelPage'


export const HotelPage = () => {
    return (
        <>

            <div className="main-content">
                <div className="container">

                    <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white'>

                        <h1 className='h1TE text-center'>Hotels</h1>

                    </div>

                    <div className='row justify-content-start mb-4 mt-3'>

                        <div className='col-md-5'>

                            <select name="state" className='form-select'>

                                <option value={null}>FILTER</option>

                            </select>

                        </div>

                        <div className='col-md-7'>

                            <input type="text" placeholder='Search' className='form-control' />

                        </div>


                    </div>

                    <CardHotelPage />

                </div>
            </div>

        </>

    )
}
