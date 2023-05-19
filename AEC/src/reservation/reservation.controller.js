'use strict'
const User = require('../user/user.model')
const Room = require('../room/room.model')
const Service = require('../service/service.model')
const Event = require('../event/event.model')
const Reservation = require('./reservation.model')
const Hotel = require('../hotel/hotel.model')
const Bill = require('../bill/bill.model')
const hotelPop = {
    path:'room',
    select:'_id cod price type beds services hotel',
    populate:{
        path:'hotel',
        select:' _id name address phone email '
    }
}
const servRoomPop = {
    path:'room',
    populate:{
        path:'services',
        populate:{
            path:'service',
            select:' service description price '
        }
    }
}
const servicePop = {
    path:'additionalServices',
    select:'service description price',
}

exports.test = (req, res) => {
    res.send({ message: 'Test reservations '})
} 

exports.addReservation = async(req,res) =>{
    try {
        //obtener los datos 
        let data = req.body
        let userLoggued = req.user   
        let cod 
        //validar que los datos que dependen de otras entidades existan
        //User
        //validar cual es su rol
        let existsUser = await User.findOne({_id:data.client})
        if(!existsUser) return res.status(404).send({message:'User not found'})
        // //Room
        let existsRoom = await Room.findOne({_id:data.room,status:"AVAILABLE"}).populate('hotel')
        if(!existsRoom) return res.status(404).send({message:'Room not found or not available'})
        let existaRooms = await Room.find({hotel:existsRoom.hotel})
        const reservation = await Reservation.find({room:existaRooms})
        cod = reservation.length +1
        if(userLoggued.role == 'CLIENT'){
            if(data.client != userLoggued.sub)
                return res.send({message:'You can not made a reservation that not is yours'})
        }else if(userLoggued.role == 'ADMIN'){
            //validar que sea admin del hotel
            let existsHotel = await Hotel.findOne({admin:userLoggued.sub})
            if(existsRoom.hotel != existsHotel._id)
                return res.status(403).send({message:'You are not admin of this hotel'})
        }
        //validar que el numero de personas que se asignan no se mayor al de la capacidad de la habitacion
        let capacity = existsRoom.beds.cant * existsRoom.beds.capacity
        if(data.numberOfPeople>capacity) return res.status(418).send({message:`The room only is suitable for ${capacity} persons`})
        //agregar el precio al subtotal
        let subTotal = (existsRoom.price * data.numberOfNight);
        // //Service
        if(data.additionalServices){
            if(Array.isArray(data.additionalServices)){
                for(let service of data.additionalServices){
                    let existsService = await Service.findOne({_id:service,hotel:existsRoom.hotel})
                    if(!existsService) return res.status(404).send({message:`Service whit code ${service} not found`})
                    subTotal += (existsService.price * data.numberOfNight);
                }    
            }else{
                let existsService = await Service.findOne({_id:data.additionalServices,hotel:existsRoom.hotel})
                if(!existsService) return res.status(404).send({message:'Service not found'})
                subTotal += (existsService.price * data.numberOfNight);
            }
        }
        // //Event
        if(data.events){
            if(Array.isArray(data.events)){
                for(let event of data.events){
                    let existsEvent = await Event.findOne({_id:event})
                    //
                    if(!existsEvent) return res.status(404).send({message:'Event not found'})
                    if(existsEvent.maxPersons == 0) return res.status(418).send({message:`Event ${existsEvent.name} is full`})
                    if(data.numberOfPeople>existsEvent.maxPersons) 
                        return res.send({message:`Event ${existsEvent.name} no longer accepts that number of people`})
                    subTotal += existsEvent.price;    
                    await Event.findOneAndUpdate(
                        {_id:existsEvent._id},
                        {maxPersons:existsEvent.maxPersons-data.numberOfPeople}
                    )
                }
            }else{
                let existsEvent = await Event.findOne({_id:data.events})
                //
                if(!existsEvent || existsEvent.maxPersons == 0) return res.status(404).send({message:'Event not found or is full'})
                if(data.numberOfPeople>existsEvent.maxPersons) 
                    return res.send({message:'This event no longer accepts that number of people'})
                subTotal += existsEvent.price;    
                await Event.findOneAndUpdate(
                    {_id:existsEvent._id},
                    {maxPersons:existsEvent.maxPersons-data.numberOfPeople}
                )
            }
        }
        //guardar los datos
        data.numberRes = cod;
        data.total = subTotal;
        let newReservation = new Reservation(data)
        await newReservation.save()
        await Room.findOneAndUpdate(
            {_id:existsRoom._id},
            {status:'BUSY'}
        ) 
        //retornar los datos
        return res.send({message:'Reservation added successfully',newReservation})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error adding reservation'})
    }
}

