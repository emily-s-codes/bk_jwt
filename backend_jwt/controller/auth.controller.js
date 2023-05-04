import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import db from "../models/modIndex.js";
const User = db.user
const Role = db.role

export const signup = async (req, res) => {
    console.log('signing up')
    try {
        if (req.body.roles) {
            try {
                const roles = await Role.find({
                    name: { $in: req.body.roles }
                })
                const user = await User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 8),
                    roles: roles.map(role => role._id)
                })
                res.status(200).json(user)
            } catch (error) {
                res.status(400).send({ message: `${req.body.roles} role not found` })
            }
        }
        else {
            try {
                const role = await Role.find({
                    name: 'user'
                })
                const user = await User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 8),
                    roles: [role._id]
                })
                res.status(200).json(user)
            } catch (error) {
                console.log(error)
            }
        }
    }
    catch (error) {
        res.status(400).send({ message: error })
    }
}

// build a way to reroute to a different function if user provides email in input rather than username
export const signin = async (req, res) => {
    console.log('signing in')
    let user;
    const userInput = req.body.input
    try {
        if (userInput.includes('@')) {
            console.log('email')
            user = await User.findOne({ email: req.body.input })
        } else {
            console.log('username')
            user = await User.findOne({ username: req.body.input })
        }
        await user.populate('roles', '-__v')
        console.log(user)

        if (!user) {
            res.status(404).send({ message: 'user not found' })
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!passwordIsValid) {
            res.status(401).send({ message: 'invalid login credentials' })
        }

        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 10000 })

        let authorities = []

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push('ROLE_' + user.roles[i].name.toUpperCase())
        }

        req.session.token = token

        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities
        })

    } catch (error) {
        res.status(400).send({ message: 'something went wrong with logging in' })
    }
}

export const logout = async (req, res) => {
    try {
        req.session = null
        res.status(200).send({ message: 'logged out' })
    } catch (error) {
        console.log('error logging out')
    }
}