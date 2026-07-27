const { items } = require('../models/db-connection')

const service = {}

const list = async () => {
    const itemsList = await items.find({})
    return itemsList || 'Nothing to show here!'
}

const countItems = async () => {
    const count = await items.countDocuments({})
    return count || 'Nothing to show here! Wheres my Count?'
}

const recentItems = async () => {
    const itemsList = await items.find({})
        .sort({ created_at: -1 })
        .limit(5)
        .select({ name: 1, created_at: 1 })
    return itemsList || 'Nothing to show here!'
}

const create = async (itemParam) => {
    const newItem = new items({
        name: itemParam.name,
        solicitante: itemParam.solicitante,
        status: itemParam.status,
        created_at: new Date(),
        updated_at: new Date() })

    await newItem.save()
    return 'Successful item creation.'
}

const update = async (_id, itemParam) => {
    itemParam.updated_at = new Date()

    await items.findByIdAndUpdate(_id, itemParam)
    return 'Item has been updated.'
}

const _delete = async (_id) => {
    await items.findByIdAndDelete(_id)
    return 'Item has been deleted.'
}

service.list = list
service.count = countItems
service.recents = recentItems
service.create = create
service.update = update
service.delete = _delete

module.exports = service
