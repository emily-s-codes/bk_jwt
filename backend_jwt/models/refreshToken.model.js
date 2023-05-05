import mongoose, { SchemaTypes } from "mongoose";
import { v4 as uuid } from 'uuid'

const { Schema, model } = mongoose

const RefreshTokenSchema = new Schema({
    token: String,
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User'
    },
    expiryDate: Date
},
    {
        statics: {
            createToken: async function (user) {
                console.log('creating refresh token')
                let expiredAt = new Date()

                expiredAt = expiredAt.setSeconds(expiredAt.getSeconds() + Number(process.env.REFRESH_TOKEN_EXPIRY))

                expiredAt = new Date(expiredAt)

                let _token = uuid()

                let _object = new this({
                    token: _token,
                    user: user._id,
                    expiryDate: expiredAt
                })

                let refreshToken = await _object.save()

                return refreshToken.token
            },
            verifyExpiration: async function (refreshTokenId) {
                const token = await RefreshToken.findOne({ _id: refreshTokenId })
                const isExpired = token.expiryDate.getTime() < new Date().getTime()
                console.log(isExpired)
                return isExpired
            }
        }
    }
)

const RefreshToken = model('RefreshToken', RefreshTokenSchema)
export default RefreshToken