exports.cancelReserv = async(req,res) =>{
    try {
        //obtener el id de la reservacion y los datos del usuario logueado
        let id = req.params.id
        let userLoggued = req.user   
        //regresar los datos de la reserva a su valor original
        let existsReserv = await Reservation.findOne({_id:id,status:'PROGRESS'}).populate('room')
        if(!existsReserv) return res.status(404).send({message:'Reservation not found or already paid'})
        //validar cual es su rol
        if(userLoggued.role == 'CLIENT'){
            if(existsReserv.client != userLoggued.sub)
                return res.status(403).send({message:'You can not cancel a reservation that not is yours'})
        }else if(userLoggued.role == 'ADMIN'){
            //validar que sea admin del hotel
            let existsHotel = await Hotel.findOne({admin:userLoggued.sub})
            if(existsReserv.room.hotel.toString() != existsHotel._id.toString())
                return res.status(403).send({message:'You are not admin of this hotel'})
        }
        //Event
        if(existsReserv.events){
            if(Array.isArray(existsReserv.events)){
                for(let event of existsReserv.events){
                    let existsEvent = await Event.findOne({_id:event})           
                    await Event.findOneAndUpdate(
                        {_id:existsEvent._id},
                        {maxPersons:existsEvent.maxPersons + existsReserv.numberOfPeople}
                    )
                }
            }else{
                let existsEvent = await Event.findOne({_id:existsReserv.events})
                await Event.findOneAndUpdate(
                    {_id:existsEvent._id},
                    {maxPersons: existsEvent.maxPersons + existsReserv.numberOfPeople}
                )
            }
        }
        await Room.findOneAndUpdate(
            {_id:existsReserv.room},
            {status:'AVAILABLE'}
        )
        //eliminar la reservación
        let canceled = await Reservation.findOneAndUpdate(
            {_id:id,status:'PROGRESS'},
            {status:'CANCELED'},
            {new:true}
        )
        if(!canceled) return res.status(404).send({message:'Error canceled Reservation'}) 
        return res.send({message:'Reservation canceled successfully',canceled})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error canceling reservation'}) 
    }
}

exports.geteClientHotl = async(req,res) =>{
    try {
        let {id} = req.params
        let userLoggued = req.user
        let existsClinet = await User.findOne({_id:id})
        if(!existsClinet) return res.status(404).send({message:'User not found'})
        let existsHotel = await Hotel.findOne({admin:userLoggued.sub})
        let existsRooms = await Room.find({hotel:existsHotel._id})
        let getResUserHotel = await Reservation.find({client:id,status:'COMPLETED',room:existsRooms})
            .populate({
                path:'room',
                populate:{
                    path:'hotel'
                }
            })
            .populate({
                path:'room',
                populate:{
                    path:'services',
                    populate:{
                        path:'service'
                    }
                }
            })
            .populate({
                path:'client'
            })
            .populate({
                path:'events'
            })
            .populate({
                path:'additionalServices'
            })
        if(!getResUserHotel) return res.status(404).send({message:'This user have not reservations yet'})
            
        return res.send({getResUserHotel})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error getting reservation'}) 
    }
}

exports.getReservPerHotel = async(req,res) =>{
    try {
        let {id} = req.params
        let existsHotel = await Hotel.findOne({_id:id})
        if(!existsHotel) return res.status(404).send({message:'Hotel not found'})
        let rooms = await Room.find({hotel:id})
        if(!rooms) return res.status(404).send({message:'This hotel have not rooms'})
        let getResHotel = await Reservation.find({room:rooms})
            .populate({
                path:'room',
                populate:{
                    path:'hotel'
                }
            })
            .populate({
                path:'room',
                populate:{
                    path:'services',
                    populate:{
                        path:'service'
                    }
                }
            })
            .populate({
                path:'events'
            })
            .populate({
                path:'client'
            })
            .populate({
                path:'additionalServices'
            })
        if(!getResHotel) return res.status(404).send({message:'This hotel have not reservations yet'})
        return res.send({getResHotel})
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error getting reservations")
    }
}

