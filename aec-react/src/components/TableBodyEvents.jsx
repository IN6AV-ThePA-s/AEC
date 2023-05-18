import React from 'react'
import '../pages/Events/styleTableEvents.css'
import { Link } from 'react-router-dom'

export const TableBodyEvents = ({ name, type, maxPersons, price, butDelete, butEdit }) => {
    return (
        <>
            <tbody>

                <tr>

                    <td className='tdTE align-middle' >{name}</td>
                    <td className='tdTE align-middle' >{type}</td>
                    <td className='tdTE align-middle' >{maxPersons}</td>
                    <td className='tdTE align-middle' >{price}</td>
                    <td className='tdTEB align-middle text-center' >
                        <Link to={butEdit}>

                            <button className="btn btn-warning bi bi-pencil me-1" type="button"> Update</button>

                        </Link>

                        <button className="btn btn-danger bi bi-trash ms-1" type="button" onClick={(e)=>{e.preventDefault(); butDelete()}}> Delete</button>

                    </td>

                </tr>

            </tbody>

        </>
    )
}
