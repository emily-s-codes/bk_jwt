import jwt from 'jsonwebtoken'
import db from "../models/modIndex.js";
const User = db.user
const Role = db.role


export const verifyToken = async (req, res, next) => {

    try {
        let token = req.session.token

        if (!token) {
            return res.status(403).send({ message: 'no token provided' })
        }

        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).send({ message: 'unauthorized: access token expired' })
            }
            req.userId = decoded.id
            console.log('decode', decoded.id)
        })
        next()

    } catch (error) {
        return res.status(401).send({ message: 'unauthorized' })
    }

}

export const isAdmin = async (req, res, next) => {
    try {
        let user = await User.findById(req.userId)
        if (!user) res.status(500).send({ message: 'error processing user' })

        let roles = await Role.find({ _id: { $in: user.roles } })

        if (!roles) res.status(500).send({ message: 'error processing role' })
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') {
                next()
            }
        }
        res.status(403).send({ message: 'no access to admin content' })
    }
    catch (error) {
        res.status(500).send({ message: error })
    }
}

export const isModerator = async (req, res, next) => {
    try {
        let user = await User.findById(req.userId)

        let roles = await Role.find({ _id: { $in: user.roles } })

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'moderator') {
                next()
                return
            }
        }
        res.status(403).send({ message: 'no access to moderator content' })
    }
    catch (error) {
        console.log('error accessing moderator content')
    }
}