exports.getReservPerId = async(req,res) =>{
    try {
        let {id} = req.params
        let userLoggued = req.user
        let existsReserv = await Reservation.findOne({_id:id,client:userLoggued.sub,status:'PROGRESS'})
                .populate({path:'client',select:'name surname'})
                .populate({path:'events',select:'name'})
                .populate(hotelPop)
                .populate(servRoomPop)
                .populate(servicePop)
        if(!existsReserv) return res.status(404).send({message:'Resevation not found'})
        return res.send({existsReserv})
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error getting reservation")
    }
}

exports.getRservationsUser = async(req,res)=>{
    try {
        let userLoggued = req.user
        let existsReservs = await Reservation.find({client:userLoggued.sub,status:'PROGRESS'})
                .populate({path:'client',select:'name surname'})
                .populate({path:'events',select:'name'})
                .populate(hotelPop)
                .populate(servRoomPop)
                .populate(servicePop)
        if(existsReservs.length==0) return res.send({message:'You have not reservation yet'})
        return res.send({existsReservs})
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error getting reservations")
    }
}

exports.getReservations = async(req,res) =>{
    try {
        let reservations = await Reservation.find()
            .populate({
                path:'room',
                populate:{
                    path:'hotel'
                }
            })
            .populate({
                path:'room',
                populate:{
                    path:'services',
                    populate:{
                        path:'service'
                    }
                }
            })
            .populate({
                path:'client'
            })
            .populate({
                path:'events'
            })
            .populate({
                path:'additionalServices'
            })
        return res.send({reservations})
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error getting reservations")
    }
}

exports.historylUserLogged = async(req,res) =>{
    try {
        //obtener que datos del usuario logueado 
        let userLoggued = req.user
        //obtener sus reservas
        let existsReservs = await Reservation.find({client:userLoggued.sub,status:'COMPLETED'})
            .populate(hotelPop)
            .populate(servRoomPop)
            .populate(servicePop)
        if(existsReservs.length==0) return res.send({message:'You have not made any reservations yet'})
        //obtener solo los datos a mostrar
        return res.send({message:'History',existsReservs})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error getting reservations'})
    }
}

exports.addEvent = async(req,res) =>{
    try {
        //obtener el id de la reservacion, del evento a agregar y los datos del usuario logueado
        let {id,idEvent} = req.params
        let userLoggued = req.user
        //regresar los datos de la reserva a su valor original
        //obtener los datos de la reserva
        let existsReserv = await Reservation.findOne({_id:id,status:'PROGRESS'}).populate('room')
        if(!existsReserv) return res.status(404).send({message:'Reservation not found or already paid or canceled'})
        //validar cual es su rol
        if(userLoggued.role == 'CLIENT'){
            if(existsReserv.client != userLoggued.sub)
                return res.status(403).send({message:'You can not add event a reservation that not is yours'})
        }else if(userLoggued.role == 'ADMIN'){
            //validar que sea admin del hotel
            let existsHotel = await Hotel.findOne({admin:userLoggued.sub})
            if(existsReserv.room.hotel != existsHotel._id)
                return res.status(403).send({message:'You are not admin of this hotel'})
        }
        //verificar que no este asignado ya 
        let existsReservEvent = await Reservation.findOne({_id:existsReserv._id,events:idEvent})        
        if(existsReservEvent) return res.send({message:'You have already been assigned to this event'})
        //verificar que exista el evento y que se puedan asignar personas a el
        let existsEvent = await Event.findOne({_id:idEvent,hotel:existsReserv.room.hotel})
        if(!existsEvent || existsEvent.maxPersons == 0) return res.status(404).send({message:'Event not found or is full'})
        //validar que no se asignen más personas de las que pueden
        if(existsReserv.numberOfPeople>existsEvent.maxPersons) 
            return res.send({message:'This event no longer accepts that number of people'})
        //sumar el precio al total    
        existsReserv.total += existsEvent.price;
        //agregar los datos al array    
        existsReserv.events.push(existsEvent._id)
        //cambair la cantidad de personas que se pueden asignar de el evento
        await Event.findOneAndUpdate(
            {_id:existsEvent._id},
            {maxPersons:existsEvent.maxPersons-existsReserv.numberOfPeople}
        )
        //guardar los datos
        existsReserv.save()
        return res.send({message:'Event adding successfully',existsReserv})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error adding event'})
    }
}

