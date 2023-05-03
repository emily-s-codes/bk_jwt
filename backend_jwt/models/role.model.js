import mongoose from "mongoose";

const { Schema, model } = mongoose

const roleSchema = new Schema({
    name: String
})

const Role = model('Role', roleSchema)
export default Role