import React from 'react'
import { CardBill } from '../../components/CardBill'

export const BillPage = () => {
    return (
        <div className="main-content">
            <div className="container">

                <div style={{ backgroundColor: '#04135d', borderRadius: '15px' }} className='sticky-top text-white'>

                    <h1 className='h1TE text-center'>Bill</h1>

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

                <div className="row justify-content-center mt-4">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <div className="hotel-card bg-white rounded-lg shadow-lg overflow-hidden d-block d-lg-flex">
                            <div className="hotel-card_info p-4">

                                <div className=" align-items-center">

                                    <div className="d-flex flex-column text-center p-3">

                                        <CardBill/>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}