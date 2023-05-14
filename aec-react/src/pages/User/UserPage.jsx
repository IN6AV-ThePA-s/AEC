import React from 'react'
import { CardUserPage } from '../../components/CardUserPage'

export const UserPage = () => {
    return (
        <div className="main-content">
            <div className="container">

                <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white'>

                    <h1 className='h1TE text-center'>Users</h1>

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

                <CardUserPage />

            </div>
        </div>
    )
}
