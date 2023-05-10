'use strict'
const { validateData } = require('../utils/validate')

const Service = require('./service.model');

exports.test = (req, res) => {
    res.send({ message: `Hi services` });
}

exports.addService = async(req,res) =>{
    try {
        //obtener los datos
        let data = req.body
        let params = {
            service: data.service,
            description:data.description,
            price:data.price,
            hotel: data.hotel
        }
        let validacion = validateData(params)
        if(validacion) return res.status(400).send(validacion)
        //comporbar que no esxistan ya en la base de datos
        let existsService = await Service.findOne({service:data.service})
        if(existsService) return res.send({message:'Service already exists'})
        //guardar los datos
        let newService = new Service(data)
        await newService.save()
        //regresar la respuesta
        return res.send({message:'Service saved successfully',newService})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error saving service',error:err.message})
    }
}

exports.getServices = async(req,res) =>{
    try {
        //obtener los datos de la BD
        let services = await Service.find()
        //Retornarlos
        if(services.length == 0) return res.send({message:'There is not any service'})
        return res.send({message:'The services availables are these:',services})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error getting services'})
    }
}

exports.getService = async(req,res) =>{
    try {
        //obtener el id del servicio que se traerá
        let id = req.params.id
        //obtenerlo de la base de datos
        let serviceFind = await Service.findOne({_id:id})
        //retornarlo
        if(!serviceFind) return res.status(404).send({message:'Service not found'})
        return res.send({message: 'Service Found', service: serviceFind})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error getting service'})
    }
}

exports.updateService = async(req,res) =>{
    try {
        //obtener el id del servicio que se actualizará
        let id = req.params.id
        //obtener los datos que se actualizaran
        let data = req.body
        //validar que no exista ya el nombre
        if(data.service !== undefined){
            if(data.service == null || data.service == '') data.service = undefined
            else{
                let existsService = await Service.findOne({service:data.service})
                if(existsService){
                    if(existsService._id !== id) return res.send({message:'Service already exists'})
                }         
            }
        }
        if(data.description == null || data.description == '') data.description = undefined
        if(data.price == null || data.price == '') data.price = undefined
        //actualizar
        let updateService = await Service.findOneAndUpdate(
            {_id:id},
            data,
            {new:true}
        )
        if(!updateService) return res.status(404).send({message:'Service not found and not updated'})
        return res.send({message:'Updated successfully',updateService})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error updating service'})
    }
}


exports.deleteService = async(req, res)=>{
    try {
        let id = req.params.id;
        let deleteService = await Service.findOneAndDelete({_id: id})
        if(!deleteService) return res.status(404).send({message: 'Services not found and delete'});
        return res.send({message: 'Service deleting successfully'})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error deleting service'})
    }
}