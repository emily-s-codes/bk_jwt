import mongoose from "mongoose";

const { Schema, model } = mongoose

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    roles: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Role'
        }
    ]
})

const User = model('user', userSchema)
export default User