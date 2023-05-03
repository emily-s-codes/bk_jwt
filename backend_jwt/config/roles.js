import Role from "../models/role.model.js"

export const initial = async () => {
    const roleCount = await Role.find()
    if (roleCount.length === 0) {
        try {
            Role.create({
                name: 'moderator'
            })
            Role.create({
                name: 'admin'
            })
            Role.create({
                name: 'user'
            })
        } catch (error) {
            if (error) console.log(error)
        }
    } else {
        return
    }
}

