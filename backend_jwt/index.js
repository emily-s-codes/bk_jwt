// https://www.bezkoder.com/node-js-express-login-mongodb/ with conversion to esm and some editing for my preferences

import './config/dotenv.js'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieSession from 'cookie-session'
import { connection } from './util/dbConnect.js'
import { logout, signin, signup } from './controller/auth.controller.js'
import { checkRolesExist, checkUniqueUserOrEmail } from './middleware/verifySignUp.js'
import { adminBoard, allAccess, moderatorBoard, userBoard } from './controller/user.controller.js'
import { isAdmin, isModerator, verifyToken } from './middleware/authJwt.js'

const PORT = process.env.PORT
const app = express()
const corsOptions = { origin: `http://localhost:${PORT}` }

await connection()

app.use(morgan('dev'))
app.use(cors({ corsOptions }))
app.use(express.json()) // parse requests of content-type application/json
app.use(express.urlencoded({ extended: true })) // parse requests of content-type application/x-www-form-urlencoded

app.use(function (_, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    );
    next();
});

app.use(
    cookieSession({
        name: 'session',
        secret: process.env.COOKIE_SECRET,
        httpOnly: true
    })
)

// AUTH
app.post('/api/auth/signup', [
    checkUniqueUserOrEmail,
    checkRolesExist
],
    signup)

app.post('/api/auth/signin', signin)

app.post('/api/auth/logout', logout)

//USER

app.get('/api/access/all', allAccess)

app.get(
    '/api/access/user',
    [verifyToken],
    userBoard)

app.get('/api/access/mod',
    [verifyToken, isModerator],
    moderatorBoard)


app.get('/api/access/admin',
    [verifyToken, isAdmin],
    adminBoard)


app.get('/', (req, res) => {
    res.status(200).json({ message: 'application running' })
})

app.listen(PORT, () => console.log('Server runs on Port:', PORT))