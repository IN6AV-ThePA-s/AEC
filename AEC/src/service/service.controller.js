'use strict'
const { validateData } = require('../utils/validate')

const Service = require('./service.model');
const Hotel = require('../hotel/hotel.model')

exports.test = (req, res) => {
    res.send({ message: `Hi services` });
}

exports.addService = async(req, res) => {
    try {
        //obtener los datos
        let data = req.body
        let params = {
            service: data.service,
            description: data.description,
            price: data.price,
            hotel: data.hotel
        }
        let validacion = validateData(params)
        if(validacion) return res.status(400).send(validacion)
        //comporbar que no esxistan ya en la base de datos
        let existService = await Service.findOne({
            $and: [
                {service: data.service},
                {hotel: data.hotel},
            ]
        })

        if (existService)  return res.status(403).send({ message: 'This service is already in this hotel' })

        // let existsService = await Service.findOne({service:data.service})
        // if(existsService) return res.send({message:'Service already exists'})
        let hotel = await Hotel.findOne({ _id: data.hotel })
        if (!hotel) return res.status(404).send({ message: 'Hotel not found :(' })
        //guardar los datos
        let newService = new Service(data)
        await newService.save()
        //regresar la respuesta
        return res.send({message:'Service saved successfully', service: newService })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error saving service', error: err.message })
    }
}

exports.getServices = async(req, res) => {
    try {
        //obtener los datos de la BD
        let services = await Service.find()
            //Retornarlos
        if (services.length == 0) return res.send({ message: 'There is not any service' })
        return res.send({ message: 'The services availables are these:', services })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting services' })
    }
}

exports.getService = async(req, res) => {
    try {
        //obtener el id del servicio que se traerá
        let id = req.params.id
            //obtenerlo de la base de datos
        let serviceFind = await Service.findOne({ _id: id })
            //retornarlo
        if (!serviceFind) return res.status(404).send({ message: 'Service not found' })
        return res.send({ message: 'Service Found', service: serviceFind })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting service' })
    }
}

exports.getServicesByHotel = async(req, res) => {
    try {
        let hotel = req.params.hotel
        let services = await Service.find({ hotel: hotel })
        
        if (!services) return res.status(404).send({ message: 'Services not found :(' })
        return res.send({ message: 'Services found!', services: services })
        
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: 'Error getting the hotel services :(', error: err })
    }
}

exports.updateService = async(req,res) =>{
    try {
        //obtener el id del servicio que se actualizará
        let id = req.params.id
            //obtener los datos que se actualizaran
        let data = req.body
        let params = {
            name: data.service,
            price: data.price,
            description: data.description,
            hotel: data.hotel
        }
        let msg = validateData(params)
        if(msg) return res.status(403).send(msg)
        //validar que no exista ya el nombre
        let service = await Service.findOne({ _id: id })

        let existService = await Service.findOne({
            $and: [
                {service: data.service},
                {hotel: data.hotel},
            ]
        })

        if (existService && existService._id.toString() !== service._id.toString())  return res.status(403).send({ message: 'El servicio ya existe en este hotel' })

        //actualizar
        let updateService = await Service.findOneAndUpdate(
            {_id:id},
            data,
            {new:true}
        )
        if (!updateService) return res.status(404).send({ message: 'Service not found and not updated' })
        return res.send({ message: 'Updated successfully', updateService })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating service' })
    }
}


exports.deleteService = async(req, res) => {
    try {
        let id = req.params.id;
        let deleteService = await Service.findOneAndDelete({_id: id})
        if(!deleteService) return res.status(404).send({message: 'Service not found and not deleted'});
        return res.send({message: 'Service deleting successfully'})
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting service' })
    }
}