'use strict'

const User = require('./user.model')
const { encrypt, validateData, check, sensitiveData } = require('../utils/validate')
const { createToken } = require('../services/jwt')

const ROLES = { admin: 'ADMIN', master: 'MASTER', client: 'CLIENT' }

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

/* ----- LOGIN ----- */
exports.login = async(req, res) => {
    try {
        let data = req.body
        let params = {
            username: data.username,
            password: data.password
        }

        let msg = validateData(params)
        if(msg) return res.status(400).send({ message: msg })

        let user = await User.findOne({ username: data.username })
        if(!user) return res.status(401).send({ message: 'Invalid credentials :(' })

        if(user && await check(data.password, user.password)) {
            let token = await createToken(user)
            let logged = {
                name: user.name,
                username: user.username,
                role: user.role
            }

            return res.send({ message: 'Logged!', token: token, user: logged })
        }

        return res.status(401).send({ message: 'Invalid credentials :(' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error login', error: err })
    }
}

/* ----- REGISTER USER ----- */
exports.register = async(req, res) => {
    try {
        let data = req.body
        let params = {
            name: data.name,
            surname: data.surname,
            phone: data.phone,
            email: data.email,
            password: data.password,
            username: data.username
        }

        let msg = validateData(params)
        if(msg) return res.status(400).send({ message: msg })

        data.role = ROLES.client
        data.password = encrypt(data.password)
        
        let user = new User(data)
        await user.save()

        return res.send({ message: 'Account created successfully!', user: user })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user :(', error: err })
    }
}

/* ----- GET USERS ----- */
exports.get = async(req, res) => {
    try {
        let users = await User.find()

        if(!users) return res.status(404).send({ message: 'Users not found :(' })

        let data = sensitiveData(users)
        return res.send({ message: 'Users found!', data })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting users :(', error: err })
    }
}

/* ----- GET USER ----- */
exports.getUser = async(req, res) => {
    try {
        let id = req.params.id

        let user = await User.findOne({ _id: id })
        if(!user) return res.status(404).send({ message: 'User not found :(' })

        let data = sensitiveData(user)

        return res.send({ message: 'User found!', data })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting user :(', error: err })
    }
}

/* -----UPDATE ----- */
exports.update = async(req, res) => {
    try {
        let data = req.body

        if(data.password) return res.status(400).send({ message: 'Cannot update password here :(' })
        if(data.role) return res.status(400).send({ message: 'Invalid param "ROLE"' })

        let upUser = await User.findOneAndUpdate(
            {_id: req.user.sub},
            data,
            {new: true}
        )

        return res.send({ message: 'Updated!', user: upUser })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating user :(', error: err })
    }
}
