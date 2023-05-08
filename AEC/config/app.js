'use strict'

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3022

/* ROUTES */
const userRoutes = require('../src/user/user.routes')
const hotelRoutes = require('../src/hotel/hotel.routes')
const roomRoutes = require('../src/room/room.routes')
const serviceRoutes = require('../src/service/service.routes')
const eventRoutes = require('../src/event/event.routes')
const reservationRoutes = require('../src/reservation/reservation.routes')
const billRoutes = require('../src/bill/bill.routes')

/* SERVER */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use('/user', userRoutes)
app.use('/hotel', hotelRoutes)
app.use('/room', roomRoutes)
app.use('/service', serviceRoutes)
app.use('/event', eventRoutes)
app.use('/reservation', reservationRoutes)
app.use('/bill', billRoutes)

/* START SERVER */
exports.initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}