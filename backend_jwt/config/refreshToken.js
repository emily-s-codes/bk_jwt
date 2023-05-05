import db from '../models/modIndex.js'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
const RefreshToken = db.refreshToken

export const refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.session

    if (requestToken == null) {
        return res.status(403).json({ message: 'refresh token is required' })
    }

    try {
        let refreshToken = await RefreshToken.findOne({ token: requestToken })
        console.log('refreshToken .js', refreshToken)
        if (!refreshToken) {
            res.status(403).json({ message: 'no available refresh token' })
        }

        if (RefreshToken.verifyExpiration(refreshToken) === true) {
            console.log('expired refresh token to be rmoved', refreshToken)
            RefreshToken.findByIdAndRemove(refreshToken, { useFindAndModify: false })
            res.status(403).json({ message: 'Your session expired. Please sign in again.' })
            return
        }

        // would it not make sense here to call a function that creates a new access token as well as a new refresh token?
        let newAccessToken = jwt.sign({ id: refreshToken }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
        console.log('made it', newAccessToken)
        let user = await User.findById(refreshToken.user)
        let newRefreshToken = await RefreshToken.createToken(user)

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        })
    } catch (error) {
        console.log('error with refresh tokens', error.message)
    }
}