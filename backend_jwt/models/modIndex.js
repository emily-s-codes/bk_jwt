import mongoose from "mongoose";
import User from './user.model.js'
import Role from './role.model.js'
import RefreshToken from "./refreshToken.model.js";

const db = {}

db.mongoose = mongoose
db.user = User
db.role = Role
db.ROLES = ['user', 'admin', 'moderator']
db.refreshToken = RefreshToken

export default db