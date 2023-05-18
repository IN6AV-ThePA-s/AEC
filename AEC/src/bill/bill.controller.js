'use strict'

const Bill = require("./bill.model")

exports.test = (req, res) => {
    res.send({ message: 'Test bills' })
}

exports.get = async(req,res) =>{
    try {
        let data = req.body
        let existsBills = await Bill.find({reservation:data.reservation})
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
        if(!existsBills) return res.statu(404).send({message:'Bills not found'})
        return res.send({existsBills})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error getting bill'})
    }
}