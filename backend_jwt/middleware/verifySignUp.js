import db from "../models/modIndex.js";
const ROLES = db.ROLES
const User = db.user

export const checkUniqueUserOrEmail = async (req, res, next) => {
    try {
        const username = await User.exists({ username: req.body.username })
        const email = await User.exists({ email: req.body.email })
        console.log('user', username, 'email', email)
        if (username !== null) return res.status(400).send({ message: 'Username or email already in use' })

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
