import db from "../models/modIndex.js";
const ROLES = db.ROLES
const User = db.user

export const checkUniqueUserOrEmail = (req, res, next) => {
    try {
        const username = User.findOne({ username: req.body.username })
        const email = User.findOne({ email: req.body.email })
        if (username) res.status(400).send({ message: 'Username already in use' })
        if (email) res.status(400).send({ message: 'Email already in use' })
    } catch (error) {
        if (error) res.status(500).send({ message: error })
    }
    next()
}

export const checkRolesExist = (req, res, next) => {
    try {
        if (req.body.roles) {
            for (let i = 0; i < req.body.roles.length; i++) {
                if (!ROLES.includes(req.body.roles[i])) {
                    res.status(400).send({ message: `Failed! ${req.body.roles[i]} role does not exist` })
                }
            }
        }
    } catch (error) {
        if (error) res.status(500).send({ message: error })
    }
    next()
}
