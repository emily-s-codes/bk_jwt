import jwt from 'jsonwebtoken'
import db from "../models/modIndex.js";
const User = db.user
const Role = db.role

export const verifyToken = (req, res, next) => {
    let token = req.session.token
    if (!token) {
        return res.status(403).send({ message: 'no token provided' })
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)

    if (!verifiedToken) return res.status(401).send({ message: 'unauthorized' })

    next()
}

export const isAdmin = (req, res, next) => {
    try {
        let user = User.findById(req.userId)
        if (!user) res.status(500).send({ message: 'error processing user' })

        let roles = Role.find({ _id: { $in: user.roles } })
        if (!roles) res.status(500).send({ message: 'error processing role' })
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') {
                next()
            }
        }
        res.status(403).send({ message: 'admin role does not exist' })
    }
    catch (error) {
        res.status(500).send({ message: error })
    }
}

export const isModerator = (req, res, next) => {
    try {
        let user = User.findById(req.userId)
        if (!user) res.status(500).send({ message: 'error processing user' })

        let roles = Role.find({ _id: { $in: user.roles } })
        if (!roles) res.status(500).send({ message: 'error processing role' })
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'moderator') {
                next()
            }
        }
        res.status(403).send({ message: 'moderator role does not exist' })
    }
    catch (error) {
        res.status(500).send({ message: error })
    }
}
