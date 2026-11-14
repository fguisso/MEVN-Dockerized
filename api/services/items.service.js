const { items } = require('../models/db-connection')
const { string, objectId, fields } = require('./validation')

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
    const input = fields(itemParam, ['name', 'solicitante', 'status'])
    for (const name of ['name', 'solicitante', 'status']) string(input[name], name)
    const newItem = new items({
        name: input.name,
        solicitante: input.solicitante,
        status: input.status,
        created_at: new Date(),
        updated_at: new Date() })

    await newItem.save()
    return 'Successful item creation.'
}

const update = async (_id, itemParam) => {
    const id = objectId(_id)
    const update = fields(itemParam, ['name', 'solicitante', 'status'])
    update.updated_at = new Date()

    await items.findByIdAndUpdate(id, update)
    return 'Item has been updated.'
}

const _delete = async (_id) => {
    await items.findByIdAndDelete(objectId(_id))
    return 'Item has been deleted.'
}

service.list = list
service.count = countItems
service.recents = recentItems
service.create = create
service.update = update
service.delete = _delete

module.exports = service
