const mongoose = require('mongoose')
const userService = require('../services/users.service')

async function main() {
    await mongoose.connection.asPromise()
    console.log(await userService.bootstrapAdmin({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
    }))
}

main()
    .catch(err => { console.error(err.message); process.exitCode = 1 })
    .finally(() => mongoose.connection.close())
