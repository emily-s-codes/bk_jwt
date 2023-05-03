import mongoose from "mongoose";
import { initial } from "../config/roles.js";

let DB_URL = process.env.DB_URL

export const connection = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true
        })
        await initial()
        console.log('connected')
    } catch (error) { console.log(error.message) }
}