exports.removeEvent = async(req,res) =>{
    try {
        //obtener el id de la reservacion y los datos del usuario logueado
        let {id,idEvent} = req.params
        let userLoggued = req.user
        //regresar los datos de la reserva a su valor original
        let existsReserv = await Reservation.findOne({_id:id,status:'PROGRESS'}).populate('room')
        if(!existsReserv) return res.status(404).send({message:'Reservation not found, already paid or canceled'})
        //validar cual es su rol
        if(userLoggued.role == 'CLIENT'){
            if(existsReserv.client != userLoggued.sub)
                return res.status(403).send({message:'You can not remove event a reservation that not is yours'})
        }else if(userLoggued.role == 'ADMIN'){
            //validar que sea admin del hotel
            let existsHotel = await Hotel.findOne({admin:userLoggued.sub})
            if(existsReserv.room.hotel.toString() != existsHotel._id.toString())
                return res.status(403).send({message:'You are not admin of this hotel'})
        }
        let existsEvent = await Event.findOne({_id:idEvent,hotel:existsReserv.room.hotel})
        if(!existsEvent) return res.status(404).send({message:'Event not found'})
        let existsEventReserv = await Reservation.findOne({_id:existsReserv._id,events:idEvent})
        if(!existsEventReserv) return res.status(404).send({message:'Event not found in reservation'})
        existsReserv.total -= existsEvent.price;
        let index = existsReserv.events.indexOf(idEvent)
        existsReserv.events.splice(index,1)
        existsReserv.save()
        return res.send({message:'Event removed successfully',existsReserv})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error removing event'})
    }
}

exports.addService = async(req,res) =>{
    try {
        //obtener el id de la reservacion y los datos del usuario logueado
        let {id,idService} = req.params
        let userLoggued = req.user
        //regresar los datos de la reserva a su valor original
        //obtener los datos de la reservación
        let existsReserv = await Reservation.findOne({_id:id,status:'PROGRESS'}).populate('room')
        if(!existsReserv) return res.status(404).send({message:'Reservation not found or already paid or canceled'})
        //validar cual es su rol
        if(userLoggued.role == 'CLIENT'){
            if(existsReserv.client != userLoggued.sub)
                return res.status(403).send({message:'You can not add service a reservation that not is yours'})
        }else if(userLoggued.role == 'ADMIN'){
            //validar que sea admin del hotel
            let existsHotel = await Hotel.findOne({admin:userLoggued.sub})
            if(existsReserv.room.hotel.toString() != existsHotel._id.toString())
                return res.status(403).send({message:'You are not admin of this hotel'})
        }
        //verificar que exista el servicio
        let existsService = await Service.findOne({_id:idService,hotel:existsReserv.room.hotel})
        if(!existsService) return res.status(404).send({message:'Service not found'})
        //sumar los costes del servicio
        existsReserv.total += (existsService.price * existsReserv.numberOfNight);
        //agregar el servicio a la reservación
        existsReserv.additionalServices.push(existsService)
        //guardar los datos
        existsReserv.save()
        return res.send({message:'Service added successfully',existsReserv})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error adding service'})
    }
}

exports.removeService = async(req,res) =>{
    try {
        //obtener el id de la reservacion y los datos del usuario logueado
        let {id,idService} = req.params
        let userLoggued = req.user
        //regresar los datos de la reserva a su valor original
        let existsReserv = await Reservation.findOne({_id:id,status:'PROGRESS'}).populate('room')
        if(!existsReserv) return res.status(404).send({message:'Reservation not found, already paid or canceled'})
        //validar cual es su rol
        if(userLoggued.role == 'CLIENT'){
            if(existsReserv.client != userLoggued.sub)
                return res.status(403).send({message:'You can not remove service a reservation that not is yours'})
        }else if(userLoggued.role == 'ADMIN'){
            //validar que sea admin del hotel
            let existsHotel = await Hotel.findOne({admin:userLoggued.sub})
            if(existsReserv.room.hotel.toString() != existsHotel._id.toString())
                return res.status(403).send({message:'You are not admin of this hotel'})
        }
        let existsService = await Service.findOne({_id:idService,hotel:existsReserv.room.hotel})
        if(!existsService) return res.status(404).send({message:'Service not found'})
        let existsServReserv = await Reservation.findOne({_id:existsReserv._id,additionalServices:idService})
        if(!existsServReserv) return res.status(404).send({message:'Service not found in reservation'})
        existsReserv.total -= (existsService.price * existsReserv.numberOfNight);
        let index = existsReserv.additionalServices.indexOf(idService)
        existsReserv.additionalServices.splice(index,1)
        existsReserv.save()
        return res.send({message:'Service removed successfully',existsReserv})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error removing service'})
    }
}

