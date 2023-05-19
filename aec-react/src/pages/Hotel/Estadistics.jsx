import React, { useEffect, useState } from 'react'
import './styleHotelPage.css'
import { Bar } from 'react-chartjs-2'
import axios from 'axios'
import { Chart } from 'chart.js/auto'

export const Estadistics = () => {
    const [reservations, setReservations] = useState([])
    const [hotel, setHotel] = useState()
    let i = 0
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
    
    const getReservation = async() => {
        try {
            const { data } = await axios.get(`http://localhost:3022/hotel/get`, {headers: headers})
            let hotels = []
            let res = []
            data.hotels?.map(async({_id, name}) => {
                hotels.push(name)
                const { data } = await axios.get(`http://localhost:3022/reservation/resHotel/${_id}` , {headers: headers})
                console.log(data.getResHotel.length);
                res.push(data.getResHotel.length)
                
                
            })
            
            setHotel(hotels)
            setReservations(res)
            
        } catch (err) {
            console.error(err)
        }
    }

    const chart = () => {
        const ctx = document.getElementById('mychart')
        var mychart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: opciones
        })
        mychart.destroy()
        mychart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: opciones
        })
        console.log(ctx);
    }
    
    useEffect(() => {
      getReservation()
      
    }, [])

    const data = {
        labels: hotel,
        datasets: [{
            label: 'res',
            backgroundColor: 'rgba(0,255,0,1)',
            borderColor: 'black',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(0,255,0,0.2)',
            hoverBorderColor: '#FF0000',
            data: reservations
        }]
    }

    const opciones = {
        maintainAspectRadio: false,
        responsive: true
    }
    

    return (
        <>
            <div
                style={{ backgroundColor: '#04135d', borderRadius: '15px' }}
                className="sticky-top text-white"
            >
                <h1 className="h1TE text-center">Estadistics</h1>
            </div>

            <div className='m-2'>
                <p className='m-2'><b>Estadistics of all hotels</b></p>
                <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{width: '750px', height:'630px'}}>
                    
                    <canvas id='mychart'></canvas>
                    
                </div>
                <button className='btn btn-success' onClick={()=>chart()}>Get</button>
            </div>
        </>
        
    )
}
