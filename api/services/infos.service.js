const itemService = require('../services/items.service')
const userService = require('../services/users.service')

const service = {}

const constructInfo = async () => {
    const [itemsCount, userCount, recentes] = await Promise.all([
        itemService.count(),
        userService.count(),
        itemService.recents()])

    return { itemsCount, userCount, recentes }
}

service.infos = constructInfo

module.exports = service