exports.updateReserv = async(req,res) =>{
    try {
        //obtener los datos exteriores
        let {id} = req.params
        let userLoggued = req.user
        let data = req.body
        let datos = {
            room:data.room,
            numberOfPeople: data.numberOfPeople,
            numberOfNight: data.numberOfNight,
            total:0
        } 
        //validar que no vengan datos que no se puden cambiar
        if(data.numberRes != undefined) return res.status(418).send({message:'NumberRes can not be updated'})
        if(data.client != undefined) return res.status(418).send({message:'Client can not be updated'})
        if(data.total != undefined) return res.status(418).send({message:'Total can not be updated'})
        if(data.status != undefined) return res.status(418).send({message:'Status can not be updated'}) 
        if(data.additionalServices != undefined) return res.status(418).send({message:' can not be updated here'})
        if(data.events != undefined) return res.status(418).send({message:' can not be updated here'})  
        //datos a cambiar
        let existsReserv = await Reservation.findOne({_id:id,status:'PROGRESS'}).populate('room')
        if(!existsReserv) return res.status(404).send({message:'Reservation not found or already paid'})
        datos.total = existsReserv.total
        //validar quien es el que esta actualizando 
        if(userLoggued.role == 'CLIENT'){
            if(existsReserv.client != userLoggued.sub)
                return res.status(403).send({message:'You can not update a reservation that not is yours'})
        }else if(userLoggued.role == 'ADMIN'){
            //validar que sea admin del hotel
            let existsHotel = await Hotel.findOne({admin:userLoggued.sub})
            if(existsReserv.room.hotel.toString() != existsHotel._id.toString())
                return res.status(403).send({message:'You are not admin of this hotel'})
        }
        //solo se puede actualizar room, numeroDePersonas y numeroDeNoches
        if(datos.numberOfPeople){
            let existsRoom = await Room.findOne({_id:existsReserv.room})
            //validar que datos vienene
            let capacity = existsRoom.beds.cant * existsRoom.beds.capacity
            if(datos.numberOfPeople>capacity) return res.status(418).send({message:`The room only is suitable for ${capacity} persons`})
            if(existsReserv.events){
                if(Array.isArray(existsReserv.events)){
                    for(let event of existsReserv.events){
                        let existsEvent = await Event.findOne({_id:event})
                        if((existsEvent.maxPersons+existsReserv.numberOfPeople)<datos.numberOfPeople)
                        return res.send({message:'This event no longer accepts that number of people'})           
                            let maxPer = 0
                            maxPer = existsEvent.maxPersons + existsReserv.numberOfPeople;
                            maxPer -= datos.numberOfPeople;
                            await Event.findOneAndUpdate(
                                {_id:existsEvent._id},
                                {maxPersons:maxPer},
                                {new:true}
                            )
                    }
                }else{
                    let existsEvent = await Event.findOne({_id:existsReserv.events})
                    if((existsEvent.maxPersons + existsReserv.numberOfPeople)<datos.numberOfPeople)
                        return res.send({message:'This event no longer accepts that number of people'})        
                    let maxPer = 0
                    maxPer = existsEvent.maxPersons + existsReserv.numberOfPeople;
                    maxPer -= datos.numberOfPeople;
                    await Event.findOneAndUpdate(
                        {_id:existsEvent._id},
                        {maxPersons:maxPer},
                        {new:true}
                    )
                }
            }
        }
        if(datos.numberOfNight && datos.numberOfNight != null){
            if(existsReserv.additionalServices){
                if(Array.isArray(existsReserv.additionalServices)){
                    for(let service of existsReserv.additionalServices){
                        let existsService = await Service.findOne({_id:service})
                        if(!existsService) return res.status(404).send({message:`Service whit code ${service} not found`})
                        datos.total -= (existsService.price * existsReserv.numberOfNight);
                        datos.total += (existsService.price * datos.numberOfNight);
                    }
                }else{
                        let existsService = await Service.findOne({_id:existsReserv.additionalServices})
                        if(!existsService) return res.status(404).send({message:`Service whit code ${service} not found`})
                        datos.total -= (existsService.price * existsReserv.numberOfNight);
                        datos.total += (existsService.price * datos.numberOfNight);
                }
            }
            if(!datos.room || datos.room == null){
                let existsRoom = await Room.findOne({_id:existsReserv.room})
                if(!existsRoom) return res.status(404).send({message:'Room not found or not available'})
                datos.total -= (existsRoom.price * existsReserv.numberOfNight)
                datos.total += (existsRoom.price * datos.numberOfNight)
            }
        }
        if(datos.room && datos.room != null){
            //obtener habitacion vieja
            let oldRoom = await Room.findOne({_id:existsReserv.room})
            //obtener habitacion nueva
            let existsRoom = await Room.findOne({_id:datos.room,status:"AVAILABLE"})
            if(!existsRoom) return res.status(404).send({message:'Room not found or not available'})
            //validar que el numero de personas que se asignan no se mayor al de la capacidad de la habitacion
            if(existsRoom._id == existsReserv.room) return res.send({message:'You are already assigned to this room'})
            //validar que datos vienene
            let capacity = existsRoom.beds.cant * existsRoom.beds.capacity
            if(datos.numberOfPeople && datos.numberOfPeople != null){       
                if(datos.numberOfPeople>capacity) return res.status(418).send({message:`The room only is suitable for ${capacity} persons`})
                if(datos.numberOfNight && datos.numberOfNight != null){
                    datos.total -= (oldRoom.price * existsReserv.numberOfNight)
                    datos.total += (existsRoom.price * datos.numberOfNight)
                }else{
                    datos.total -= (oldRoom.price * existsReserv.numberOfNight)
                    datos.total += (existsRoom.price * existsReserv.numberOfNight)
                }
                await Room.findOneAndUpdate(
                    {_id:existsReserv.room},
                    {status:'AVAILABLE'}
                )
                await Room.findOneAndUpdate(
                    {_id:existsRoom._id},
                    {status:'BUSY'}
                )
            }else{
                if(existsReserv.numberOfPeople>capacity) 
                return res.status(418).send({message:`The room only is suitable for ${capacity} persons`})
                
                if(datos.numberOfNight && datos.numberOfNight != null){
                    datos.total -= (oldRoom.price * existsReserv.numberOfNight)
                    datos.total += (existsRoom.price * datos.numberOfNight)
                }else{
                    datos.total -= (oldRoom.price * existsReserv.numberOfNight)
                    datos.total += (existsRoom.price * existsReserv.numberOfNight)
                }  
                await Room.findOneAndUpdate(
                    {_id:existsReserv.room},
                    {status:'AVAILABLE'}
                )  
                await Room.findOneAndUpdate(
                    {_id:existsRoom._id},
                    {status:'BUSY'}
                    )
                }
        }
        let updateReser = await Reservation.findOneAndUpdate(
            {_id:id},
            datos,
            {new:true}
        )
        if(!updateReser) return res.status(404).send({message:'Reservation not updated'})
        return res.send({message:'Reservation updated successfully',updateReser})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error updating reservation'})
    }
}

