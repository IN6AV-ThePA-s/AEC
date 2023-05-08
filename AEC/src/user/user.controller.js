'use strict'

const User = require('./user.model')
const { encrypt } = require('../utils/validate')

exports.test = (req, res) => {
    res.send({ message: 'Test users' })
}

/* ----- DEFAULT MASTER ----- */
exports.defaultMaster = async() => {
    try {
        if(!(await User.findOne({ username: 'admin' }))) {
            let data = {
                name: 'admin',
                surname: 'admin',
                phone: '+000 00000000',
                email: 'admin@admin.com',
                password: 'admin',
                username: 'admin',
                role: 'master'
            }

            data.password = await encrypt(data.password)
            let user = new User(data)
            await user.save()
            console.log('Master user default created successfully')
        } else {
            console.log('Master user default already created in db')
        }

    } catch (err) {
        console.error(err)
        return err
    }
}
