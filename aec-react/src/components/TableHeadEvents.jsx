import React from 'react'

export const TableHeadEvents = () => {
    return (
        <thead className='tHeadTableEvent' style={{ backgroundColor: '#04135d' }}>
            <tr>
                <th className='thTE' scope="col">Name Event</th>
                <th className='thTE' scope="col">Type</th>
                <th className='thTE' scope="col">Capacity</th>
                <th className='thTE' scope="col">Price</th>
                <th className='thTE text-center' scope="col">Actions</th>
            </tr>
        </thead>
    )
}
