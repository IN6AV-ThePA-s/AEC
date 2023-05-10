'use strict'

const bcrypt = require('bcrypt')

exports.encrypt = async(pass) => {
    try {
        return bcrypt.hash(pass, 10)
    } catch (err) {
        console.error(err)
        return err
    }
}

exports.check = async(pass, hash) => {
    try {
        return bcrypt.compare(pass, hash)
    } catch (err) {
        console.error(err)
        return err
    }
}

exports.validateData = (data) => {
    let keys = Object.keys(data), msg = ''

    for (let key of keys) {
        if (data[key] !== null &&
            data[key] !== undefined &&
            data[key] !== '') continue

        msg += `Param ${key} is required \n`
    }

    return msg.trim()
}

exports.sensitiveData = (data) => {
    let list = []

    for (let a of data) {
        let payload = {
            id: a._id,
            name: a.name,
            surname: a.surname,
            phone: a.phone,
            email: a.email,
            username: a.username,
            photo: a.photo
        }
        list.push(payload)
    }

    return list
}