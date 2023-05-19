'use strict'

const Bill = require("./bill.model")

exports.test = (req, res) => {
    res.send({ message: 'Test bills' })
}

exports.get = async(req,res) =>{
    try {
        let {id} = req.params
        let existsBills = await Bill.findOne({reservation:id})
            .populate({
                path:'reservation'
                ,populate:{
                    path:'room',
                    populate:{
                        path:'hotel'
                    }
                }
            })
            .populate({
                path:'reservation',
                populate:{
                    path:'additionalServices'
                }
            })
            .populate({
                path:'reservation',
                populate:{
                    path:'client'
                }
            })
        if(!existsBills) return res.status(404).send({message:'Bills not found'})
        return res.send({existsBills})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error getting bill'})
    }
}

exports.getAll = async(req,res) =>{
    try {
        let existsBills = await Bill.find({})
            .populate({
                path:'reservation'
                ,populate:{
                    path:'room',
                    populate:{
                        path:'hotel'
                    }
                }
            })
            .populate({
                path:'reservation',
                populate:{
                    path:'additionalServices'
                }
            })
            .populate({
                path:'reservation',
                populate:{
                    path:'client'
                }
            })
        if(!existsBills) return res.status(404).send({message:'Bills not found'})
        return res.send({existsBills})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error getting bill'})
    }
}