exports.complete = async(req,res) =>{
    try {
        let {id} = req.params
        let userLoggued = req.user

        let existsReserv = await Reservation.findOne({_id:id,status:'PROGRESS'}).populate('room')
        if(!existsReserv) return res.status(404).send({message:'Reservation not found or already paid'})
        
        if(userLoggued.role == 'CLIENT'){
            if(existsReserv.client != userLoggued.sub)
                return res.status(403).send({message:'You can not update a reservation that not is yours'})
        }else if(userLoggued.role == 'ADMIN'){
            //validar que sea admin del hotel
            let existsHotel = await Hotel.findOne({admin:userLoggued.sub})
            if(existsReserv.room.hotel.toString() != existsHotel._id.toString())
                return res.status(403).send({message:'You are not admin of this hotel'})
        }
        await Room.findOneAndUpdate(
            {_id:existsReserv.room},
            {status:'AVAILABLE'}
        )
        let updateReser = await Reservation.findOneAndUpdate(
            {_id:id},
            {status:'COMPLETED'},
            {new:true}
        )
        let bills = await Bill.find()
        let newbill = new Bill({numberBill:(bills.length+1),reservation:existsReserv._id})
        newbill.save()
        console.log(await Bill.findOne({numberBill:newbill.numberBill}));
        let bill = await Bill.findOne({numberBill:newbill.numberBill})
        return res.send({message:'Reservation completed successfully',bill})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error completing the reservation'})
    }
}